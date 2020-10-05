import Link from 'next/link'
import { useRouter } from 'next/router'
import useUser from 'lib/useUser'
import fetchJson from 'lib/fetchJson'
import Loading from 'components/Loading'

export default function NavPersona({ user }) {
  const router = useRouter()
  const { mutateUser } = useUser({ redirectTo: '/' })
  if (!user || user.isLoggedIn === false) return <Loading />

  return (
    <div className="flex flex-row bg-gray-300 px-4 py-3">
      <div className="flex flex-1 items-center">
        <span className="font-bold tracking-wider">{user.fullname}</span>
      </div>
      <div className="flex flex-row">
        <div className="flex items-center mr-3">
          <span className="bg-transparent border border-gray-600 text-gray-600 rounded py-1 px-3
              hover:bg-gray-600 hover:text-white">Pause</span>
        </div>
        <div className="flex items-center">
          <Link href="/api/signout">
            <a onClick={async (e) => {
                e.preventDefault()
                await mutateUser(fetchJson('/api/signout'))
                router.push('/')
              }} className="bg-transparent border border-gray-600 text-gray-600 rounded py-1 px-3
              hover:bg-gray-600 hover:text-white">Signout</a>
          </Link>
        </div>
      </div>
    </div>
  )
}