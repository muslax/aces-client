import { createContext, memo, useContext, useState } from 'react'
import useUser, { updateUserPath } from 'lib/useUser'
import fetchJson from 'lib/fetchJson'
import Layout from "components/Layout";
import useSWR, { mutate } from 'swr';
import { getApiUrl } from "lib/utils";
import { ACESModule, ACESTestItem, getTestSlug } from "lib/modules";

const BASE_API_URL = "/api/aime"

export default function AimeSteps() {
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
    <Layout title="AIME">
      <Content />
    </Layout>
  )
})

const TestContext = createContext();

function TestProvider({ user, children }) {
  const testType = "aime"
  const testSlug = getTestSlug(user, testType)

  const [submitting, setSubmitting] = useState(false);
  const url = getApiUrl(BASE_API_URL, user, {fullname: user.fullname})
  const swrOptions = process.env.NODE_ENV == 'development' ? {
    refreshInterval: 0, revalidateOnFocus: false
  } : { revalidateOnFocus: true }
  const { data: progress, mutate: mutateProgress } = useSWR(url, fetchJson)
  const { data: project } = useSWR(`/api/project?id=${user?.projectId}`, fetchJson)
  const { data: module } = useSWR(`/api/project?id=${user?.projectId}&modules=${testType}`, fetchJson, swrOptions)

  return (
    <TestContext.Provider value={{
      user,
      project,
      module,
      testType, testSlug,
      submitting, setSubmitting,
      progress, mutateProgress,
    }}>
      {children}
    </TestContext.Provider>
  )
}

const LikertButton = ({ likert, seq, handler }) => {
  const wrap = "wrap rounded-md bg-green-300 hover:-m-1 hover:p-1 hover:bg-opacity-25 text-lg"
  const inner = "inner flex items-center cursor-pointer text-gray-700 hover:text-green-600 font-normal hover:tracking-wide rounded bg-gradient-to-r from-orange-100 border border-orange-300 hover:bg-gradient-to-r hover:from-white hover:bg-opacity-75 hover:border-green-400 px-4 py-2"
  return (
    <div key={likert[seq]} className={wrap}>
      <div className="bg-white rounded">
        <label htmlFor={`likert-${seq}`} className={inner}>
          <div className="flex-grow">{likert[seq]}</div>
          <div className="w-5 h-5 rounded-sm bg-oranges-200 text-white text-3xl leading-4">&#10003;</div>
          <input onChange={(event) => { handler(event) }} likert={seq} id={`likert-${seq}`} type="radio" name="aimelikert" className="likert hidden" value={likert[seq]} />
        </label>
      </div>
    </div>
  )
}

let intervalHandle = 0

