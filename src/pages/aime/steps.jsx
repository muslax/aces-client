import { createContext, memo, useContext, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import useUser, { updateUserPath } from 'lib/useUser'
import fetchJson from 'lib/fetchJson'
import Layout from "components/Layout";
import useSWR, { mutate } from 'swr';
import Header from "components/Header";
import { AIME_ITEMS, AIME_LIKERT, getElement } from "lib/aime-1.0";

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
  const [submitting, setSubmitting] = useState(false);
  const url = buildApiUrl(user, {fullname: user.fullname})
  const { data: progress, mutate: mutateProgress } = useSWR(url, fetchJson)
  const { data: project } = useSWR(`/api/project?id=${user?.projectId}`, fetchJson)

  return (
    <TestContext.Provider value={{
      user,
      project,
      submitting, setSubmitting,
      progress, mutateProgress,
    }}>
      {children}
    </TestContext.Provider>
  )
}

function buildApiUrl(user, opt) {
  let url = `/api/aime?license=${user?.license}&project=${user?.projectId}&persona=${user?._id}`
  if (opt.fullname) return `${url}&fullname=${opt.fullname}`;
  else if (opt.something) return `${url}&something=${opt.something}`;

  return url
}

function unused() {
  const optWrap = "optwrap rounded-md bg-blue-300 flex justify-center items-center hover:bg-opacity-25 hover:-m-1 hover:p-1"
  const optWrapSelected = "optwrap rounded-md bg-blue-300 flex justify-center items-center hover:bg-opacity-25"
  const optInner = "optinner cursor-pointer h-full w-full flex justify-center items-center text-center bg-white text-blue-600 rounded border border-blue-300 hover:border-blue-400 p-2 sm:p-3 md:p-4"
  const optInnerSelected = "optinner h-full w-full flex justify-center items-center text-center bg-blue-500 text-white font-semibold rounded border border-blue-500 p-2 sm:p-3 md:p-4"

  function select(e) {
    document.querySelectorAll('.optinner').forEach((el) => {
      el.className = optInner
      el.parentElement.className = optWrap
    })
    // self
    const self = document.querySelector('input[name="likert"]:checked')
    self.parentElement.className = optWrapSelected
    self.nextElementSibling.className = optInnerSelected
    // activate submit button
    document.getElementById("submit").setAttribute("disabled", false)
    document.getElementById("submit").className = btnActive
  }


  return (
    <div className="h-20 mb-8">
      <div className="grid grid-cols-5 gap-2 sm:gap-3 h-full leading-tight justify-items-stretch text-xs sm:text-sm uppercase text-center">
        <label htmlFor="likert1" className={optWrap}>
          <input onChange={(event) => { select(event) }} id="likert1" type="radio" name="likert" className="hidden" value="Sangat setuju" />
          <span className={optInner}>Sangat setuju</span>
        </label>
        <label htmlFor="likert2" className={optWrap}>
          <input onChange={(event) => { select(event) }} id="likert2" type="radio" name="likert" className="hidden" value="Setuju" />
          <span className={optInner}>Setuju</span>
        </label>
        <label htmlFor="likert3" className={optWrap}>
          <input onChange={(event) => { select(event) }} id="likert3" type="radio" name="likert" className="hidden" value="Ragu-ragu" />
          <span className={optInner}>Ragu-ragu</span>
        </label>
        <label htmlFor="likert4" className={optWrap}>
          <input onChange={(event) => { select(event) }} id="likert4" type="radio" name="likert" className="hidden" value="Tidak setuju" />
          <span className={optInner}>Tidak setuju</span>
        </label>
        <label htmlFor="likert5" className={optWrap}>
          <input onChange={(event) => { select(event) }} id="likert5" type="radio" name="likert" className="hidden" value="Sangat tidak setuju" />
          <span className={optInner}>Sangat tidak setuju</span>
        </label>
      </div>
    </div>
  )
}

