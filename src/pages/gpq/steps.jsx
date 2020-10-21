import { createContext, memo, useContext, useState } from 'react'
import Link from 'next/link'
import useUser, { updateUserPath } from 'lib/useUser'
import fetchJson from 'lib/fetchJson'
import Layout from "components/Layout";
import useSWR, { mutate } from 'swr';
import { getApiUrl, sequenceArray, msToTimeString } from "lib/utils";
import { ACESModule, ACESTestItem, getTestSlug } from "lib/modules";

const BASE_API_URL = "/api/gpq"

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
    <Layout title="GPQX">
      <Content />
    </Layout>
  )
})

const TestContext = createContext();

function TestProvider({ user, children }) {
  const testType = "gpq"
  const testSlug = getTestSlug(user, testType)

  const [submitting, setSubmitting] = useState(false);
  const url = getApiUrl(BASE_API_URL, user, {fullname: user.fullname})
  const swrOptions = process.env.NODE_ENV == 'development' ? {
    refreshInterval: 0, revalidateOnFocus: false
  } : { revalidateOnFocus: true }
  const { data: progress, mutate: mutateProgress } = useSWR(url, fetchJson)
  const { data: project } = useSWR(`/api/project?id=${user?.projectId}`, fetchJson)
  const { data: module } = useSWR(`/api/project?id=${user?.projectId}&modules=${testType}`, fetchJson, swrOptions)

  const [ wbSeq, setWbSeq ] = useState(null)
  const [ element, setElement ] = useState(null)
  const [ statement, setStatement ] = useState(null)

  return (
    <TestContext.Provider value={{
      user,
      project,
      module,
      testType, testSlug,
      submitting, setSubmitting,
      progress, mutateProgress,
      wbSeq, setWbSeq,
      element, setElement,
      statement, setStatement,
    }}>
      {children}
    </TestContext.Provider>
  )
}

function Header() {
  const { user, module, progress } = useContext(TestContext)

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
  const { user, progress, testSlug, element, statement, wbSeq, setElement, setStatement, setWbSeq, mutateProgress, submitting, setSubmitting } = useContext(TestContext)
  const seq = sequenceArray(progress?.sequence)[progress?.done]
  const testItem = ACESTestItem(testSlug, seq)

  // Classess
  const labelSelected = "rounded font-semibold"
  const labelNormal = "rounded cursor-pointer bg-green-300 font-semibold hover:-m-1 hover:p-1 hover:bg-opacity-25"
  const divNormal = "rounded flex flex-row px-4 py-3 cursor-pointer bg-gradient-to-r from-yellow-100 hover:bg-gradient-to-r hover:from-white hover:bg-opacity-100 border border-orange-300 hover:border-green-400"
  const divSelected = "rounded flex flex-row items-center px-4 py-3 bg-green-500 border border-green-500"
  const btnActive = "rounded border-2 border-green-400 text-lg text-green-500 px-6 py-3 hover:border-green-500 hover:bg-green-500 hover:text-white active:bg-green-700"
  const btnDisabled = "rounded border-2 text-lg text-gray-400 px-6 py-3"

  function select(event, label) {
    setWbSeq(seq)
    setElement(event.target.value)
    setStatement(event.target.placeholder)
    if (label == 'label1') {
      document.getElementById("label2").className = labelNormal
      document.getElementById("wrap2").className = divNormal
      document.getElementById("text2").className = "flex-grow text-gray-700"
      document.getElementById("label1").className = labelSelected
      document.getElementById("wrap1").className = divSelected
      document.getElementById("text1").className = "flex-grow text-white subpixel-antialiased tracking-wide"
    } else if (label == 'label2') {
      document.getElementById("label1").className = labelNormal
      document.getElementById("wrap1").className = divNormal
      document.getElementById("text1").className = "flex-grow text-gray-700"
      document.getElementById("label2").className = labelSelected
      document.getElementById("wrap2").className = divSelected
      document.getElementById("text2").className = "flex-grow text-white subpixel-antialiased"
    }
    document.getElementById("submit").className = btnActive
    document.getElementById("submit").disabled = false
  }

  function reset() {
    if (document.querySelector('input[name="option"]:checked')){
      document.querySelector('input[name="option"]:checked').checked = false
    }

    document.getElementById("submit").disabled = true
    document.getElementById("submit").className = btnDisabled
    document.getElementById("label1").className = labelNormal
    document.getElementById("wrap1").className = divNormal
    document.getElementById("text1").className = "flex-grow text-gray-700"
    document.getElementById("label2").className = labelNormal
    document.getElementById("wrap2").className = divNormal
    document.getElementById("text2").className = "flex-grow text-gray-700"
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSubmitting(true)

    const body = {
      seq: progress.done + 1,
      wbSeq: wbSeq,
      items: parseInt(progress.items),
      elm: element,
      statement: statement,
      lastTouched: progress.touched,
    }
    console.log(body)
    reset()
    const url = getApiUrl(BASE_API_URL, user)
    const response = await fetchJson(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
      body: JSON.stringify(body),
    })
    console.log(response)
    if (response.done == body.seq) {
      clearInterval(intervalHandle)

      setWbSeq(null)
      setElement(null)
      setStatement(null)

      setSubmitting(false)
      // startTimer(response.remains)
      window.scrollTo(0, 0)
    }

    mutateProgress()
  }

  return (
    <div className="max-w-2xl mx-auto my-12">
      <form id="form" className="" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-4">
          <label id="label1" htmlFor="opt1" className={labelNormal}>
            <div className="rounded bg-white">
              <div id="wrap1" className={divNormal}>
                <input className="hidden" type="radio" id="opt1" name="option"
                  value={testItem ? testItem[0]["elm"] : ''}
                  placeholder={testItem ? testItem[0]["statement"] : '...'}
                  onChange={(event) => {
                    select(event, 'label1')
                    console.log(event.target.value)
                  }}
                />
                <div id="text1" className="flex-grow text-gray-700">{testItem ? testItem[0]["statement"] : '...'}</div>
                <div className="flex-0 pl-4 text-white text-center text-3xl leading-4">&#10003;</div>
              </div>
            </div>
          </label>

          <label id="label2" htmlFor="opt2" className={labelNormal}>
            <div className="rounded bg-white">
              <div id="wrap2" className={divNormal}>
                <input className="hidden" type="radio" id="opt2" name="option"
                  value={testItem ? testItem[1]["elm"] : ''}
                  placeholder={testItem ? testItem[1]["statement"] : '...'}
                  onChange={(event) => {
                    select(event, 'label2')
                    console.log(event.target.value)
                  }}
                />
                <div id="text2" className="flex-grow text-gray-700">{testItem ? testItem[1]["statement"] : '...'}</div>
                <div className="flex-0 pl-4 text-white text-center text-3xl leading-4">&#10003;</div>
              </div>
            </div>
          </label>
        </div>
        <div className="text-center font-normal mt-10">
          <button id="submit" type="submit" disabled className={btnDisabled}>
            Pernyataan berikutnya
          </button>
        </div>
      </form>
    </div>
  )
}

