import { createContext, memo, useContext, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import useUser from 'lib/useUser'
import fetchJson from 'lib/fetchJson'
import Layout from 'components/Layout'
import useSWR from 'swr'
import TestCard from 'components/TestCard';
import SimCard from 'components/SimCard'

export default function Welcome() {
  const { user } = useUser({ redirectTo: "/" })

  if (!user || !user.isLoggedIn) return <div></div>

  return (
    <ProjectProvider user={user}>
      <PageContent />
    </ProjectProvider>
  )
}

const PageContent = memo(() => {
  return (
    <Layout title="Selamat Datang">
      <Content />
    </Layout>
  )
})

const ProjectContex = createContext()

function ProjectProvider({ user, children }) {
  const swrOptions = { refreshInterval: 0, revalidateOnFocus: false }
  const { data: project } = useSWR(`/api/project?id=${user.projectId}&graball`, fetchJson, swrOptions)
  // const { data: modules } = useSWR(`/api/project?id=${user.projectId}&modules`, fetchJson, swrOptions)

  return (
    <ProjectContex.Provider value={{
      user,
      project,
    }}>
      {children}
    </ProjectContex.Provider>
  )
}

// Get tests from projects tests
function getUserModules(user, modules) {
  let usermodules = []
  for (let i=0; i<modules?.length; i++) {
    if (user.tests.indexOf(modules[i]['slug']) >= 0) {
      usermodules.push(modules[i])
    }
  }
  console.log(user.tests)
  console.log(usermodules)
  return usermodules
}

// Get sims from projects sims
function getUserSims(user, simulations) {
  let usersims = []
  for (let i=0; i<simulations?.length; i++) {
    if (user.simulations.indexOf(simulations[i]['slug']) >= 0) {
      usersims.push(simulations[i])
    }
  }
  console.log(user.simulations)
  console.log(usersims)
  return usersims
}

function Header() {
  const { user } = useContext(ProjectContex)
  const { mutateUser } = useUser({ redirectTo: '/' })
  const router = useRouter()

  return (
    <div className="mb-8 text-gray-700">
      <div className="flex flex-col text-xs px-1 py-3 pt-4">
        <div className=" text-xs text-center uppercase tracking-wide sm:tracking-wider md:tracking-widest">
          <span id="companyName" className="font-bold">{user ? user.projectTitle : "..."}</span>
        </div>
      </div>

      <div className="flex flex-row bg-yellow-400 rounded-md items-center text-sm leading-10 px-4">
        <div className="flex flex-grow flex-row font-semibold">
          <span className="pr-3">{user ? user.company : "..."}</span>
        </div>
        <div className="flex-0 text-right pl-4 border-l border-yellow-500">
          <span>{new Date().getFullYear()}</span>
        </div>
      </div>

      <div className="flex flex-row items-center pb-2 mt-10 mb-16 border-b border-orange-300">
        <div className="flex-grow">
          <h1 className="text-3xl text-gray-700 font-light">{user ? user.fullname : "..."}</h1>
        </div>
        <div className="text-right">
        <Link href="/api/signout">
          <a onClick={async (e) => {
              e.preventDefault()
              await mutateUser(fetchJson('/api/signout'))
              router.push('/')
            }} className="inline-block bg-gray-100 border border-gray-300 rounded px-4 py-2 text-gray-500 hover:border-gray-400 hover:bg-gray-200 hover:text-gray-700">Logout</a>
        </Link>
        </div>
      </div>
    </div>
  )
}

function Content() {
  const { user, project } = useContext(ProjectContex)
  const tests = getUserModules(user, project?.modules)
  const simulations = getUserSims(user, project?.modules)

  return (
    <div>
      <Header />
      <div className="max-w-2xl mx-auto">
        <h3 className="text-md text-gray-600 font-bold uppercase tracking-wide mb-4">Test Mandiri (Online)</h3>
        {tests.map((module) => <TestCard key={module.slug} user={user} module={module} />)}
        <br/>
        <h3 className="text-md text-gray-600 font-bold uppercase tracking-wide mb-4">Interaktif / Tatapmuka</h3>
        {simulations.map((module) => <SimCard key={module.slug} user={user} module={module} />)}
        {/* <pre className="pre">{JSON.stringify(simulations, null, 2)}</pre> */}
      </div>
    </div>
  )
}