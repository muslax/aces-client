import { createContext, memo, useContext, useState } from 'react'
import Link from 'next/link'
import useUser, { updateUserPath } from 'lib/useUser'
import fetchJson from 'lib/fetchJson'
import Layout from "components/LayoutMATE";
import useSWR, { mutate } from 'swr';
import { getApiUrl, sequenceArray, msToTimeString, mateRandom } from "lib/utils";
import { Condition, getCondition, getInfo, getItem, getSeeds } from "lib/mate-1.0";
import { func } from 'prop-types';

const TEST_TYPE = "mate"
const BASE_API_URL = "/api/mate"
const PAGE_TITLE = "Mate"

export default function GMATE() {
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
    <Layout title="GMATE">
      <Content />
    </Layout>
  )
})

const TestContext = createContext();

function TestProvider({ user, children }) {
  const [seq, setSeq] = useState(0)
  const [testItem, setTestItem] = useState(null)
  const [skips, setSkips] = useState([])
  const [skipper, setSkipper] = useState(false)
  const [last, setLast] = useState(1)
  const [submitting, setSubmitting] = useState(false);
  const url = getApiUrl(BASE_API_URL, user, {fullname: user.fullname})
  const swrOptions = process.env.NODE_ENV == 'development' ? {
    refreshInterval: 0, revalidateOnFocus: false
  } : { revalidateOnFocus: true }
  // const { data: progress, mutate: mutateProgress } = useSWR(url, fetchJson)
  // const { data: project } = useSWR(`/api/project?id=${user?.projectId}`, fetchJson)
  const { data: module } = useSWR(`/api/project?id=${user?.projectId}&modules=${TEST_TYPE}`, fetchJson, swrOptions)

  // test mateRandom
  const [mr] = useState(simulateRandomSeqs()) // mateRandom(getSeeds())

  return (
    <TestContext.Provider value={{
      user,
      module,
      seq, setSeq,
      testItem, setTestItem,
      skips, setSkips,
      skipper, setSkipper,
      last, setLast,
      mr,
      // project,
      // progress,
    }}>
      {children}
    </TestContext.Provider>
  )
}

function simulateRandomSeqs() {
  const mr = mateRandom(getSeeds())
  let seqs = {}
  let i = 1
  mr.forEach((s) => {
    seqs[i] = s
    i++
  });

  return seqs
}

function Content() {
  const { user, seq, testItem, module, mr } = useContext(TestContext)

  return (
    <div>
      <Header />
      {seq == 0 && <About />}
      {seq > 0 && <TestBoard />}
      {/* <h1 className="">SEQ {seq}</h1> */}

      <pre className="pre">{JSON.stringify(mr, null, 2)}</pre>
    </div>
  )
}