let intervalHandle = 0

function startTimer(remaining) {
  const ending = new Date().getTime() + remaining
  intervalHandle = setInterval(function() {
    let now = new Date().getTime()
    let distance = ending - now
    let h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let s = Math.floor((distance % (1000 * 60)) / 1000);

    let hours = (h < 10) ? "0" + h : h
    let minutes = (m < 10) ? "0" + m : m
    let seconds = (s < 10) ? "0" + s : s
    let text = remaining + ": " + hours + ":" + minutes + ":" + seconds
    let html = '<span>' + text +'</span>'
    if (distance < (60 * 1000)) {
      html = '<span style="color:red;">' + text +'</span>'
    }

    if (document.getElementById("timer")) {
      document.getElementById("timer").innerHTML = html
    }

    if (distance < (10 * 1000)) {
      clearInterval(intervalHandle)
    }

  }, 1000)
}

function Step() {
  const { progress } = useContext(TestContext)
  // const seq = sequenceArray(progress?.sequence)[progress?.done]
  // const testItem = ACESTestItem(testSlug, seq)

  let timerStarted = false
  function _startTimer() {
    if (progress && progress?.remains && !timerStarted) {
      timerStarted = true
      console.log("Started")
      clearInterval(intervalHandle)
      // intervalHandle = 0
      // startTimer(progress.remains)
    }
  }

  return (
    <div onMouseEnter={_startTimer} className="mx-w-3xl mx-auto">
      <div className="h-20 bg-white border-b bg-gradient-to-t from-gray-100 text-gray-700 p-4">
        <p className="max-w-2xl mx-auto text-center tracking-wider uppercase font-lights">
          Pilih yang paling pas bagi Anda
        </p>
      </div>
      <Choices />
      {/* <pre className="pre">{JSON.stringify(seq, null, 2)}</pre> */}

    </div>
  )
}

function Content() {
  const { progress, testSlug, wbSeq, element, statement } = useContext(TestContext)
  const sequence = sequenceArray(progress?.sequence)
  const info = ACESModule(testSlug, "info")
  return (
    <div className="">
      <Header />
      <Step />
      <p className="text-centers text-xs text-orange-500">DEBUG:<br/>
      {progress?.touched} : {progress?.done + 1} / {wbSeq} / {element} / {statement}
      </p>
      {/* <pre className="pre my-10">PROGRESS: {JSON.stringify(progress, null, 2)}</pre> */}
      <p className="text-sm text-center my-8">
        <Link href="/welcome">
          <a className="rounded border px-4 py-3 text-blue-600 hover:text-red-600">Back to Home</a>
        </Link>
      </p>
    </div>
  )
}