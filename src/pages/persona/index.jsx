import { memo, createContext, useContext, useState } from "react"
import { useRouter } from 'next/router'
import Link from 'next/link'
import fetchJson from 'lib/fetchJson'
import useUser from 'lib/useUser'
import Layout from "components/Layout";
import useSWR from "swr"

export default function Persona() {
  const { user } = useUser({ redirectTo: "/" })

  if (!user || !user.isLoggedIn) return <div></div>

  return (
    <UserProvider user={user}>
      <PageContent title={user.fullname} />
    </UserProvider>
  )
}

const PageContent = memo(({title}) => {
  return (
    <Layout title={title}>
      <div id="timer" className="hidden" />{/* Timer hack */}
      <Header />
      <Content />
    </Layout>
  )
})

const UserContext = createContext()

function UserProvider({ user, children }) {
  const [state, setState] = useState(-1);
  const url = `/api/modules?project=${user.projectId}`
  const { data: modules } = useSWR(url, fetchJson)

  return (
    <UserContext.Provider value={{
      user, state,
      modules,
     }}>
      {children}
    </UserContext.Provider>
  )
}

function getTests(user, modules) {
  let tests = []
  modules?.forEach(mod => {
    if (mod.method == "selftest" && user.tests.indexOf(mod.slug) >= 0) {
      tests.push(mod)
    }
  })
  return tests
}

function getSims(user, modules) {
  let tests = []
  modules?.forEach(mod => {
    if (mod.method == "simulation" && user.simulations.indexOf(mod.slug) >= 0) {
      tests.push(mod)
    }
  })
  return tests
}

function Header() {
  const { user, state } = useContext(UserContext)

  return (
    <div className="mb-8">
      {/* abc */}
      <div className="flex flex-row text-xs px-1 py-2 pt-3">
        <div className="flex-1 items-center">
          <span className="uppercase tracking-wide sm:tracking-wider md:tracking-widest">Nama perusahaan klien</span>
          <span className="ml-3">{state}</span>
        </div>
        <div className="flex-grow text-right">
          <span className="font-semibold">Nama perusahaan tenant</span>
        </div>
      </div>
      {/* sss */}
      <div className="flex flex-row bg-gray-200 rounded-sm items-center text-gray-700">
        <div className="flex flex-row">
          <p className="px-4 border-r border-white text-gray-800s leading-10 tracking-wide font-semibold">{user?.projectTitle}</p>
        </div>
      </div>
    </div>
  )
}

