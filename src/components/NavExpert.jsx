import Link from 'next/link'
import { useRouter } from 'next/router'
import useUser from 'lib/useUser'
import fetchJson from 'lib/fetchJson'
import Loading from 'components/Loading'

export default function NavExpert({ user }) {
  const router = useRouter()
  const { mutateUser } = useUser({ redirectTo: '/' })
  if (!user || user.isLoggedIn === false) return <Loading />

  return (
    <div className="flex flex-row bg-blue-500 px-4 py-3">
      <div className="flex flex-1 items-center">
        <span className="text-white font-bold tracking-wider">{user.username.toUpperCase()} / {user.projectTitle}</span>
      </div>
      <div className="flex flex-row">
        <div className="flex items-center">
          <Link href="/api/signout">
            <a onClick={async (e) => {
                e.preventDefault()
                await mutateUser(fetchJson('/api/signout'))
                router.push('/')
              }} className="bg-transparent border border-blue-200 text-blue-100 rounded py-1 px-3
              hover:bg-blue-700 hover:border-blue-700 hover:text-white">Signout</a>
          </Link>
        </div>
      </div>
    </div>
  )
}