import useUser from 'lib/useUser'
import Unauthorized from 'components/Unauthorized'
import Layout from 'components/Layout'
// import NavExpert from 'components/NavExpert'

export default function PrivatePage() {
  const { user } = useUser({ redirectTo: '/' })

  if (!user || user.isLoggedIn === false) return <Unauthorized/>

  return (
    <Layout>
      {/* <NavExpert user={user} /> */}
      <div>
        <pre>{JSON.stringify(user, null, 2)}</pre>
      </div>
    </Layout>
  )
}