function Step() {
  const { user, progress, mutateProgress, submitting, setSubmitting } = useContext(TestContext)
  const element = getElement(progress?.done + 1)

  const [likert, setLikert] = useState(0)
  const [stance, setStance] = useState('')


  function selectLikert(event) {
    console.log(event.target.value)
    document.querySelectorAll('.innerSelected').forEach((el) => {
      el.className = inner
      el.parentElement.parentElement.className = wrap
    })

    const self = document.querySelector('input[name="aimelikert"]:checked')
    self.parentElement.className = innerSelected
    self.parentElement.parentElement.parentElement.className = wrapSelected
    setLikert(parseInt(self.getAttribute("likert")))
    setStance(event.target.value)

    // document.getElementById("likert").value = self.getAttribute("likert")
    document.getElementById("submit").removeAttribute("disabled")
    document.getElementById("submit").className = btnActive
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
      element: element[0],
      likert: likert,
      stance: stance,
      statement: element[1],
      lastTouched: progress.touched,
    }
    console.log(body)

    const url = buildApiUrl(user, {})
    const response = await fetchJson(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
      body: JSON.stringify(body),
    })

    // TODO: states, path ...
    setLikert(0)
    setStance('')

    mutateProgress()
  }

  if (!progress) return (
    <div>LOADING...</div>
  )

  const btnActive = "rounded border border-green-400 text-lg text-green-500 px-6 py-3 hover:border-green-500 hover:bg-green-500 hover:text-white active:bg-green-700"
  const btnDisabled = "rounded border border text-lg text-gray-400 px-6 py-3"
  const wrap = "wrap rounded-md bg-blue-300 hover:-m-1 hover:p-1 hover:bg-opacity-25 text-lg"
  const wrapSelected = "wrapSelected rounded-md bg-blue-300 text-lg"
  const inner = "inner flex items-center cursor-pointer text-gray-700 hover:text-blue-600 font-normal hover:tracking-wide rounded bg-gradient-to-r from-orange-100 border border-orange-300 hover:bg-gradient-to-r hover:from-white hover:bg-opacity-75 hover:border-blue-400 px-4 py-2"
  const innerSelected = "innerSelected flex items-center text-white font-semibold tracking-wide rounded bg-blue-500 border border-blue-500 px-4 py-2"

  return (
    <div>
      <div className="max-w-3xl mx-auto my-8">
        <div className="flex flex-col justify-center items-center w-20 h-20 rounded-full mx-auto bg-gradient-to-t from-gray-400 text-xl text-center leading-tight text-gray-500 my-6">
          <span className="pt-2 pb-1">{progress?.done + 1}</span>
          <span className="border-t border-gray-400 text-lg text-gray-100 pt-1 px-5">{progress?.items}</span>
        </div>
      </div>
      <div className="border-ts bg-white border-ts border-b bg-gradient-to-t from-gray-100 text-gray-700 px-4">
        <p className="max-w-2xl mx-auto text-3xl text-center leading-normal font-semibold py-8">{
          element ? element[1] : "Error"
        }</p>
      </div>
      <div className="max-w-3xl mx-auto my-10">
        <div className="grid grid-cols-1 gap-4 max-w-sm mx-auto">
          <div className={wrap}>
            <div className="bg-white rounded">
              <label htmlFor="likert-1" className={inner}>
                <div className="flex-grow">Sangat setuju</div>
                <div className="w-5 h-5 rounded-sm bg-oranges-200 text-white text-3xl leading-4">&#10003;</div>
                <input onChange={(event) => { selectLikert(event) }} likert="1" id="likert-1" type="radio" name="aimelikert" className="hidden" value="Sangat setuju" />
              </label>
            </div>
          </div>
          <div className={wrap}>
            <div className="bg-white rounded">
              <label htmlFor="likert-2" className={inner}>
                <div className="flex-grow">Setuju</div>
                <div className="w-5 h-5 rounded-sm bg-oranges-200 text-white text-3xl leading-4">&#10003;</div>
                <input onChange={(event) => { selectLikert(event) }} likert="2" id="likert-2" type="radio" name="aimelikert" className="hidden" value="Setuju" />
              </label>
            </div>
          </div>
          <div className={wrap}>
            <div className="bg-white rounded">
              <label htmlFor="likert-3" className={inner}>
                <div className="flex-grow">Ragu-ragu</div>
                <div className="w-5 h-5 rounded-sm bg-oranges-200 text-white text-3xl leading-4">&#10003;</div>
                <input onChange={(event) => { selectLikert(event) }} likert="3" id="likert-3" type="radio" name="aimelikert" className="hidden" value="Ragu-ragu" />
              </label>
            </div>
          </div>
          <div className={wrap}>
            <div className="bg-white rounded">
              <label htmlFor="likert-4" className={inner}>
                <div className="flex-grow">Tidak setuju</div>
                <div className="w-5 h-5 rounded-sm bg-oranges-200 text-white text-3xl leading-4">&#10003;</div>
                <input onChange={(event) => { selectLikert(event) }} likert="4" id="likert-4" type="radio" name="aimelikert" className="hidden" value="Tidak setuju" />
              </label>
            </div>
          </div>
          <div className={wrap}>
            <div className="bg-white rounded">
              <label htmlFor="likert-5" className={inner}>
                <div className="flex-grow">Sangat tidak setuju</div>
                <div className="w-5 h-5 rounded-sm bg-oranges-200 text-white text-3xl leading-4">&#10003;</div>
                <input onChange={(event) => { selectLikert(event) }} likert="5" id="likert-5" type="radio" name="aimelikert" className="hidden" value="Sangat tidak setuju" />
              </label>
            </div>
          </div>
        </div>
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

function Content() {
  const { user, project, progress } = useContext(TestContext)
  return (
    <div className="">
      <Header user={user} project={project} type="aime" />
      <Step />
      <pre className="pre my-10">PROGRESS: {JSON.stringify(progress, null, 2)}</pre>
    </div>
  )
}