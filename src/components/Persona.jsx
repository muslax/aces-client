import Loading from 'components/Loading'

export default function Persona({ user }) {
  if (!user || user.isLoggedIn === false) return <Loading />

  const testAwaiting = user.testsPerformed < user.tests.length ? user.tests[user.testsPerformed] : 'None'

  return (
    <div className="w-full p-4">
      <p className="mb-4">
        Test Awaiting: {testAwaiting.toUpperCase()}
      </p>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  )
}