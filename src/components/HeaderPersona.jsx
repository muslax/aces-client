import Link from 'next/link'

const HeaderPersona = ({ user, project }) => {
  // const module = getModule(project, type)
  const today = new Date()

  return (
    <div className="mb-8 text-gray-700">
      <div className="flex flex-col text-xs px-1 py-2 pt-3">
        <div className=" text-xs text-center uppercase tracking-wide sm:tracking-wider md:tracking-widest">
          <span id="companyName" className="">{ project?.title ? project?.title : '&nbsp;' }</span>
        </div>
      </div>

      <div className="flex flex-row bg-gray-200 rounded-md items-center text-sm leading-10 px-3">
        <div className="flex flex-grow flex-row font-semibold">
          <span className="pr-4">Nama Perusahaan Klien</span>
          {/* <span className="font-normal px-3 border-l border-white">&nbsp;</span> */}
        </div>
        <div className="flex-0 text-right font-monos pl-t">
          <span className="font-light">{today.toLocaleDateString()}</span>
        </div>
      </div>

      <div className="flex flex-row items-center pb-2 mt-10 mb-16 border-b border-gray-400">
        <div className="flex-grow">
          <h1 className="text-3xl text-gray-700 font-light">{user.fullname}</h1>
          <p className="text-xs text-gray-600">Persona ID: {user._id}</p>
        </div>
        <div className="text-right">
        <Link href="/api/signout">
          <a onClick={async (e) => {
              e.preventDefault()
              await mutateUser(fetchJson('/api/signout'))
              router.push('/')
            }} className="inline-block border border-gray-400 rounded px-4 py-2 text-gray-500 hover:border-gray-500 hover:bg-gray-200 hover:text-gray-700">Logout</a>
        </Link>
        </div>
      </div>

    </div>
  )
}

export default HeaderPersona