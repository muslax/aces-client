import { useState, memo, createContext, useContext } from "react"
import useSWR from "swr"
import useUser from 'lib/useUser'
import Unauthorized from 'components/Unauthorized'
import LayoutPersona from 'components/LayoutPersona'
import NavPersona from 'components/NavPersona'
import GPQ from 'components/mod/GPQ'
import { func } from "prop-types"

/*const PrivatePage = () => {
  const { user } = useUser({ redirectTo: '/' })

  if (!user || user.isLoggedIn === false) return <Unauthorized/>

  return (
    <LayoutPersona>
      <NavPersona user={user} />
      <GPQ user={user} />
    </LayoutPersona>
  )
}

export default PrivatePage*/

export default function PrivatePage() {
  const { user } = useUser({ redirectTo: '/' })

  if (!user || user.isLoggedIn === false) return <Unauthorized/>

  return (
    <GPQProvider user={user}>
      <NavPersona user={user} />
      <PageContent />
      <GPQ user={user} />
    </GPQProvider>
  )
}

const PageContent = memo(() => {
  return (
    <div className="border p-4 m-4">
      <GPQDetail />
    </div>
  )
})

//  CONTEXT

const GPQContext = createContext()

// PROVIDER

function GPQProvider({ user, children }) {
  const [gpqState, setGpqState] = useState("")

  return (
    <GPQContext.Provider value={{ user, gpqState, setGpqState}}>
      {/* <p className="font-bold">{user.fullname}</p> */}
      {children}
    </GPQContext.Provider>
  )
}

async function fetchGpq(gpqPart) {
  const response = await fetch(
    "/api/mod-gpq?seq=120"
  )
  const data = await response.json()
  return data
}

function GPQDetail() {
  const { gpqPart } = useContext(GPQContext)
  const { user } = useContext(GPQContext)
  const { data, isLoading, error } = useSWR([gpqPart], fetchGpq)

  if (isLoading) return <span>loading...</span>
  if (error) return <span>oop!! error occurred</span>

  return (
    <div>
      <h1>{user.fullname}</h1>
      <hr className="mt-2 mb-4"/>
      <pre className="text-xs">{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}
