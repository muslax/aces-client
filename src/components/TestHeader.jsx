export default function TestHeader({ user, module, progress }) {
  return (
    <div className="mb-8 text-gray-700">
      <div className="flex flex-col text-xs px-1 py-2 pt-3">
        <div className=" text-xs text-center uppercase tracking-wide sm:tracking-wider md:tracking-widest">
          <span id="companyName" className="font-bold">{user?.projectTitle}</span>
          <span className="px-2">|</span>
          <span className="">{user?.company}</span>
        </div>
      </div>

      <div className="flex flex-row bg-yellow-400 rounded-md items-center text-sm leading-10 px-3">
        <div className="flex flex-grow flex-row font-semibold">
          <span>{module?.name}</span>
        </div>
        <div className="flex flex-0 text-right pl-3 font-bold">
          <span className=" bg-yellow-600 bg-opacity-25 px-3 border-l border-r border-yellow-500">{progress?.done + 1}</span>
          <span className="pl-3 pr-1">{progress?.items}</span>
        </div>
      </div>



      <div className="flex flex-row text-sm text-gray-700 font-light px-2 py-2 border-b border-orange-300">
        <div className="flex-grow font-semibold">{user?.fullname}</div>
        <div className="flex-1 text-right text-xs font-mono">
          <div id="timer" className="mr-2">{progress?.remains}</div>
        </div>
      </div>
      {/* <pre className="pre">{JSON.stringify(module, null, 2)}</pre> */}
    </div>
  )
}