function setTimer(remaining) {
  let ending = new Date().getTime() + remaining
  intervalHandle = setInterval(function() {
    let now = new Date().getTime()
    let distance = ending - now
    let h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let s = Math.floor((distance % (1000 * 60)) / 1000);

    let hours = (h < 10) ? "0" + h : h
    let minutes = (m < 10) ? "0" + m : m
    let seconds = (s < 10) ? "0" + s : s
    let text = hours + ":" + minutes + ":" + seconds
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
  const { user, progress, testSlug, mutateProgress, submitting, setSubmitting } = useContext(TestContext)
  const element = ACESTestItem(testSlug, progress?.done)

  const [likert, setLikert] = useState(0)
  const [stance, setStance] = useState('')
  const aimeLikert = ACESModule(testSlug, 'likert')


  function selectLikert(event) {
    document.querySelectorAll('.innerSelected').forEach((el) => {
      el.className = inner
      el.parentElement.parentElement.className = wrap
    })

    event.target.parentElement.className = innerSelected
    event.target.parentElement.parentElement.parentElement.className = wrapSelected
    setLikert(parseInt(event.target.getAttribute("likert")))
    setStance(event.target.value)

    document.getElementById("submit").removeAttribute("disabled")
    document.getElementById("submit").className = btnActive
    console.log(likert, stance)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSubmitting(true)

    // Reset likert
    document.querySelectorAll('.innerSelected').forEach((el) => {
      el.className = inner
      el.parentElement.parentElement.className = wrap
    })
    document.querySelector('input[name="aimelikert"]:checked').checked = false
    document.getElementById("submit").disabled = true
    document.getElementById("submit").className = btnDisabled


    const body = {
      seq: progress.done + 1,
      total: progress.items,
      element: element[0],
      likert: likert,
      stance: stance,
      statement: element[1],
      lastTouched: progress.touched,
    }
    console.log(body)

    const url = getApiUrl(BASE_API_URL, user)
    const response = await fetchJson(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
      body: JSON.stringify(body),
    })

    clearInterval(intervalHandle)
    // intervalHandle = 0
    // setTimer(response.remains)
    if (response.done == body.seq) {
      console.log("POSTED", response.remains)
      setSubmitting(false)
      setTimer(response.remains)
    }

    setLikert(0)
    setStance('')

    mutateProgress()
  }

  if (!progress) return (
    <div>LOADING...</div>
  )

  const btnActive = "rounded border-2 border-green-400 text-lg text-green-500 px-6 py-3 hover:border-green-500 hover:bg-green-500 hover:text-white active:bg-green-700"
  const btnDisabled = "rounded border-2 text-lg text-gray-400 px-6 py-3"
  const wrap = "wrap rounded-md bg-green-300 hover:-m-1 hover:p-1 hover:bg-opacity-25 text-lg"
  const wrapSelected = "wrapSelected rounded-md bg-green-300 text-lg"
  const inner = "inner flex items-center cursor-pointer text-gray-700 hover:text-green-600 font-normal hover:tracking-wide rounded bg-gradient-to-r from-orange-100 border border-orange-300 hover:bg-gradient-to-r hover:from-white hover:bg-opacity-75 hover:border-green-400 px-4 py-2"
  const innerSelected = "innerSelected flex items-center text-white font-semibold tracking-wide rounded bg-green-500 border border-green-500 px-4 py-2"

  return (
    <div>
      {/* <div className="max-w-3xl mx-auto my-8">
        <div className="flex flex-col justify-center items-center w-20 h-20 rounded-full mx-auto bg-gradient-to-t from-gray-400 text-xl text-center leading-tight text-gray-500 my-6">
          <span className="pt-2 pb-1">{progress?.done + 1}</span>
          <span className="border-t border-gray-400 text-lg text-gray-100 pt-1 px-5">{progress?.items}</span>
        </div>
      </div> */}
      <div className="border-ts bg-white border-ts border-b bg-gradient-to-t from-gray-100 text-gray-700 px-4">
        <p className="max-w-2xl mx-auto text-3xl text-center leading-normal font-semibold pt-6 pb-12">{element[1]}</p>
        {/* {submitting && <p className="max-w-2xl mx-auto text-3xl text-gray-300 text-center leading-normal font-semibold pt-6 pb-12">{element[1]}</p>} */}
      </div>

      <div className="max-w-3xl mx-auto my-10">
        <div className="grid grid-cols-1 gap-4 max-w-sm mx-auto">
          <LikertButton likert={aimeLikert} seq="1" handler={selectLikert} />
          <LikertButton likert={aimeLikert} seq="2" handler={selectLikert} />
          <LikertButton likert={aimeLikert} seq="3" handler={selectLikert} />
          <LikertButton likert={aimeLikert} seq="4" handler={selectLikert} />
          <LikertButton likert={aimeLikert} seq="5" handler={selectLikert} />
        </div>
        {submitting && <p className="text-red-500">Submitting...</p>}
        <div className="text-center font-normal mt-8">
          <form onSubmit={handleSubmit}>
            <input type="hidden" id="likert" name="seq" value=""/>
            <button id="submit" type="submit" disabled className={btnDisabled}>
              Pernyataan berikutnya
            </button>
          </form>
        </div>
      </div>
    </div>
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
          <span className=" bg-yellow-600 bg-opacity-25 px-3 border-l border-r border-yellow-500">{progress?.done + 1}</span>
          <span className="pl-3">{progress?.items}</span>
        </div>
      </div>

      <div className="flex flex-row text-sm text-gray-700 font-light px-2 py-2 border-b border-orange-300">
        <div className="flex-grow font-semibold">{user?.fullname}</div>
        <div className="flex-1 text-right text-xs font-mono">
          <div id="timer" className="mr-2">&nbsp;</div>
        </div>
      </div>
    </div>
  )
}

function Content() {
  // const { user, module, progress } = useContext(TestContext)
  return (
    <div className="">
      <Header />
      <Step />
      {/* <pre className="pre my-10">PROGRESS: {JSON.stringify(progress, null, 2)}</pre> */}
    </div>
  )
}