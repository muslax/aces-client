import { createContext, memo, useContext, useState } from 'react'
import useUser, { updateUserPath } from 'lib/useUser'
import fetchJson from 'lib/fetchJson'
import Layout from "components/Layout";
import useSWR, { mutate } from 'swr';
import { getApiUrl, sequenceArray, msToTimeString } from "lib/utils";
import { ACESModule, ACESTestItem, getTestSlug } from "lib/modules";

const BASE_API_URL = "/api/sjt-asn"

export default function GPQSteps() {
  const { user } = useUser({ redirectTo: "/" })

  if (!user || !user.isLoggedIn) return <div></div>

  return (
    <TestProvider user={user}>
      <PageContent />
    </TestProvider>
  )
}

const PageContent = memo(() => {
  return (
    <Layout title="SJT-ASN">
      <Content />
    </Layout>
  )
})

const TestContext = createContext();

function TestProvider({ user, children }) {
  const testType = "sjt-asn"
  const testSlug = getTestSlug(user, testType)

  const [submitting, setSubmitting] = useState(false);
  const [submittable, setSubmittable] = useState(false);

  const url = getApiUrl(BASE_API_URL, user, {fullname: user.fullname})
  const swrOptions = process.env.NODE_ENV == 'development' ? {
    refreshInterval: 0, revalidateOnFocus: false
  } : { revalidateOnFocus: true }
  const { data: progress, mutate: mutateProgress } = useSWR(url, fetchJson)
  const { data: project } = useSWR(`/api/project?id=${user?.projectId}`, fetchJson)
  const { data: module } = useSWR(`/api/project?id=${user?.projectId}&modules=${testType}`, fetchJson, swrOptions)

  const [ most, setMost ] = useState(null)
  const [ least, setLeast ] = useState(null)
  const [ mostText, setMostText ] = useState(null)
  const [ leastText, setLeastText ] = useState(null)

  return (
    <TestContext.Provider value={{
      user,
      project,
      module,
      testType, testSlug,
      submitting, setSubmitting,
      submittable, setSubmittable,
      progress, mutateProgress,
      most, setMost,
      least, setLeast,
      mostText, setMostText,
      leastText, setLeastText
    }}>
      {children}
    </TestContext.Provider>
  )
}

function Header() {
  const { user, module, progress } = useContext(TestContext)
  // msToTimeString

  return (
    <div className="mb-8 text-gray-700">
      <div className="flex flex-col text-xs px-1 py-3 pt-4">
        <div className=" text-xs text-center uppercase tracking-wide sm:tracking-wider md:tracking-widest">
          <span id="companyName" className="font-bold">{user?.projectTitle}</span>
          <span className="px-2">|</span>
          <span className="">{user?.company}</span>
        </div>
      </div>

      <div className="flex flex-row bg-yellow-400 rounded-md items-center text-sm leading-10 px-4">
        <div className="flex flex-grow flex-row font-semibold">
          <span>{module?.name}</span>
        </div>
        <div className="flex flex-0 text-right pl-3 font-bold">
          {!progress && (
            <>
            <span className=" bg-yellow-600 bg-opacity-25 px-3 border-l border-r border-yellow-500">&mdash;</span>
            <span className="pl-3">&mdash;</span>
            </>
          )}
          {progress && (
            <>
            <span className=" bg-yellow-600 bg-opacity-25 px-3 border-l border-r border-yellow-500">{progress.done + 1}</span>
            <span className="pl-3">{progress?.items}</span>
            </>
          )}
        </div>
      </div>

      <div className="flex flex-row text-sm text-gray-700 font-light px-2 py-2 border-b border-orange-300">
        <div className="flex-grow font-semibold">{user?.fullname}</div>
        <div className="flex-1 text-right text-xs font-mono">
          {!progress && <div id="timer" className="mr-2 text-gray-200">&bull; &bull; &bull;</div>}
          {progress && <div id="timer" className="mr-2">{msToTimeString(progress.remains)}</div>}
        </div>
      </div>
    </div>
  )
}

