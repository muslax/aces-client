import useSWR from 'swr'
import Link from 'next/link'
import fetchPost from 'lib/fetchPost'
import fetchJson from 'lib/fetchJson'
import Loading from 'components/Loading'
import useUser from 'lib/useUser'

const Persona = ({ user }) => {

  if (!user || user.isLoggedIn === false) return <Loading />

  const insertDoc = async (user) => {
    const response = await fetch("/api/gpq", {
      method: 'POST',
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        license: user.license,
        projectId: user.projectId,
        personaId: user._id,
        fullname: user.fullname,
        items: 120,
      })
    })
  }

  const testAwaiting = user.testsPerformed < user.tests.length ? user.tests[user.testsPerformed] : false
  const testLink = testAwaiting ? testAwaiting.split("-")[0] : false
  const url = "/api/mod-gpq?" + `project=${user.projectId}&slug=${testAwaiting}`
  const { data: module } = !testAwaiting ? null : useSWR(url, fetchJson)



  return (
    <div className="w-full p-4">
      <p className="mb-4">
        Test Awaiting: {testAwaiting.toUpperCase()}
      </p>

      <pre className="text-xs my-6">{JSON.stringify(user, null, 2)}</pre>

      {testLink && (
        <Link href={`/persona/${testLink}`}>
          <a className="bg-transparent border border-gray-600 text-xl text-gray-600 rounded py-3 px-6
            hover:bg-gray-600 hover:text-white">Siap Menjalankan Test GPQ</a>
        </Link>
      )}

      <pre className="text-xs my-6">{JSON.stringify(module, null, 2)}</pre>
    </div>
  )
}

export default Persona

/*
<Link href={`/persona/${testLink}`}>
  <a onClick={async (e) => {
        e.preventDefault()
        await insertDoc(user)
      }} className="bg-transparent border border-gray-600 text-xl text-gray-600 rounded py-3 px-6
    hover:bg-gray-600 hover:text-white">Siap Menjalankan Test GPQ</a>
</Link>
*/