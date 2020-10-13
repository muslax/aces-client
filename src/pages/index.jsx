import { useState } from 'react'
import useUser from 'lib/useUser'
import fetchJson from 'lib/fetchJson'

export default function Sample() {
  const [welcome, setWelcome] = useState(true)
  const [access, setAccess] = useState(null)
  const [acctries, setAcctries] = useState(0)
  const [logtries, setLogtries] = useState(0)
  const [accessErrorMsg, setAccessErrorMsg] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const { user } = useUser({ redirectTo: false })
  const redirect = user?.role ? user?.role : user?.type
  const { mutateUser } = useUser({ redirectTo: redirect, redirectIfFound: true })

  async function handleAccessSubmit(e) {
    e.preventDefault()

    const body = { code: e.currentTarget.accessCode.value }
    const code = e.currentTarget.accessCode.value

    try {
      const rs = await fetchJson(`/api/access?code=${code}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        // body: JSON.stringify(body)
      })
      console.log("Path: ", rs)
      setAccessErrorMsg('')
      setAccess(rs)
    } catch (error) {
      setAcctries(acctries + 1)
      setAccessErrorMsg("Kode akses salah.")
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()

    const body = {
      username: e.currentTarget.username.value,
      password: e.currentTarget.password.value,
      project: e.currentTarget.projectId.value,
      path: e.currentTarget.projectPath.value,
      loginType: e.currentTarget.loginType.value,
    }

    console.log(JSON.stringify(body))

    try {
      await mutateUser(
        fetchJson('/api/signin', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
      )
    } catch (error) {
      setLogtries(logtries + 1)
      console.error('An unexpected error happened:', error)
      setErrorMsg(error.data.message)
    }
  }

  return (
    <>
      <div id="timer" className="hidden" />{/* Timer hack */}
      {(acctries > 2 || logtries > 2) && <Blackened />}
      {(acctries < 3 && logtries < 3) && (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <div className="pb-32">
          <p className="text-xs text-orange-600 text-center font-semibold tracking-wider uppercase px-2 mt-8 mb-4">Untuk kalangan terbatas</p>

          <div className="max-w-xs mx-auto bg-indigo-100 items-center rounded border border-gray-300 text-gray-700 p-6 pb-10 mb-6">
            {welcome && <Welcome fn={setWelcome} />}

            {(!welcome && !access) && <AccessForm errorMessage={accessErrorMsg} onSubmit={handleAccessSubmit} />}

            {(!welcome && access) && <LoginForm isLogin access={access} errorMessage={errorMsg} onSubmit={handleSubmit} />}
          </div>
        </div>
      </div>
      )}
    </>
  )
}

const btn = "bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
const btnFull = "w-full bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
const input = "appearance-none border border-blue-300 rounded w-full py-2 px-3 text-xl focus:text-indigo-600 leading-tight focus:outline-none focus:border-purple-500"

const Blackened = () => (
  <div className="min-h-screen bg-gray-500">&nbsp;</div>
)

const Welcome = ({ fn }) => (
  <div>
    <p className="text-md mb-8">
      Silakan klik tombol di bawah bila Anda memiliki Kode Akses.
    </p>
    <button className={btnFull} onClick={(event) => {
      fn(false)
    }}>
      Masuk
    </button>
  </div>
)

const AccessForm = ({ errorMessage, onSubmit }) => (
  <div>
    <form onSubmit={onSubmit}>
      <div className="mb-4">
        <label className="block text-md font-bold mb-6" htmlFor="accessCode">Kode Akses</label>
        <input type="text" id="accessCode" name="accessCode" value="sdi-abk" required autoFocus autoComplete="off"
        className={input} />
      </div>
      {errorMessage && <p className="text-red-500 my-3">{errorMessage}</p>}
      <div className="flex items-center justify-between">
        <button className={btnFull} type="submit">Periksa Kode Akses</button>
      </div>
    </form>
  </div>
)

const LoginForm = ({ access, errorMessage, onSubmit }) => (
  <div>
    <form onSubmit={onSubmit}>
      <input type="hidden" name="projectId" id="projectId" value={access?._id} />
      <input type="hidden" name="projectPath" id="projectPath" value={access?.path} />
      <input type="hidden" name="loginType" id="loginType" value={access?.type} />
      <p className="mb-6 text-md leading-snugs font-light">
        <span className="font-semibold mr-1">Kode Akses diterima.</span><br/>
        Untuk melanjutkan, silakan masukkan username dan password.
      </p>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2" htmlFor="username">
          Username
        </label>
        <input type="text" id="username" name="username" required autoFocus autoComplete="off"
        className={input} />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2" htmlFor="password">
          Password
        </label>
        <input type="password" id="password" name="password" required
        className={input} />
      </div>
      {errorMessage && <p className="text-red-500 my-3">{errorMessage}</p>}
      <div className="flex items-center justify-between">
        <button className={btn} type="submit">
          Sign In
        </button>
        {/* <a className="inline-block align-baseline font-semibold text-sm text-purples-500 hover:text-purple-800 mr-4" href="#">
          Forgot Password?
        </a> */}
      </div>
    </form>
  </div>
)