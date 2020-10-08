import { memo, createContext, useContext } from "react"
import { useRouter } from 'next/router'
import Link from 'next/link'
import fetchJson from 'lib/fetchJson'
import useUser from 'lib/useUser'

export default function Persona() {
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

const UserContext = createContext()

function ContextProvider({ user, children }) {
  return (
    <UserContext.Provider value={{ user }}>
      {children}
    </UserContext.Provider>
  )
}

function PageDetail() {
  const { user } = useContext(UserContext)

  return (
    <div className="p-6">
      <UserStat data={user} />

      <div className="bg-gray-200s text-gray-700 my-8">
        <p>Anda memiliki {user.tests.length} slot test.</p>
        <div className="grid grid-cols-2 gap-4 my-4">
          {user.tests.map((t) => (
            <Link key={t} href={`/persona/${t.split('-')[0]}`}>
              <a className="rounded-lg border-2 border-green-400 text-green-500 text-center text-3xl tracking-widest uppercase p-8 hover:bg-green-400 hover:text-white hover:font-bold">{t.split('-')[0]}</a>
            </Link>
          ))}
        </div>
      </div>

      <hr className="my-6"/>

      {/* <pre className="w-full overflow-scroll bg-gray-200 p-3 text-xs my-6">{JSON.stringify(user, null, 2)}</pre> */}
      <p className="text-sm text-center text-red-500 px-6">
        Di halaman ini disajikan tombol-tombol (tiket) untuk mengakses tes,
        namun paling banyak hanya satu yang aktif.
        Tombol untuk test yang sudah selesai tidak lagi bisa dipakai untuk
        masuk ke ruang tes.
      </p>
    </div>
  )
}

const UserStat = ({ data }) => {
  const router = useRouter()
  const { mutateUser } = useUser({ redirectTo: '/' })
  const dotCls = "px-3 bg-green-600 border-r text-white"
  return (
    <div>
      <div className="flex flex-row items-center text-xs text-gray-600 uppercase tracking-wide mb-2 px-2">
        <p className="flex-1 font-semibold">{data.projectTitle}</p>
        <p className="flex-grow text-right font-normal">{ new Date().toLocaleDateString() }</p>
      </div>
      <div className="flex flex-row bg-gray-200 items-center rounded borders border-gray-400 text-gray-700 mb-6">
        <p className="px-5 border-r text-gray-800 leading-10 font-bold">{data.fullname}</p>
        <p className="flex-grow text-sm text-gray-600 leading-10 text-right text-gray-700">
          <button className="inline-block border-l text-gray-600 px-4 hover:bg-gray-600 hover:text-white">Pause</button>
          <Link href="/api/signout">
            <a onClick={async (e) => {
                e.preventDefault()
                await mutateUser(fetchJson('/api/signout'))
                router.push('/')
              }} className="inline-block border-l rounded-r px-4 text-red-500 hover:bg-gray-600 hover:text-white">Logout</a>
          </Link>
        </p>
      </div>
    </div>
  )
}