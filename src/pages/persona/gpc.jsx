import { useState, memo, createContext, useContext } from "react"
import useSWR from "swr"
import useUser from 'lib/useUser'
import fetchJson from 'lib/fetchJson'
import Unauthorized from 'components/Unauthorized'
import { useRouter } from "next/router"
import { firstElms, secondElms } from 'lib/gpq-1.0'
import PropTypes from 'prop-types'

export default function GPC() {
  const { user } = useUser({ redirectTo: '/' })

  if (!user || user.isLoggedIn === false) return <Unauthorized/>

  return (
    <TestProvider user={user}>
      <PageContent />
    </TestProvider>
  )
}

const PageContent = memo(() => {
  return (
    <div>
      <ProgressDetail />
    </div>
  )
})

const TestContext = createContext()


function TestProvider({ user, children }) {
  const [progress, setProgress] = useState(null)

  return (
    <TestContext.Provider value={{ user, progress, setProgress }}>
      {children}
    </TestContext.Provider>
  )
}

//
function sequenceArray(sequence) {
  if (!sequence) return []
  return sequence.split(' ').map((d) => {
    return parseInt(d)
  })
}

function ProgressDetail() {
  const { user } = useContext(TestContext)
  const url = "/api/ev-gpq?" + `projectId=${user.projectId}&personaId=${user._id}`
  const { data, error, mutate:mutateData } = useSWR(url, fetchJson)
  const [ elm, setElm ] = useState(null)
  const [ statement, setStatement ] = useState(null)
  const [ submitting, setSubmitting ] = useState(false)
  const selectedClass = "rounded cursor-pointer bg-blue-500 font-bold text-white p-4 mb-4"
  const normalClass = "rounded cursor-pointer border border-gray-400 text-gray-700 font-sbold p-4 mb-4 hover:border-blue-500"
  const btnNormal = "rounded border-2 border-gray-400 text-xl text-gray-400 tracking-wide font-semibold px-12 py-3"
  const btnActive = "rounded border-2 border-gray-400 text-xl text-gray-600 tracking-wide font-semibold hover:text-white hover:border-gray-700 hover:bg-gray-700 px-12 py-3"


  if (!data) return <span>loading...</span>;
  if (error) return <span>oop!! error occurred</span>;

  const sequences = sequenceArray(data?.sequence)

  const select = (n) => {
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

  async function handleSubmit(e) {
    e.preventDefault()
    setSubmitting(true)
    document.getElementById("btn").setAttribute('disabled', true)
    document.getElementById("btn").className = btnNormal

    const body = {
      seq: data.done + 1,
      wbSeq: sequences[data.done],
      elm: elm,
      statement: statement,
      lastTouched: data.touched,
    }
    const response = await fetchJson(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
      body: JSON.stringify(body),
    })
    // select(false)
    mutateData()
    document.getElementById("label2").className = normalClass
    document.getElementById("label1").className = normalClass

    setElm(null)
    setStatement(null)
    console.log(response)
    setTimeout(function() {
      setSubmitting(false)
      select(false)
      document.getElementById("_opt").click()
      document.getElementById('optForm').reset()
    }, 1500)
  }

  return (
    <div className="m-4 p-4">
      <Stat data={data} submitting={submitting} />

      <p className="text-center text-xl text-red-500 font-light mt-16 mb-12">
        { submitting ? 'Mohon tunggu sejenak...' : 'Pilih satu yang paling sesuai, lalu tekan tombol Lanjut.' }
      </p>

      <form onSubmit={handleSubmit} id="optForm" className="flex flex-col mb-8">
        {/* Hack */}
        <input className="hidden" type="radio" id="_opt" name="option" value="" />
        <label id="label1" htmlFor="opt1" className={normalClass}>
          <input className="hidden" type="radio" id="opt1" name="option"
            value={firstElms[data?.done][0]}
            placeholder={firstElms[data?.done][1]}
            onChange={(event) => {
              if (submitting) return false
              setElm(event.target.value)
              setStatement(event.target.placeholder)
              select('label1')
              console.log("label1 clicked")
            }}
          />
          <span>{ submitting ? '...' : firstElms[data?.done][1] }</span>
        </label>
        <label id="label2" htmlFor="opt2" className={normalClass}>
          <input className="hidden" type="radio" id="opt2" name="option"
            value={secondElms[data?.done][0]}
            placeholder={secondElms[data?.done][1]}
            onChange={(event) => {
              if (submitting) return false
              setElm(event.target.value)
              setStatement(event.target.placeholder)
              select('label2')
              console.log("label2 clicked")
            }}
          />
          <span>{ submitting ? '...' : secondElms[data?.done][1] }</span>
        </label>
        <div className="p-2 my-8 text-center">
          <button id="btn" disabled className={btnNormal} type="submit">
            Lanjut
          </button>
        </div>
        <div className="mt-4 border-t border-red-300 py-2 text-red-500 text-center">{ submitting ? 'SUBMITTING' : 'IDLE' }</div>
        <div className="text-blue-500 border-t border-b border-red-300 py-2">Elm: {elm} {statement}</div>
      </form>

      <pre className="w-full overflow-scroll bg-gray-200 p-3 text-xs my-6">{JSON.stringify(data, null, 2)}</pre>

      <hr className="border-1 border-gray-400 my-4 "/>
    </div>
  )
}

const Stat = ({ data, submitting }) => {
  const dotCls = submitting ? "px-3 bg-red-600 border-r text-white" : "px-3 bg-green-600 border-r text-white"
  return (
    <div className="flex flex-row items-center rounded border text-gray-700 mb-8">
      <p className="px-3 py-2 border-r text-gray-800 font-bold">{data.fullname}</p>
      <p className="px-3 py-2 border-r">GPQ-1.0</p>
      <p className="px-3 py-2 border-r">{data.done} : {data.items}</p>
      <p className={dotCls}><span className="block text-xl leading-6 py-2">◉</span></p>
      <p className="flex-grow bg-gray-100 px-3 py-2 border-r text-right text-gray-700">{ new Date().toDateString() }</p>
    </div>
  )
}