function TestBoard() {
  const { seq, mr, setSeq, testItem, setTestItem, skips, setSkips, skipper, setSkipper, last, setLast } = useContext(TestContext)
  const [checked, setChecked] = useState({label: '', tetxt: ''})

  const label = "LABEL flex flex-row -mt-px cursor-pointer items-center border-b border-t border-gray-200 hover:z-50 hover:border-blue-200 hover:bg-gray-100 hover:text-blue-600"
  const labelSelected = "CHECKED flex flex-row -mt-px bg-blue-100 cursor-default items-center border-b border-t border-blue-200 z-50 text-blue-600"
  const btnSkip = "rounded border border-orange-300 text-lg font-semibold text-orange-400 px-6 py-2 hover:border-orange-400 hover:sbg-orange-300 hover:stext-white mx-2"
  const btnActive = "rounded border border-green-400 text-lg font-semibold text-green-500 px-6 py-2 hover:border-green-500 hover:bg-green-500 hover:text-white active:bg-green-700 mx-2"
  const btnDisabled = "disabled rounded border text-lg  font-semibold text-gray-400 px-6 py-2 mx-2"

  function advance() {
    const next = seq == last ? seq + 1 : last

    // check if now in skips stack
    // const index = skips.indexOf(seq)
    // if (index >= 0) {
    //   const arr = skips
    //   arr.splice(index, 1)
    //   setSkips[arr]
    // }
    removeSkip()

    console.log("Going", next)
    setSeq(next)
    setTestItem(getItem( mr[next] ))
    setLast(next)
  }

  function removeSkip() {
    const index = skips.indexOf(seq)
    if (index >= 0) {
      const arr = skips
      arr.splice(index, 1)
      setSkips[arr]
    }
  }

  function revisit(e) {
    const n = e.target.value
    console.log("Going back to", n)
    document.querySelectorAll('.CHECKED').forEach((el) => {
      el.className = label
    })
    document.getElementById('submit').className = btnDisabled
    setSeq(n)
    setTestItem(getItem( mr[n] ))
    window.scrollTo(0, 0)
  }

  function handleChange(e) {
    setChecked({ label: e.target.value, text: e.target.placeholder })
    document.querySelectorAll('.CHECKED').forEach((el) => {
      el.className = label
    })
    if (e.target.checked) e.target.parentNode.className = labelSelected

    document.getElementById('submit').className = btnActive
  }

  function handleSkip(e) {
    e.preventDefault()
    if (skips.indexOf(e.target.value) < 0) {
      setSkips([...skips, e.target.value])
    }
    // advance()
    document.querySelectorAll('.CHECKED').forEach((el) => { el.className = label })
    document.getElementById("submit").className = btnDisabled

    const next = seq == last ? seq + 1 : last
    console.log("Going", next)
    setSeq(next)
    setTestItem(getItem( mr[next] ))
    setLast(next)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!checked.label) return false

    const on = document.querySelector('input[name="mate"]:checked')
    if (on) {
      on.checked = false
      setChecked('')
    }

    document.querySelectorAll('.CHECKED').forEach((el) => { el.className = label })
    document.getElementById("submit").className = btnDisabled

    if (seq < 45 && !skipper) {
      advance()
    }
    else if (skips.length > 0) {
      // if (skips.indexOf(e.target.value) < 0) {
        // setTestItem(getItem(mr[1]))
      // }
      removeSkip()
      setSkipper(true)
      setSeq(skips[0])
      setTestItem(getItem( mr[skips[0]] ))
    } else {
      alert("FINISHED")
    }
  }

  return (
    <div className="-mt-8">
      <div className="relative border-b border-yellow-300 pb-4">
        <div className="absolute z-auto w-full h-full bg-gradient-to-t from-orange-100 opacity-50"></div>
        <div className="relative max-w-3xl mx-auto antialiased px-4 py-8">
          <p className="text-xs font-semibold tracking-widest uppercase mb-6">
            <span className="rounded-l-sm bg-orange-500 text-orange-100 px-2 py-1 ">{seq}</span>
            <span className="rounded-r-sm bg-orange-200 text-orange-600 px-2 py-1 ">Situasi {testItem.condition}</span>
          </p>
          <div className="">
            <Condition condition={testItem.condition} />
          </div>
        </div>
      </div>

      {/* <div className="bg-orange-100s border-b border-gray-400 -mt-8 pt-2 pb-8">
        ASA
      </div> */}
      <div className="max-w-2xl mx-auto">
        {/* <form> */}
          <div className="flex flex-col text-gray-800 leading-snug antialiased my-4">
            <div className="border-b py-6">
              <p className="">{testItem.teaser}</p>
            </div>
            {testItem.options.map(c => (
            <label key={c.label} htmlFor={`C-${c.label}`} className={label}>
              <input onChange={handleChange} type="radio"
                id={`C-${c.label}`}
                name="mate" value={c.label}
                placeholder={c.text}
                className="hidden"/>
              <div className="flex p-1">
                <div className="w-8 text-center text-gray-500 font-semibold">{c.label}</div>
              </div>
              <div className="flex-grow pl-1 pr-3 py-2">{c.text}</div>
            </label>
            ))}
          </div>
          <div className="pl-8 py-8 text-centers">
            {!skipper && <button id="skip" value={seq} onClick={event => handleSkip(event)} className={btnSkip}>Lewati</button>}
            <button id="submit" type="submit" onClick={e => handleSubmit(e)} className={btnDisabled}>
              Simpan <span className="inline-block pl w-4">{checked.label}</span>
            </button>
          </div>
        {/* </form> */}
      </div>

      <div className="border-t border-gray-400 text-white text-sm leading-4 antialiased py-4 mr-4">
        {skips.map(s => (
          <button key={`skip-${s}`} value={s} onClick={revisit}
          className="inline-block rounded-sm w-8 bg-orange-200 text-orange-600 text-center font-semibold p-2 mr-2">{s}</button>)
        )}
      </div>
    </div>
  )
}

