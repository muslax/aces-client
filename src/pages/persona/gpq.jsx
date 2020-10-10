import { createContext, memo, useContext, useState } from 'react'
import Link from 'next/link'
import useUser from 'lib/useUser'
import fetchJson from 'lib/fetchJson'
import Layout from "components/Layout";
import useSWR, { mutate } from 'swr';

const PAUSED = 9

/*
STATE  0 Guide/Introduction
STATE  1 Working on first item
STATE  2 Working on item #2 up to before last item
STATE  3 Working on last item
STATE  9 Paused
STATE 99 Finished
*/

export default function GPX() {
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
    <Layout title="ABCD">
      <Header />
      <MainContent />
    </Layout>
  )
})

const PageContext = createContext()

function TestProvider({ user, children }) {
  const [state, setState] = useState(-1);
  const [tempState, setTempState] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const url1 = buildApiUrl(user, { fullname: user.fullname })
  const { data: progress, error, mutate: mutateProgress } = useSWR(url1, fetchJson)

  const url2 = buildApiUrl(user, { sequence: 1 })
  const { data: sequence } = useSWR(url2, fetchJson)

  // Commented because it didnt run here
  // mutate(url1)

  // Commented because it runs forever
  // enterTest(user, progress)

  return (
    <PageContext.Provider value={{
      user,
      sequence,
      state, setState,
      tempState, setTempState,
      submitting, setSubmitting,
      progress, mutateProgress
      }}>
      {children}
    </PageContext.Provider>
  )
}

function getTestState(progress) {
  const { items, done } = progress
  if (done == 0) return 1
  else if (done == items) return 99
  else if (done == items - 1) return 3 // last item
  return 2 // item #2 up to before last item
}

function buildApiUrl(user, opt) {
  let url = `/api/gpq?license=${user?.license}&projectId=${user?.projectId}&personaId=${user?._id}`
  if (opt.module) {
    return `${url}&module=${opt.module}`
  } else if (opt.fullname) {
    return `${url}&fullname=${opt.fullname}`
  } else if (opt.sequence) {
    return `${url}&sequence=1`
  } else if (opt.item) {
    return `${url}&item=${opt.item}`
  }
  return url
}

async function enterTest(user, progress) {
  const url = buildApiUrl(user, {}) // Empty license, but OK
  console.log("enterTest URL:", url)
  const update = progress?.initiated ? false : true
  const response = await fetchJson(url, {
    method: 'PUT',
      headers: {
        Accept: 'application/json',
      },
      body: JSON.stringify({ action: "init", update: update }),
  })
  console.log(response)

  const url1 = buildApiUrl(user, { fullname: user.fullname })
  mutate(url1)
}

async function startTest(user, progress) {
  const url = buildApiUrl(user, {}) // Empty license, but OK
  console.log("enterTest URL:", url)
  const update = progress.started ? false : true
  const response = await fetchJson(url, {
    method: 'PUT',
      headers: {
        Accept: 'application/json',
      },
      body: JSON.stringify({ action: "start", update: update }),
  })
  console.log(response)

  const url1 = buildApiUrl(user, { fullname: user.fullname })
  mutate(url1)
}

async function fetchModule(url) {
  const response = await fetch(url)
  const data = await response.json()
  return data
}

async function handleSubmit(e) {
  e.preventDefault()
}

function Header() {
  const { user, state, setState, tempState, setTempState, progress, submitting } = useContext(PageContext)
  const url = buildApiUrl(user, { module: "gpq" })
  const { data: module } = useSWR(url, fetchModule)

  return (
    <div className="mb-8">
      <div className="flex flex-row text-xs px-1 py-2 pt-3">
        <div className="flex-1 items-center">
          <span className="uppercase tracking-wide sm:tracking-wider md:tracking-widest">{user?.projectTitle}</span>
          <span className="ml-3">{state}</span>
        </div>
        <div className="flex-grow text-right">
          <span className="font-bold">{user?.fullname}</span>
        </div>
      </div>
      <div className="flex flex-row bg-gray-200 rounded-sm items-center text-gray-700">
        <div className="flex flex-row">
          <p className="px-4 border-r border-white text-gray-800s leading-10 tracking-wide font-semibold">{module?.title}</p>
          {state == 0 && (
            <p className="px-2 text-sm leading-10 tracking-wide font-semibold">{module?.description}</p>
          )}
          {state > 0 && (
            <>
            <p className="px-2 border-r border-white bg-grays-400 text-swhite leading-10 tracking-wide font-semibold">{module?.items}</p>
            {!submitting && <p className="w-12 border-r border-white text-center leading-10 tracking-wide font-semibold">{progress?.done + 1}</p>}
            {submitting && <p className="w-12 border-r border-white text-center bg-gray-500 text-white leading-10 tracking-wide font-semibold">{progress?.done + 1}</p>}
            </>
          )}
        </div>
        <div className="flex flex-grow flex-row-reverse leading-10 text-sm text-gray-700">
          {state == 0 && (
            <span className="text-xs uppercase tracking-wider mr-3">Pengantar</span>
          )}
          {state > 0 && state < 9 && (
            <button onClick={() => {
              const s = state
              setTempState(state);
              setState(9);
            }} className="border-l border-white rounded-r-sm px-4 text-center text-gray-600 hover:bg-gray-600 hover:text-white">Pause</button>
          )}
        </div>
      </div>
      {state > 0 && (
        <div className="flex flex-row text-sm text-gray-700 font-light px-1s py-2 border-b">
          <div className="flex-grow">{module?.description}</div>
          <div className="flex flex-1 flex-row-reverse">
            <span className="w-32 text-right pr-1">320:56 PAUSED</span>
          </div>
        </div>
      )}
    </div>
  )
}

