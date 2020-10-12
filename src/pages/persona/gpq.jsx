import { createContext, memo, useContext, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import useUser from 'lib/useUser'
import fetchJson from 'lib/fetchJson'
import Layout from "components/Layout";
import useSWR, { mutate } from 'swr';

const PAUSED = 9

// STATE  0 Guide/Introduction
// STATE  1 Working on first item
// STATE  2 Working on item #2 up to before last item
// STATE  3 Working on last item
// STATE  9 Paused
// STATE 99 Finished

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

const TestContext = createContext()

function TestProvider({ user, children }) {
  const [state, setState] = useState(-1);
  const [currentGain, setCurrentGain] = useState(0);
  const [tempState, setTempState] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const url1 = buildApiUrl(user, { fullname: user.fullname })
  const { data: progress, error, mutate: mutateProgress } = useSWR(url1, fetchJson)

  return (
    <TestContext.Provider value={{
      user,
      state, setState,
      currentGain, setCurrentGain,
      tempState, setTempState,
      submitting, setSubmitting,
      progress, mutateProgress
      }}>
      {children}
    </TestContext.Provider>
  )
}

function getTestState(progress) {
  const { items, done } = progress
  if (done == 0) return 1
  else if (done == items) return 99
  else if (done == items - 2) return 3 // last item
  return 2 // item #2 up to before last item
}

function sequenceArray(sequence) {
  if (!sequence) return []
  return sequence.split(' ').map((d) => {
    return parseInt(d)
  })
}

function buildApiUrl(user, opt) {
  console.log("buildApiUrl")
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

async function touch(user) {
  const url = buildApiUrl(user, {}) // Empty license, but OK
  // const update = progress?.initiated ? false : true
  await fetchJson(url, {
    method: 'PUT',
      headers: {
        Accept: 'application/json',
      },
      body: JSON.stringify({ action: "touch", update: false }),
  })

  const url1 = buildApiUrl(user, { fullname: user.fullname })
  mutate(url1)
}

async function enterTest(user, progress) {
  console.log("enterTest")
  const url = buildApiUrl(user, {}) // Empty license, but OK
  const update = progress?.initiated ? false : true
  await fetchJson(url, {
    method: 'PUT',
      headers: {
        Accept: 'application/json',
      },
      body: JSON.stringify({ action: "init", update: update }),
  })

  const url1 = buildApiUrl(user, { fullname: user.fullname })
  mutate(url1)
}

async function startTest(user, progress) {
  console.log("startTest")
  const url = buildApiUrl(user, {}) // Empty license, but OK
  const update = progress.started ? false : true
  await fetchJson(url, {
    method: 'PUT',
      headers: {
        Accept: 'application/json',
      },
      body: JSON.stringify({ action: "start", update: update }),
  })

  const url1 = buildApiUrl(user, { fullname: user.fullname })
  mutate(url1)
}

async function fetchModule(url) {
  console.log("fetchModule")
  const response = await fetch(url)
  const data = await response.json()
  return data
}

function HeaderWaiting() {
  return (
    <div className="mb-8">
      <div className="flex flex-row text-xs px-1 py-2 pt-3">
        <div className="flex-1 items-center">
          <span className="text-gray-400 uppercase tracking-wide sm:tracking-wider md:tracking-widest">...</span>
        </div>
      </div>
      <div className="flex flex-row bg-gray-200 rounded-sm items-center text-gray-700">
        <p className="px-4 leading-10 tracking-wide font-semibold">&nbsp;</p>
      </div>
    </div>
  )
}

var intervalHandle = 0

function timer(ms, id, state) {
  let cd = ms + new Date().getTime()
  intervalHandle = setInterval(function() {
      let now = new Date().getTime(),
      distance = cd - now;
      let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((distance % (1000 * 60)) / 1000);

      hours = (hours < 10) ? "0" + hours : hours;
      minutes = (minutes < 10) ? "0" + minutes : minutes;
      seconds = (seconds < 10) ? "0" + seconds : seconds;

      let html = hours + ":" + minutes; // + ":" + seconds;
      if (state != PAUSED) {
        document.getElementById(id).innerHTML = html;
      }

      if (distance < 0) {
          clearInterval(intervalHandle);
          // if (state != PAUSED) {
            document.getElementById(id).innerHTML = "";
          // }
      }
  }, 1000)
}

function Header() {
  const { user, state, setState, currentGain, setTempState, progress, submitting } = useContext(TestContext)
  const url = buildApiUrl(user, { module: "gpq" })
  const { data: module } = useSWR(url, fetchModule)

  if (!module) return (
    <HeaderWaiting />
  )

  return (
    <div className="mb-8">
      <div className="flex flex-row text-xs px-1 py-2 pt-3">
        <div className="flex-1 items-center">
          <span className="uppercase tracking-wide sm:tracking-wider md:tracking-widest">{user?.projectTitle}</span>
          <span className="ml-3">{state}</span>
          <span className="ml-3">{currentGain}</span>
        </div>
        <div className="flex-grow text-right">
          <span className="font-bold">{user?.fullname}</span>
        </div>
      </div>
      <div className="flex flex-row bg-gray-200 rounded-sm items-center text-gray-700">
        <div className="flex flex-row">
          <p className="px-4 border-r border-white text-gray-800s leading-10 tracking-wide font-semibold">{module?.title}</p>
          {/* {state == 0 && ( */}
            <p className="px-2 text-sm leading-10 tracking-wide font-semibold">{module?.description}</p>
          {/* )} */}
          {state > 0 && (
            <>
            <p className="px-2 border-r border-white bg-grays-400 text-swhite leading-10 tracking-wide font-semibold">{progress?.items}</p>
            {!submitting && <p className="w-12 border-r border-white text-center leading-10 tracking-wide font-semibold">{progress?.done < progress?.items ? progress?.done + 1 : progress?.items}</p>}
            {submitting && <p className="w-12 border-r border-white text-center bg-gray-500 text-white leading-10 tracking-wide font-semibold">{progress?.done + 1}</p>}
            </>
          )}
        </div>
        <div className="flex flex-grow flex-row-reverse leading-10 text-sm text-gray-700">
          {state == 0 && (
            <span className="text-xs uppercase tracking-wider mr-3">Pengantar</span>
          )}
          {/* state > 0 && state < 9 && (progress.done % 5) == 0 && () */}
          {state > 0 && state < 9 && currentGain > 4 && (
            <button onClick={() => {
              touch(user)
              setTempState(state);
              setState(PAUSED);
            }} className="border-l border-white rounded-r-sm px-4 text-center text-gray-600 hover:bg-gray-600 hover:text-white">Pause</button>
          )}
        </div>
      </div>
      {state > 0 && (
        <div className="flex flex-row text-sm text-gray-700 font-light px-1s py-2 border-b">
          <div className="flex-grow">{module?.description}</div>
          <div className="flex flex-1 flex-row-reverse text-right text-xs font-mono">
            <span id="timer" className="w-32 pr-1"></span>
            <span>R {progress.remains}</span>{` `}
          </div>
        </div>
      )}
    </div>
  )
}

function Prepare() {
  const { user, progress, setState } = useContext(TestContext)
  const url = buildApiUrl(user, { module: "gpq" })
  const { data: module } = useSWR(url, fetchModule)

  if (!progress || !module) {
    return (
      <h1 className="text-3xl text-gray-300 text-center font-light mb-6">Loading...</h1>
    )
  }

  return (
    <div className="text-gray-600 font-light max-w-2xl mx-auto">
      <h1 className="text-3xl text-center mb-6">Tentang tes ini</h1>
      <p className="my-6">
        Tes ini terdiri dari {module?.items} soal dengan waktu penyelesaian
        paling lama {module?.maxTime}.
      </p>
      <p className="my-6">
      Elit rhoncus adipiscing facilisis efficitur vitae consectetur orci consequat,
      pellentesque est sem blandit tristique curabitur vulputate ultricies, senectus
      enim risus hac mollis dapibus in magnis, arcu tincidunt lectus maximus conubia
      porttitor integer. Ipsum vel suspendisse tempor maximus mauris in blandit
      interdum quisque a, platea laoreet convallis elementum ad penatibus est luctus
       ex felis, vehicula magna duis quam hendrerit eros aenean finibus nisi,
       tincidunt ridiculus eu magnis semper rutrum diam turpis mi. Proin pellentesque
        dignissim quis vehicula ligula cubilia egestas hac mi, lectus fringilla
        faucibus lacus primis consequat convallis nascetur accumsan, senectus at sem
        lacinia imperdiet conubia fusce auctor, ac urna purus bibendum viverra
        tincidunt blandit duis.
      </p>
      <p className="text-center my-12">
        <button onClick={(event) => {
          enterTest(user, progress);
          setState(0);
        }} className="rounded border border-green-400 text-lg text-green-500 font-bolds px-6 py-2 hover:bg-green-500 hover:text-white active:bg-green-700">Lanjut</button>
      </p>
    </div>
  )
}

function Guide() {
  const { user, progress, setState } = useContext(TestContext)

  return (
    <div className="max-w-2xl mx-auto text-gray-700">
      {progress?.done == progress?.items && (
        <>
        <h1 className="text-3xl text-gray-600 text-center font-light mt-32 mb-8">Anda sudah menyelesaikan test ini</h1>
        <div className="mx-auto text-center">
          <Link href="/persona">
            <a className="rounded border border-blue-500 text-lg text-blue-600 font-bold px-8 py-3 hover:border-blue-600 hover:bg-blue-600 hover:text-white active:bg-blue-700">Beranda</a>
          </Link>
        </div>
        </>
      )}

      {progress?.done != progress?.items && (
        <>
        <h1 className="text-3xl text-center font-light mb-6">Petunjuk Mengerjakan Tes</h1>
        {progress?.done > 0 && (
        <div className="bg-yellow-200 text-sm text-orange-700 font-light border-l-8 border-orange-700 my-6 px-4 py-4">
          Anda tercatat pernah mengerjakan test ini hingga{` `}
          <span className="font-semibold">Nomor {progress?.done}</span>.
          Bila Anda merasa sudah memahami petunjuk ini, Anda dapat langsung
          mulai melanjutkan dengan menekan tombol Lanjut di
          bagian bawah halaman.
        </div>
        )}
        <p className="mb-8">
          Elit rhoncus adipiscing facilisis efficitur vitae consectetur orci consequat, pellentesque est sem blandit tristique curabitur vulputate ultricies, senectus enim risus hac mollis dapibus in magnis, arcu tincidunt lectus maximus conubia porttitor integer. Ipsum vel suspendisse tempor maximus mauris in blandit interdum quisque a, platea laoreet convallis elementum ad penatibus est luctus ex felis, vehicula magna duis quam hendrerit eros aenean finibus nisi, tincidunt ridiculus eu magnis semper rutrum diam turpis mi. Proin pellentesque dignissim quis vehicula ligula cubilia egestas hac mi, lectus fringilla faucibus lacus primis consequat convallis nascetur accumsan, senectus at sem lacinia imperdiet conubia fusce auctor, ac urna purus bibendum viverra tincidunt blandit duis.
        </p>
        <p className="text-center">
          <button onClick={(event) => {
            startTest(user, progress);
            setState(getTestState(progress));
          }} className="rounded border border-green-400 text-lg text-green-500 font-bolds px-6 py-2 hover:bg-green-500 hover:text-white active:bg-green-700">Lanjut</button>
        </p>
        </>
      )}
    </div>
  )
}

function Paused() {
  const { tempState, setState, setCurrentGain, user } = useContext(TestContext)
  const { mutateUser } = useUser({ redirectTo: '/' })
  const router = useRouter()

  return (
    <div>
      <div className="paused flex flex-col justify-center items-center bg-gray-200 -mt-8 -mb-32">
        <h1 className="text-3xl text-center font-light mb-16">Istirahat Sejenak</h1>
        <div>
          <Link href="/api/signout">
            <a onClick={async(e) => {
              e.preventDefault()
              clearInterval(intervalHandle)
              intervalHandle = 0;
              await mutateUser(fetchJson('/api/signout'))
              router.push('/')
            }} className="rounded border border-gray-500 text-lg text-gray-600 tracking-wide font-bold px-8 py-3 mr-4 hover:border-gray-600 hover:bg-gray-600 hover:text-white active:bg-gray-700">Berhenti</a>
          </Link>
          {/* <div id="timer" className="hidden"></div> */}
          <button onClick={() => {
            touch(user)
            setState(tempState)
            setCurrentGain(0)
          }} className="rounded border border-gray-500 text-lg text-gray-600 tracking-wide font-bold px-8 py-3 hover:border-gray-600 hover:bg-gray-600 hover:text-white active:bg-gray-700">Melanjutklan lagi</button>
        </div>
      </div>

      <style jsx>{`
      .paused {
        height: 500px;
      }
      `}</style>
    </div>
  )
}

function Finished() {
  const router = useRouter()
  const { state, setState, setCurrentGain } = useContext(TestContext)
  return (
    <div>
      <div className="paused flex flex-col justify-center items-center bg-gray-200 -mt-8 -mb-32">
        <h1 className="text-3xl text-center font-light mb-16">Selesai</h1>
        <Link href="/persona">
            <a onClick={async(e) => {
              e.preventDefault()
              setState(0)
              setCurrentGain(0)
              clearInterval(intervalHandle)
              intervalHandle = 0;
              router.push('/persona')
            }} className="rounded border border-gray-500 text-lg text-gray-600 tracking-wide font-bold px-8 py-3 mr-4 hover:border-gray-600 hover:bg-gray-600 hover:text-white active:bg-gray-700">Ke Beranda</a>
          </Link>
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
  const {
    user,
    progress,
    mutateProgress,
    state, setState,
    currentGain, setCurrentGain,
    submitting, setSubmitting } = useContext(TestContext)
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
    console.log(progress.items, progress.done)

    document.getElementById("_opt").click()
    document.getElementById('optForm').reset()

    if (state == 3) setState(99)

    const url = buildApiUrl(user, {})
    const sequence = sequenceArray(progress.sequence)

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
    console.log('RESPONSE', response.done)
    if (response.items - response.done == 2) setState(3)

    mutateProgress()
    clearInterval(intervalHandle)
    intervalHandle = 0;
    if (progress.items - progress.done > 2) {
      timer(progress.remains, "timer", state)
    } else {
      // hide timer
      const cls = document.getElementById("timer").className
      document.getElementById("timer").className = 'hidden ' + cls
    }

    if (state < 3) {
      document.getElementById("btn").setAttribute('disabled', true)
      document.getElementById("btn").className = btnNormal
      document.getElementById("label2").className = normalClass
      document.getElementById("label1").className = normalClass
    }

    setElm(null)
    setStatement(null)
    setTimeout(function() {
      setCurrentGain(currentGain + 1)
      setSubmitting(false)
    }, 500)
  }

  const selectedClass = "rounded cursor-pointer bg-blue-500 border border-blue-500 font-semibold text-white p-4 mb-4"
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
            value={testItem?.contents[0]["elm"] ? testItem?.contents[0]["elm"] : ""}
            placeholder={testItem?.contents[0]["statement"] ? testItem?.contents[0]["statement"] : "HABIS"}
            onChange={(event) => {
              selectOption('label1', event)
            }}
          />
          {submitting && <span>...</span>}
          {!submitting && <span>{ testItem?.contents[0]["statement"] ? testItem?.contents[0]["statement"] : 'HABIS' }</span>}
        </label>
        <label id="label2" htmlFor="opt2" className={normalClass}>
          <input className="hidden" type="radio" id="opt2" name="option"
            value={testItem?.contents[1]["elm"] ? testItem?.contents[1]["elm"] : ""}
            placeholder={testItem?.contents[1]["statement"] ? testItem?.contents[1]["statement"] : "HABIS"}
            onChange={(event) => {
              selectOption('label2', event)
            }}
          />
          {submitting && <span>...</span>}
          {!submitting && <span>{ testItem?.contents[1]["statement"] ? testItem?.contents[1]["statement"] : 'HABIS' }</span>}
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
  const { state } = useContext(TestContext)

  return (
    <>
    {state == -1 && <Prepare />}
    {state == 0 && <Guide />}
    {state == 9 && <Paused />}
    {state == 99 && <Finished />}
    {(state > 0 && state <9) && <TestContent />}
    </>
  )
} // EOF