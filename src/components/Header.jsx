import Link from 'next/link'

function IndexHeader({ user }) {
  return (
    <div className="mb-8 text-gray-700">
      <div className="flex flex-col text-xs px-1 py-3 pt-4">
        <div className=" text-xs text-center uppercase tracking-wide sm:tracking-wider md:tracking-widest">
          <span id="companyName" className="font-bold">{user?.projectTitle}</span>
        </div>
      </div>

      <div className="flex flex-row bg-yellow-400 rounded-md items-center text-sm leading-10 px-4">
        <div className="flex flex-grow flex-row font-semibold">
          <span className="pr-3">{user?.company}</span>
        </div>
        <div className="flex-0 text-right pl-3">
          <span>{new Date().getFullYear()}</span>
        </div>
      </div>

      <div className="flex flex-row items-center pb-2 mt-10 mb-16 border-b border-orange-300">
        <div className="flex-grow">
          <h1 className="text-3xl text-gray-700 font-light">{user.fullname}</h1>
        </div>
        <div className="text-right">
        <Link href="/api/signout">
          <a onClick={async (e) => {
              e.preventDefault()
              await mutateUser(fetchJson('/api/signout'))
              router.push('/')
            }} className="inline-block bg-gray-100 border border-gray-300 rounded px-4 py-2 text-gray-500 hover:border-gray-400 hover:bg-gray-200 hover:text-gray-700">Logout</a>
        </Link>
        </div>
      </div>
    </div>
  )
}

function TestHeader({ user, module, progress }) {
  return (
    <div className="mb-8 text-gray-700">
      <div className="flex flex-col text-xs px-1 py-3 pt-4">
        <div className=" text-xs text-center uppercase tracking-wide sm:tracking-wider md:tracking-widest">
          <span id="companyName" className="font-bold">{user?.projectTitle}</span>
          <span className="px-2">|</span>
          <span className="">{user?.company}</span>
        </div>
      </div>

      <div className="flex flex-row bg-yellow-400 rounded-md items-center text-sm leading-10 px-4">
        <div className="flex flex-grow flex-row font-semibold">
          <span>{module?.name}</span>
        </div>
        <div className="flex flex-0 text-right pl-3 font-bold">
          <span className=" bg-yellow-600 bg-opacity-25 px-3 border-l border-r border-yellow-500">{progress?.done + 1}</span>
          <span className="pl-3">{progress?.items}</span>
        </div>
      </div>

      <div className="flex flex-row text-sm text-gray-700 font-light px-2 py-2 border-b border-orange-300">
        <div className="flex-grow font-semibold">{user?.fullname}</div>
        <div className="flex-1 text-right text-xs font-mono">
          <div id="timer" className="mr-2">&nbsp;</div>
        </div>
      </div>
    </div>
  )
}

const Header = ({ user, project, module, progress }) => {
  // Loading state
  if (!user ) {
    return (
      <div className="mb-8 text-gray-700">
        <div className="flex flex-col text-xs px-1 py-3 pt-4">
          <div className=" text-xs text-center uppercase tracking-wide sm:tracking-wider md:tracking-widest">
            <span id="companyName" className="font-bold">...</span>
          </div>
        </div>

        <div className="flex flex-row bg-yellow-400 rounded-md items-center text-sm leading-10 px-3">
          <div className="flex flex-grow flex-row font-semibold">
            <span>...</span>
          </div>
          <div className="flex flex-0 text-right pl-3 font-bold">
            <span className="pl-3 pr-1">&nbsp;</span>
          </div>
        </div>

        <div className="flex flex-row text-sm text-gray-700 font-light px-2 py-2 border-b border-orange-300">
          <div className="flex-grow font-semibold">&nbsp;</div>
          <div className="flex-1 text-right text-xs font-mono">
            <div className="mr-2">&nbsp;</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      {project && <IndexHeader user={user} />}
      {module && <TestHeader user={user} module={module} progress={progress} />}
    </>
  )
}

export default Header