const TestCard = ({module}) => {

  return (
    <div key={module.ref} className="mb-4">
      <div className="mod-box rounded-lg bg-blue-400 bg-opacity-0 hover:bg-opacity-25 p-1 -mx-1">
        <div className="mod-box-inner rounded-md bg-gradient-to-r from-blue-100 hover:from-white hover:to-white border border-blue-300 hover:border-blue-500 p-4">
          <div className="flex flex-row items-center">
            <div className="flex-grow text-sm text-gray-700 font-light">
              <p className="text-2xl text-blue-600 font-light mb-2">{module.name}</p>
              <p className="">Jumlah soal: {module.items}</p>
              <p className="">Rata-rata waktu penyelesaian: {module.items}</p>
              <p className="">Maksimum waktu: {module.maxTime ? module.maxTime / (1000 * 60) + " menit" : "bebas" }</p>
            </div>
            <div className="flex flex-col items-center w-1/4 pl-4">
              {module.type == "gpq" && (
                <>
                  <div className="mod-status rounded-full bg-blue-400 h-8 w-8 mb-4 flex items-center justify-center">&nbsp;</div>
                  <Link href="/persona/gpq">
                    <a className="mod-link inline-block bg-white rounded border border-gray-400 px-4 py-2 text-gray-500 hover:border-blue-500 hover:bg-blue-500 hover:text-white">Masuk</a>
                  </Link>
                </>
              )}
              {module.type != "gpq" && (
                <>
                  <div className="rounded-full bg-gray-400 h-8 w-8 mb-4 flex items-center justify-center">&nbsp;</div>
                  <button disbled className="inline-block bg-white rounded border border-gray-400 px-4 py-2 text-gray-500">Masuk</button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
      .mod-box:hover > .mod-box-inner {
        background-color: white;
      }
      .mod-box:hover .mod-status {
        background-color: #4299e1;
      }
      .mod-box-inner:hover .mod-link {
        border-width: 1px;
      }
      .mod-box:hover .mod-link {
        color: #4299e1;
        border-color: #63b3ed;
        margin-bottom: 0px
      }
      .mod-box:hover .mod-link:hover {
        color: white;
        border-color: #4299e1;
      }
      `}</style>
    </div>
  )
}

const SimCard = ({module}) => {
  return (
    <div key={module.ref} className="mb-4">
      <div className="mod-box rounded-lg bg-orange-400 bg-opacity-0 hover:bg-opacity-25 p-1 -mx-1">
        <div className="mod-box-inner rounded-md bg-gradient-to-r from-yellow-100 hover:from-white hover:to-white border border-orange-300 hover:border-orange-500 p-4">
          <div className="flex flex-row items-center">
            <div className="flex flex-col items-center text-sm font-light pr-4">
              <div className="calendar w-auto bg-whites text-xs text-gray-700 text-center rounded-sm borders px-2">
                <p className="uppercase">Selasa</p>
                <p className="text-4xl text-orange-600 font-bold -mt-2 -mb-2">23</p>
                <p className="uppercase">Oktober</p>
                <p className="calendar border-t border-orange-300 pt-1 mt-1 ">Pukul 20:00 WIB</p>
              </div>
            </div>
            <div className="mod-box-right flex-grow text-sm text-gray-700 font-light -my-4 p-4 border-l border-orange-300 hover:border-orange-500">
              <p className="text-2xl text-orange-700 -mt-1s mb-2">{module.name}</p>
              <p className="">Jumlah soal: {module.items}</p>
              <p className="">Rata-rata waktu penyelesaian: {module.items}</p>
              <p className="">Maksimum waktu: {module.maxTime ? module.maxTime / (1000 * 60) + " menit" : "bebas" }</p>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
      .mod-box:hover > .mod-box-inner {
        background-color: white;
      }
      .mod-box:hover .mod-status {
        background-color: #4299e1;
      }
      .mod-box-inner:hover .mod-box-right {
        border-color: #ed8936;
      }
      .mod-box-inner:hover .mod-link {
        border-width: 2px;
      }
      .mod-box:hover .mod-link {
        color: #4299e1;
        border-color: #63b3ed;
      }
      .mod-box:hover .mod-link:hover {
        color: white;
        border-color: #4299e1;
      }
      .mod-box-inner:hover .calendar {
        border-color: #ed8936;
      }
      `}</style>
    </div>
  )
}

function UserModules() {
  const { user, modules } = useContext(UserContext)
  const tests = getTests(user, modules)
  const simulations = getSims(user, modules)

  return (
    <div>
      <h3 className="text-md text-gray-700 uppercase tracking-wide mb-2">Test Mandiri Online</h3>
      {tests.map((mod) => ( <TestCard module={mod} /> ))}
      <h3 className="text-md text-gray-700 uppercase tracking-wide mt-8 mb-2">Simulasi / Tatap Muka</h3>
      {simulations.map((mod) => ( <SimCard module={mod} /> ))}
    </div>
  )
}

function Content() {
  const { user, state, modules } = useContext(UserContext)
  const { mutateUser } = useUser({ redirectTo: '/' })
  const router = useRouter()

  return (
    <div className="">
      <div className="flex flex-row items-center pb-2 mt-10 mb-16 border-b border-gray-400">
        <div className="flex-grow">
          <h1 className="text-3xl text-gray-700 font-light">{user.fullname}</h1>
          <p className="text-xs text-gray-600">Persona ID: {user._id}</p>
        </div>
        <div className="text-right">
        <Link href="/api/signout">
          <a onClick={async (e) => {
              e.preventDefault()
              await mutateUser(fetchJson('/api/signout'))
              router.push('/')
            }} className="inline-block border border-gray-400 rounded px-4 py-2 text-gray-500 hover:border-gray-500 hover:bg-gray-200 hover:text-gray-700">Logout</a>
        </Link>
        </div>
      </div>


      <div className="max-w-2xl mx-auto">
        <UserModules />
      </div>

      {/* <pre className="pre">{JSON.stringify(user, null, 2)}</pre> */}
      {/* <pre className="pre">{JSON.stringify(modules, null, 2)}</pre> */}
    </div>
  )
}
