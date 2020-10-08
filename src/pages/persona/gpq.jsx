import { memo, createContext, useState, useContext } from "react"
import { useRouter } from 'next/router'
import Link from 'next/link'
import useSWR from "swr";
import fetchJson from 'lib/fetchJson'
import useUser from 'lib/useUser'
import { firstElms, secondElms } from 'lib/gpq-1.0'
// import { GPQ_ITEMS } from 'pages/api/ev-gpq'

export default function GPQPage() {
  const { user } = useUser({ redirectTo: "/" })

  if (!user || !user.isLoggedIn) return <div></div>

  return (
    <ContextProvider user={user}>
      <PageContent />
    </ContextProvider>
  )
}

const PageContent = memo(() => {
  return (
    <div>
      <PageDetail />
    </div>
  )
})

const ProgressContext = createContext()

function ContextProvider({ user, children }) {
  const [state, setState] = useState(0); // Show welcome
  const [submitting, setSubmitting] = useState(false);

  return (
    <ProgressContext.Provider value={{ user, state, setState, submitting, setSubmitting }}>
      {children}
    </ProgressContext.Provider>
  )
}

function sequenceArray(sequence) {
  if (!sequence) return []
  return sequence.split(' ').map((d) => {
    return parseInt(d)
  })
}

function PageDetail() {
  const { user, state } = useContext(ProgressContext)
  const url = "/api/ev-gpq?" + `projectId=${user.projectId}&personaId=${user._id}&license=${user.license}&fullname=${user.fullname}`
  const { data:progress, error, mutate:mutateProgress } = useSWR(url, fetchJson)

  // const sequences = sequenceArray(progress?.sequence)

  return (
    <div className="p-6">
      <UserBar progress={progress} />

      {!progress && <div className="my-6 text-center text-gray-400">LOADING</div>}

      {error && <div className="my-6 text-center text-gray-400">ERROR LOADING DATA</div>}

      {state == 0 && <Welcome progress={progress} mutate={mutateProgress} />}

      {state == 1 && <Guide progress={progress} mutate={mutateProgress} />}

      {state == 2 && <Steps progress={progress} mutate={mutateProgress} />}

      {state == 3 && <div className="text-center text-4xl my-8 font-light">SELESAI</div>}

      <hr className="mt-16 mb-6"/>

      <pre className="w-full overflow-scroll bg-gray-200 p-3 text-xs my-6">PROGRESS {JSON.stringify(progress, null, 2)}</pre>

      <pre className="w-full overflow-scroll bg-gray-200 p-3 text-xs my-6">SESSION {JSON.stringify(user, null, 2)}</pre>
    </div>
  )
}

// const UserBar = ({ user }) => {
const UserBar = ({ progress }) => {
  const { user, submitting } = useContext(ProgressContext)
  const router = useRouter()
  // const { mutateUser } = useUser({ redirectTo: '/' })
  const dotClass = submitting ? "inline-block border-l text-lg text-red-500 leading-snug px-3 pt-2s" : "inline-block border-l text-lg text-gray-400 leading-snug px-3 pt-2s"
  return (
    <div>
      <div className="flex flex-row items-center text-xs text-gray-600 uppercase tracking-wide mb-2 px-2">
        <p className="flex-1 font-semibold">{user.projectTitle} - GPQ-1.0</p>
        <p className="flex-grow text-right font-normal">{ new Date().toLocaleDateString() }</p>
      </div>
      <div className="flex flex-row bg-gray-200 items-center rounded borders border-gray-400 text-gray-700 mb-6">
        <p className="px-5 border-r text-gray-800 leading-10 font-bold">{user.fullname}</p>
        <p className="px-3 border-r bg-gray-300 text-gray-600 leading-10 font-semisbold">{progress.done} / {progress.items}</p>
        <p className="flex-grow items-center text-sm text-gray-600 leading-10 text-right text-gray-700">
          <span className={dotClass}>◉</span>
          <button className="inline-block border-l text-gray-600 px-4 hover:bg-gray-600 hover:text-white">Pause</button>
          <Link href="/api/signout">
            <a onClick={async (e) => {
                e.preventDefault()
                await mutateUser(fetchJson('/api/signout'))
                router.push('/')
              }} className="inline-block border-l rounded-r px-4 text-resd-500 hover:bg-gray-600 hover:text-white">Logout</a>
          </Link>
        </p>
      </div>
    </div>
  )
}