function Choices() {
  const {
    user, progress, testSlug,
    most, setMost, mostText, setMostText,
    least, setLeast, leastText, setLeastText,
    submitting, setSubmitting,
    submittable, setSubmittable,
    mutateProgress
  } = useContext(TestContext)

  const curSeq = progress ? progress.done + 1 : 0  // 1-based index
  const testItem = progress ? ACESTestItem(testSlug, curSeq) : null
  const options = testItem?.options

  const FLAG = "FLAG px-5 py-4 rounded-l-md bg-gray-300 bg-opacity-25"
  const FLAGGREEN = "FLAG FLAG-GREEN px-5 py-4 rounded-l-md bg-green-200"
  const FLAGRED = "FLAG FLAG-RED px-5 py-4 rounded-l-md bg-red-200"

  const BGREEN = "BGREEN cursor-pointer flex items-center justify-center font-semibold border border-white w-10 h-10 rounded-full bg-gray-500 hover:bg-green-500"
  const BGREEN_GREEN = "BGREEN BGREEN-GREEN cursor-default flex items-center justify-center font-semibold border border-white w-10 h-10 rounded-full bg-green-500"
  const BRED = "BRED cursor-pointer flex items-center justify-center font-semibold border border-white w-10 h-10 rounded-full bg-gray-500 hover:bg-red-500"
  const BRED_RED = "BRED BRED-RED cursor-default flex items-center justify-center font-semibold border border-white w-10 h-10 rounded-full bg-red-500"

  const btnActive = "rounded border-2 border-green-400 text-lg text-green-500 px-6 py-3 hover:border-green-500 hover:bg-green-500 hover:text-white active:bg-green-700"
  const btnDisabled = "rounded border-2 text-lg text-gray-400 px-6 py-3"

  function resetView() {
    document.querySelector('.FLAG-GREEN').className = FLAG
    document.querySelector('.FLAG-RED').className = FLAG
    document.querySelector('.BGREEN-GREEN').className = BGREEN
    document.querySelector('.BRED-RED').className = BRED
  }

  function selectPE(e) {
    const tag = e.target.getAttribute("tag")
    setMost(tag)
    setMostText(e.target.value)

    // Sibling
    if (document.getElementById('RED_' + tag).className == BRED_RED) {
      setLeastText(null)
      setLeast(null)
    }
    setMost(tag)
    setMostText(e.target.value)

    document.getElementById('RED_' + tag).className = BRED

    document.querySelectorAll(".FLAG-GREEN").forEach((el) => { el.className = FLAG })
    document.querySelectorAll(".BGREEN").forEach((el) => { el.className = BGREEN })

    document.getElementById('OPT_' + tag).className = FLAGGREEN
    e.target.className = BGREEN_GREEN
  }

  function selectPT(e) {
    const tag = e.target.getAttribute("tag")

    // Sibling
    if (document.getElementById('GREEN_' + tag).className == BGREEN_GREEN) {
      setMostText(null)
      setMost(null)
    }

    setLeast(tag)
    setLeastText(e.target.value)
    document.getElementById('GREEN_' + tag).className = BGREEN

    document.querySelectorAll(".FLAG-RED").forEach((el) => { el.className = FLAG })
    document.querySelectorAll(".BRED").forEach((el) => { el.className = BRED })
    document.getElementById('OPT_' + tag).className = FLAGRED
    e.target.className = BRED_RED
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSubmitting(true)
    const body = {
      seq: progress.done + 1,
      mostElm: most,
      mostText: mostText,
      leastElm: least,
      leastText: leastText,
      lastTouched: progress.touched,
    }

    const url = getApiUrl(BASE_API_URL, user)
    const response = await fetchJson(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
      body: JSON.stringify(body),
    })

    if (response) {
      console.log(response)
      setSubmitting(false)
    }

    setMost(null)
    setLeast(null)
    setMostText(null)
    setLeastText(null)

    mutateProgress()
    resetView()
    window.scrollTo(0, 0)
  }

  return (
    <div>
      <div className="border-ts bg-white border-b border-orange-200 bg-orange-100 text-gray-800 px-4s -mt-8">
        <p className="max-w-2xl mx-auto text-xl text-center leading-normal font-semibolds pt-10 pb-12">{testItem?.teaser}</p>
      </div>
      <div className="max-w-3xl mx-auto px-6s pt-10 mb-16">
        <div className="flex flex-col mb-8 text-gray-600">
          <p className="text-center font-light mb-4">
            <span>Menurut Anda, pilihan mana yang</span>{` `}
            <span className="whitespace-no-wrap text-gray-700 font-bold">paling efektif</span>{` `}
            dan mana yang <span className="whitespace-no-wrap text-gray-700 font-bold">paling tidak efektif</span>?
          </p>
          <div className="flex text-sm items-center justify-center">
            <p className="flex items-center whitespace-no-wrap mr-4">
              <span className="inline-block w-8 h-8 mx-1 rounded-full border-2 border-white flex items-center justify-center text-xs text-white font-bold bg-gray-500">PE</span>
              Paling Efektif
            </p>
            <p className="flex items-center whitespace-no-wrap">
              <span className="inline-block w-8 h-8 mx-1 rounded-full border-2 border-white flex items-center justify-center text-xs text-white font-bold bg-gray-500">PT</span>
              Paling Tidak Efektif
            </p>
          </div>
        </div>
        {options?.map(opt => (
        <div key={opt.elm} className="flex flex-row items-stretch items-center rounded">
          <div className="flex-grow self-center py-1">
            <div id={`OPT_${opt.elm}`} className={FLAG}>
              <span className="">{opt.statement}</span>
            </div>
          </div>
          <div className="flex py-1 border-l border-gray-400">
            <div className="flex rounded-r-md bg-indigo-100 hover:bg-opacity-50 text-sm text-white font-bold px-2">
              <div className="flex items-center p-2">
                <button onClick={selectPE} tag={opt.elm} value={opt.statement} id={`GREEN_${opt.elm}`} className={BGREEN}>PE</button>
              </div>
              <div className="flex items-center p-2">
                <button onClick={selectPT} tag={opt.elm} value={opt.statement} id={`RED_${opt.elm}`} className={BRED}>PT</button>
              </div>
            </div>
          </div>
        </div>
        ))}
        <div className="mt-12 text-center">
          {most && least && (
            <button id="submit" type="submit" onClick={event => handleSubmit(event)} className={btnActive}>
              Pernyataan berikutnya
            </button>
          )}
          {(!most || !least) && (
            <button id="submit" type="submit" onClick={event => handleSubmit(event)} disabled className={btnDisabled}>
              Pernyataan berikutnya
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

function Content() {
  const {
    progress, testSlug,
    most, mostText,
    least, leastText,
  } = useContext(TestContext)

  return (
    <div>
      <Header />
      <Choices />
      <p className="text-centers text-xs text-orange-500">DEBUG:<br/>
      MOST: {most ? most : '???'} - {mostText}<br/>
      LEAST: {least ? least : '???'} - {leastText}
      </p>

      {/* <pre className="pre my-10">PROGRESS: {JSON.stringify(progress, null, 2)}</pre> */}
    </div>
  )
}