function Prepare() {
  const { user, progress, setState } = useContext(PageContext)
  const url = buildApiUrl(user, { module: "gpq" })
  const { data: module } = useSWR(url, fetchModule)

  return (
    <div>
      <h1 className="text-3xl text-center font-light mb-6">Selamat Datang</h1>
      <p className="text-center my-6">
        Tes ini terdiri dari {module?.items} soal dengan waktu penyelesaian
        paling lama {module?.maxTime}.
      </p>
      <p className="text-center">
        <button onClick={(event) => {
          enterTest(user, progress);
          setState(0);
        }} className="rounded border border-green-400 text-lg text-green-500 font-bold px-8 py-3 hover:bg-green-500 hover:text-white active:bg-green-700">Lanjut</button>
      </p>
    </div>
  )
}

function Guide() {
  const { user, progress, setState } = useContext(PageContext)

  return (
    <div className="">
      <h1 className="text-3xl text-center font-light mb-6">Petunjuk Mengerjakan Tes</h1>
      <div className="bg-yellow-200 text-sm text-orange-700 font-light border-l-8 border-orange-700 my-6 px-4 py-4">
        Anda tercatat pernah mengerjakan test ini hingga{` `}
        <span className="font-semibold">Nomor {progress?.done}</span>.
        Bila Anda merasa sudah memahami petunjuk ini, Anda dapat langsung
        mulai melanjutkan dengan menekan tombol Lanjut di
        bagian bawah halaman.
      </div>
      <p className="mb-8">
        Elit rhoncus adipiscing facilisis efficitur vitae consectetur orci consequat, pellentesque est sem blandit tristique curabitur vulputate ultricies, senectus enim risus hac mollis dapibus in magnis, arcu tincidunt lectus maximus conubia porttitor integer. Ipsum vel suspendisse tempor maximus mauris in blandit interdum quisque a, platea laoreet convallis elementum ad penatibus est luctus ex felis, vehicula magna duis quam hendrerit eros aenean finibus nisi, tincidunt ridiculus eu magnis semper rutrum diam turpis mi. Proin pellentesque dignissim quis vehicula ligula cubilia egestas hac mi, lectus fringilla faucibus lacus primis consequat convallis nascetur accumsan, senectus at sem lacinia imperdiet conubia fusce auctor, ac urna purus bibendum viverra tincidunt blandit duis.
      </p>
      <p className="text-center">
        <button onClick={(event) => {
          startTest(user, progress);
          setState(getTestState(progress));
        }} className="rounded border border-green-400 text-lg text-green-500 font-bold px-8 py-3 hover:bg-green-500 hover:text-white active:bg-green-700">Lanjut</button>
      </p>
    </div>
  )
}

function Paused() {
  const { tempState, setState } = useContext(PageContext)
  return (
    <div>
      <div className="paused flex flex-col justify-center items-center bg-gray-200 -mt-8 -mb-32">
        <h1 className="text-3xl text-center font-light mb-16">Istirahat Sejenak</h1>
        <button onClick={() => {
          setState(tempState)
        }} className="rounded border border-gray-500 text-lg text-gray-600 tracking-wide font-bold px-8 py-3 hover:border-gray-600 hover:bg-gray-600 hover:text-white active:bg-gray-700">Melanjutklan lagi</button>
      </div>
      <style jsx>{`
      .paused {
        height: 500px;
      }
      `}</style>
    </div>
  )
}