function Header() {
  const { user, progress, module } = useContext(TestContext)

  return (
    <div className="mb-8 text-gray-700">
      <div className="flex flex-col text-xs px-1 py-3 pt-4">
        <div className=" text-xs text-center uppercase tracking-wide sm:tracking-wider md:tracking-widest">
          <span id="companyName" className="font-bold">{user ? user.projectTitle : '...'}</span>
          <span className="px-2">|</span>
          <span className="">{user ? user.company : '...'}</span>
        </div>
      </div>

      <div className="flex flex-row bg-yellow-400 rounded-md items-center text-sm leading-10 px-4">
        <div className="flex flex-grow flex-row font-semibold">
          <span>{module ? module.name : '...'}</span>
        </div>
        <div className="flex flex-0 text-right pl-3 font-bold">
          {/* <span className=" bg-yellow-600 bg-opacity-25 px-3 border-l border-r border-yellow-500">{progress ? (progress.done + 1) : '-'}</span> */}
          <span className="pl-3">{module ? module.items : '-'}</span>
        </div>
      </div>

      <div className="flex flex-row text-sm text-gray-700 font-light px-2 py-2 border-b border-orange-300">
        <div className="flex-grow font-semibold">{user ? user.fullname : '...'}</div>
        <div className="flex-1 text-right text-xs font-mono">
          <div id="timer" className="mr-2">&nbsp;</div>
        </div>
      </div>
    </div>
  )
}

function About() {
  const { user, mr, progress, setSeq, setTestItem } = useContext(TestContext)

  return (
    <div className="antialiased">
      {progress?.done > 0 && (
        <div className="px-8 py-6 -mt-8 bg-gradient-to-b from-orange-100 border-b border-orange-200">
          {/* <div className="rounded-l-sm bg-yellows-200 bg-gradient-to-r from-yellow-200 text-sm border-l-8 border-orange-400 my-6"> */}
          <div className="max-w-3xl mx-auto">
            <div className="text-sms text-center text-orange-700 tracking-wide font-light">
            Anda tercatat sudah mengerjakan test ini hingga{` `}
            <span className="font-semibold">Nomor {progress?.done}</span>.
            </div>
          </div>
        </div>
      )}
      <div className="text-gray-700 font-lights max-w-xl mx-auto">
        <div id="timer" className="hidden" />{/* Timer hack */}
        <h1 className="text-3xl text-center mt-12 mb-6">Petunjuk Mengerjakan</h1>
        <div className="text-sms">
          <p className="my-6">
            Tes ini terdiri dari 136 soal dengan waktu penyelesaian
            rata-rata 45 menit.
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
        </div>
        <p className="text-center my-8">
          <button onClick={(event) => {
            event.preventDefault()
            setSeq(1)
            // setTestItem(getItem(1))
            setTestItem(getItem(mr[1]))
          }} className="rounded border-2 border-green-400 text-lg font-semibold text-green-500 px-6 py-3 hover:border-green-500 hover:bg-green-500 hover:text-white active:bg-green-700 mx-2">
            Mulai Mengerjakan
          </button>
        </p>
      </div>
    </div>
  )
}