const Welcome = ({ progress, mutate }) => {
  const { user, setState } = useContext(ProgressContext)

  async function EnterTest(progress) {
    setState(1)
    window.scrollTo(0,0)
    // if (progress.initiated) return
    const update = progress.initiated ? false : true

    // Update initiated field
    const url = "/api/ev-gpq?" + `projectId=${progress.projectId}&personaId=${progress.personaId}`
    const response = await fetchJson(url, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
      },
      body: JSON.stringify({ field: "initiated", update: update }),
    })

    mutate()
  }

  return (
    <div className="">
      <h3 className="font-bold mb-4">Selamat datang, Anda akan mengerjakan Test GPQ.</h3>

      {progress?.done == 0 && <p>Anda akan mulai dari Nomor 1.</p>}
      {progress?.done > 0 && <p>Anda akan mulai dari Nomor {progress?.done}.</p>}

      <p className="mb-8">Petunjuk selengkapnya akan dapat Anda pelajari setelah menekan (klik/tap) tombol Lanjut di bawah ini.</p>
      <p className="text-center">
        <button onClick={(event) => { EnterTest(progress) }} className="rounded border border-green-400 text-lg text-green-500 font-bold px-8 py-3 hover:bg-green-500 hover:text-white active:bg-green-700">Lanjut</button>
      </p>
    </div>
  )
}

const Guide = ({ progress, mutate }) => {
  const { setState } = useContext(ProgressContext)

  async function StartTest(progress) {
    setState(2)
    window.scrollTo(0,0)

    const update = progress.started ? false : true

    // Update started field
    const url = "/api/ev-gpq?" + `projectId=${progress.projectId}&personaId=${progress.personaId}`
    const response = await fetchJson(url, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
      },
      body: JSON.stringify({ field: "started", update: update }),
    })

    mutate()
  }

  return (
    <div className="">
      <h1 className="text-2xl text-gray-600 font-light mb-10">Petunjuk Menjalani Test GPQ</h1>
      <p className="mb-4">Elit rhoncus adipiscing facilisis efficitur vitae consectetur orci
      consequat, pellentesque est sem blandit tristique curabitur vulputate
      ultricies, senectus enim risus hac mollis dapibus in magnis, arcu
      tincidunt lectus maximus conubia porttitor integer. Ipsum vel
      suspendisse tempor maximus mauris in blandit interdum quisque a, platea
      laoreet convallis elementum ad penatibus est luctus ex felis, vehicula
      magna duis quam hendrerit eros aenean finibus nisi, tincidunt ridiculus
      eu magnis semper rutrum diam turpis mi. Proin pellentesque dignissim
      quis vehicula ligula cubilia egestas hac mi, lectus fringilla faucibus
      lacus primis consequat convallis nascetur accumsan, senectus at sem
      lacinia imperdiet conubia fusce auctor, ac urna purus bibendum viverra
      tincidunt blandit duis.</p>
      <p className="mb-4">Convallis eget fusce justo quam et lectus senectus mi nibh, urna diam
      tellus finibus pretium in suscipit arcu elementum, ex lobortis maximus
      venenatis sagittis porta dolor non, eu tempus risus sem maecenas nullam
      duis condimentum. Eu phasellus at aliquam egestas integer tortor sit
      turpis tempus, aptent eleifend nullam praesent eget ridiculus varius
      nostra vitae, volutpat ligula elit mus hendrerit blandit suscipit semper
      imperdiet, potenti quis dis fames sodales lectus adipiscing aenean.</p>
      <p className="mb-4">Non ridiculus venenatis conubia felis nascetur fusce vulputate
      viverra, elit consectetur potenti rutrum proin fringilla ultricies
      maecenas, sagittis leo blandit platea lacinia mauris massa justo,
      habitant vestibulum quisque class hendrerit facilisis sociosqu. Euismod
      aptent placerat integer dictum himenaeos mus hendrerit phasellus,
      malesuada cras feugiat ex efficitur tortor tristique a, metus posuere
      scelerisque sollicitudin maximus molestie felis odio vehicula, tellus
      mattis torquent primis potenti eleifend lorem. Ipsum cursus velit duis
      molestie sociosqu vehicula luctus congue interdum, sagittis nunc montes
      pellentesque tristique fermentum imperdiet ornare enim, nascetur
      scelerisque proin aliquet netus a volutpat facilisi ullamcorper ad,
      praesent parturient nisl venenatis est lobortis magnis penatibus.</p>

      <p className="text-center">
        <button onClick={(event) => { StartTest(progress) }} className="rounded border border-green-400 text-lg text-green-500 font-bold px-8 py-3 hover:bg-green-500 hover:text-white active:bg-green-700">Lanjut</button>
      </p>
    </div>
  )
}

