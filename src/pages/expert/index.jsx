import useUser from 'lib/useUser'
import Unauthorized from 'components/Unauthorized'
import LayoutExpert from 'components/LayoutExpert'
import NavExpert from 'components/NavExpert'

export default function PrivatePage() {
  const { user } = useUser({ redirectTo: '/' })

  if (!user || user.isLoggedIn === false) return <Unauthorized/>

  return (
    <LayoutExpert>
      <NavExpert user={user} />
      <div>
        <pre>{JSON.stringify(user, null, 2)}</pre>
      </div>
    </LayoutExpert>
  )
}