export default function HeaderLoading() {
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