const Steps = ({ progress, mutate }) => {
  const { user, setState, submitting, setSubmitting } = useContext(ProgressContext)

  const [ elm, setElm ] = useState(null)
  const [ statement, setStatement ] = useState(null)
  // const [ submitting, setSubmitting ] = useState(false)
  const selectedClass = "rounded cursor-pointer bg-blue-500 font-bold text-white p-4 mb-4"
  const normalClass = "rounded cursor-pointer border border-gray-400 text-gray-700 font-sbold p-4 mb-4 hover:border-blue-500"
  const btnNormal = "rounded border-2 border-gray-400 text-xl text-gray-400 tracking-wide font-semibold px-12 py-3"
  const btnActive = "rounded border-2 border-gray-400 text-xl text-gray-600 tracking-wide font-semibold hover:text-white hover:border-gray-700 hover:bg-gray-700 px-12 py-3"

  const sequences = sequenceArray(progress?.sequence)

  const select = (n) => {
    if (progress.done < firstElms.length) {
      if (!n) {
        document.getElementById("label2").className = normalClass
        document.getElementById("label1").className = normalClass
        document.getElementById("btn").setAttribute('disabled', true)
        document.getElementById("btn").className = btnNormal
        setElm(null)
        setStatement(null)
      } else {
        if (n == 'label1') {
          document.getElementById("label2").className = normalClass
          document.getElementById("label1").className = selectedClass
        } else if (n == 'label2') {
          document.getElementById("label1").className = normalClass
          document.getElementById("label2").className = selectedClass
        }
        document.getElementById("btn").removeAttribute('disabled')
        document.getElementById("btn").className = btnActive
      }
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSubmitting(true)
    document.getElementById("btn").setAttribute('disabled', true)
    document.getElementById("btn").className = btnNormal

    const url = "/api/ev-gpq?" + `projectId=${user.projectId}&personaId=${user._id}`
    const body = {
      seq: progress.done + 1,
      wbSeq: sequences[progress.done],
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
    // select(false)
    mutate()

    if (progress.done == firstElms.length) {
      setState(3)
    }

    if (progress.done < firstElms.length) {
      document.getElementById("label2").className = normalClass
      document.getElementById("label1").className = normalClass
    }

    setElm(null)
    setStatement(null)
    console.log(response.done)
    setTimeout(function() {
      setSubmitting(false)
      select(false)
      if (progress.done < firstElms.length) {
        document.getElementById("_opt").click()
        document.getElementById('optForm').reset()
      }
      setState((response.done == response.items ? 3 : 2))
    }, 1000)
  }

  return (
    <div>
      <p className="text-center text-sm text-blue-500 font-light mt-16 mb-12">
        { submitting ? 'Mohon tunggu sejenak...' : 'Pilih satu yang paling sesuai, lalu tekan tombol Lanjut.' }
      </p>

      {(progress?.done < firstElms.length) &&  (
        <form onSubmit={handleSubmit} id="optForm" className="flex flex-col mb-8">
          {/* Hack */}
          <input className="hidden" type="radio" id="_opt" name="option" value="" />
          <label id="label1" htmlFor="opt1" className={normalClass}>
            <input className="hidden" type="radio" id="opt1" name="option"
              value={firstElms[progress?.done][0]}
              placeholder={firstElms[progress?.done][1]}
              onChange={(event) => {
                if (submitting) return false
                setElm(event.target.value)
                setStatement(event.target.placeholder)
                select('label1')
                console.log("label1 clicked")
              }}
            />
            <span>{ submitting ? '...' : firstElms[progress?.done][1] }</span>
          </label>
          <label id="label2" htmlFor="opt2" className={normalClass}>
            <input className="hidden" type="radio" id="opt2" name="option"
              value={secondElms[progress?.done][0]}
              placeholder={secondElms[progress?.done][1]}
              onChange={(event) => {
                if (submitting) return false
                setElm(event.target.value)
                setStatement(event.target.placeholder)
                select('label2')
                console.log("label2 clicked")
              }}
            />
            <span>{ submitting ? '...' : secondElms[progress?.done][1] }</span>
          </label>
          <div className="p-2 my-8 text-center">
            <button id="btn" disabled className={btnNormal} type="submit">
              Lanjut
            </button>
          </div>
          <div className="mt-4 border-t border-red-300 py-2 text-red-500 text-center">{ submitting ? 'SUBMITTING' : 'IDLE' }</div>
          <div className="text-blue-500 border-t border-b border-red-300 py-2">Elm: {elm} {statement}</div>
        </form>
      )}
    </div>
  )
}


/**
 * <PAUSE/> hanya muncul setelah started
 *
 * State 0: First entry
 *    -> Anda akan menjalani test GPQ
 *    -> Anda akan melanjutkan test GPQ
 *    -> <ENTER TEST/> -> Persist initiation t
 * State 1: Not initiated
 *    -> Anda akan menjalani test GPQ
 *    -> Anda akan melanjutkan test GPQ
 * State 2: Initiated (but not started)
 *    -> show test intro
 * State 3: Started
 *    -> show test content
 * State 4: Paused
 *    -> ...
 * State 5: Finished
 *    -> Show thankyou message
 */