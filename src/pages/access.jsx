import Head from 'next/head'
import { useState } from 'react'
import useUser from 'lib/useUser'
import fetchJson from 'lib/fetchJson'
import AccessForm from 'components/AccessForm'
import LoginForm from 'components/LoginForm'

export default function Access() {
  const [access, setAccess] = useState(null)
  const [accessErrorMsg, setAccessErrorMsg] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const { user } = useUser({ redirectTo: false })

  // Redirect to persona, guest, expert?
  // const redirect = user?.role ? user?.projectId + '/' + user?.role : user?.projectId + '/' + user?.type
  const redirect = user?.projectId

  // const { mutateUser } = useUser({ redirectTo: user?.path, redirectIfFound: true })

  // Using project id as route
  // const { mutateUser } = useUser({ redirectTo: user?.projectId, redirectIfFound: true })
  const { mutateUser } = useUser({ redirectTo: redirect, redirectIfFound: true })

  async function handleAccessSubmit(e) {
    e.preventDefault()

    const body = { code: e.currentTarget.accessCode.value }

    try {
      const rs = await fetchJson("/api/access", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })
      console.log("Path: ", rs)
      setAccessErrorMsg('')
      setAccess(rs)
    } catch (error) {
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
      console.error('An unexpected error happened:', error)
      setErrorMsg(error.data.message)
    }
  }

  if (user?.isLoggedIn) return <div className="h-screen bg-gray-300 border-t-4 border-gray-700"></div>

  return (
    <div className="h-screen bg-gray-300 p-4 border-t-4 border-gray-700">
      <Head>
        <title>Aces Project Lounge</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="max-w-xl mx-auto mt-8 p-6 bg-grays-200">

        {!access && <AccessForm errorMessage={accessErrorMsg} onSubmit={handleAccessSubmit} />}

        {access && <LoginForm isLogin access={access} errorMessage={errorMsg} onSubmit={handleSubmit} />}

        {/* {access && <pre>{JSON.stringify(access, null, 2)}</pre>} */}

      </div>
    </div>
  )
}