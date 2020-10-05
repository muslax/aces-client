import useUser from 'lib/useUser'
import Unauthorized from 'components/Unauthorized'
import LayoutPersona from 'components/LayoutPersona'
import NavPersona from 'components/NavPersona'
import Persona from 'components/Persona'

export default function PrivatePage() {
  const { user } = useUser({ redirectTo: '/' })

  if (!user || user.isLoggedIn === false) return <Unauthorized/>

  return (
    <LayoutPersona>
      <NavPersona user={user} />
      <Persona user={user} />
    </LayoutPersona>
  )
}