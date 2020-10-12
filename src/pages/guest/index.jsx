import useUser from 'lib/useUser'
import Unauthorized from 'components/Unauthorized'
import Layout from 'components/Layout'
import NavGuest from 'components/NavGuest'
import Persona from 'components/Persona'

export default function PrivatePage() {
  const { user } = useUser({ redirectTo: '/' })

  if (!user || user.isLoggedIn === false) return <Unauthorized/>

  return (
    <Layout>
      {/* <NavGuest user={user} /> */}
      <div>
        <pre>{JSON.stringify(user, null, 2)}</pre>
      </div>
    </Layout>
  )
}