import useUser from 'lib/useUser'
import Unauthorized from 'components/Unauthorized'
import LayoutGuest from 'components/LayoutGuest'
import NavGuest from 'components/NavGuest'
import Persona from 'components/Persona'

export default function PrivatePage() {
  const { user } = useUser({ redirectTo: '/' })

  if (!user || user.isLoggedIn === false) return <Unauthorized/>

  return (
    <LayoutGuest>
      <NavGuest user={user} />
      <div>
        <pre>{JSON.stringify(user, null, 2)}</pre>
      </div>
    </LayoutGuest>
  )
}