function TestContent() {
  const { user, progress, mutateProgress, sequence, submitting, setSubmitting } = useContext(PageContext)
  const [ elm, setElm ] = useState(null)
  const [ statement, setStatement ] = useState(null)

  const url = buildApiUrl(user, { item: progress.done + 1 })
  const { data: testItem, error, setTestItem } = useSWR(url, fetchJson)

  const selectOption = (id, event) => {
    if (submitting) return false

    setElm(event.target.value)
    setStatement(event.target.placeholder)

    if (id == 'label1') {
      document.getElementById("label2").className = normalClass
      document.getElementById("label1").className = selectedClass
      document.getElementById("btn").removeAttribute('disabled')
      document.getElementById("btn").className = btnActive
    } else if (id == 'label2') {
      document.getElementById("label1").className = normalClass
      document.getElementById("label2").className = selectedClass
      document.getElementById("btn").removeAttribute('disabled')
      document.getElementById("btn").className = btnActive
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSubmitting(true)

    document.getElementById("_opt").click()
    document.getElementById('optForm').reset()

    const url = buildApiUrl(user, {})
    const done = progress.done
    console.log('DONE', done)

    const body = {
      seq: progress.done + 1,
      wbSeq: sequence[progress.done],
      elm: elm,
      statement: statement,
      lastTouched: progress.touched,
    }

    const response = await fetchJson(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
      body: JSON.stringify(body),
    })

    mutateProgress()
    console.log('DONE', progress.done)

    document.getElementById("btn").setAttribute('disabled', true)
    document.getElementById("btn").className = btnNormal
    document.getElementById("label2").className = normalClass
    document.getElementById("label1").className = normalClass

    // if (progress.done == progress.items) setState(9)
    // if (response.done == response.items) setState(9)

    setElm(null)
    setStatement(null)
    setTimeout(function() {
      setSubmitting(false)
    }, 500)
  }

  const selectedClass = "rounded cursor-pointer bg-blue-500 font-semibold text-white p-4 mb-4"
  const normalClass = "rounded cursor-pointer bg-blue-100 border border-blue-200 text-gray-700 font-semibold p-4 mb-4 hover:border-blue-500"
  const btnNormal = "rounded border-2 border-gray-400 text-xl text-gray-400 tracking-wide font-semibold px-12 py-3"
  const btnActive = "rounded border-2 border-gray-400 text-xl text-gray-600 tracking-wide font-semibold hover:text-white hover:border-gray-700 hover:bg-gray-700 px-12 py-3"

  return (
    <div>
      <form onSubmit={handleSubmit} id="optForm" className="flex flex-col mb-8">
        <p className="text-center text-ssm text-gray-600 font-light mt-12 mb-12">
          { submitting ? 'Menyimpan pilihan Anda...' : 'Pilih yang paling Anda sukai, lalu tekan tombol Lanjut.' }
        </p>
        {/* Hack */}
        <input className="hidden" type="radio" id="_opt" name="option" value="" />
        <label id="label1" htmlFor="opt1" className={normalClass}>
          <input className="hidden" type="radio" id="opt1" name="option"
            value={testItem?.contents[0]["elm"]}
            placeholder={testItem?.contents[0]["statement"]}
            onChange={(event) => {
              selectOption('label1', event)
            }}
          />
          <span>{ submitting ? '...' : testItem?.contents[0]["statement"] }</span>
        </label>
        <label id="label2" htmlFor="opt2" className={normalClass}>
          <input className="hidden" type="radio" id="opt2" name="option"
            value={testItem?.contents[1]["elm"]}
            placeholder={testItem?.contents[1]["statement"]}
            onChange={(event) => {
              selectOption('label2', event)
            }}
          />
          <span>{ submitting ? '...' : testItem?.contents[1]["statement"] }</span>
        </label>
        <div className="p-2 my-8 text-center">
          <button id="btn" disabled className={btnNormal} type="submit">
            Lanjut
          </button>
        </div>
        {/* <div className="mt-4 border-t border-red-300 py-2 text-red-500 text-center">{ submitting ? 'SUBMITTING' : 'IDLE' }</div> */}
        {/* <div className="text-blue-500 border-t border-b border-red-300 py-2">Elm: {elm} {statement}</div> */}
      </form>
    </div>
  )
}

function MainContent() {
  const { state } = useContext(PageContext)

  return (
    <>
    {state == -1 && <Prepare />}
    {state == 0 && <Guide />}
    {state == 9 && <Paused />}
    {(state > 0 && state <9) && <TestContent />}
    </>
  )
}

/*
[Error] Failed to load resource: Could not connect to the server. (gpq, line 0)
http://localhost:3003/api/gpq
  ?license=sdi
  &projectId=5f786ad74719017521867285
  &personaId=5f786ee0d11c7699cf09e598
  &fullname=Bima%20Suni
*/