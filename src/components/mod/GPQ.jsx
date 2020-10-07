import useSWR from 'swr'
import fetchJson from 'lib/fetchJson'
import Loading from 'components/Loading'
import { docInfo, firstElms, secondElms } from 'lib/gpq-1.0'

export default function GPQ({ user }) {
  const url = "/api/ev-gpq?" + `projectId=${user.projectId}&personaId=${user._id}`
  console.log(url)
  const { data: evStatus } = useSWR(url, fetchJson)


  const loadDoc = async (user) => {
    const response = await fetch("/api/gpq", {
      method: 'POST',
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        license: user.license,
        projectId: user.projectId,
        personaId: user.personaId,
        fullname: user.fullname,
      })
    })
  }

  return (
    <div className="p-6">
      <h1>GPQ for {user._id}</h1>
      <pre className="text-xs my-6">{JSON.stringify(user, null, 2)}</pre>

      <hr/>
      <pre className="text-xs my-6">{JSON.stringify(evStatus, null, 2)}</pre>
      <hr/>

    </div>
  )
}