function findModule(project, type) {
  for(let i = 0; i < project?.modules.length; i++) {
    if (project.modules[i]['type'] == type)
      return project.modules[i]
  }

  return null
}

const Header = ({ user, project, type }) => {
  const module = findModule(project, type)

  return (
    <div className="mb-8 text-gray-700">
      <div className="flex flex-col text-xs px-1 py-2 pt-3">
        <div className=" text-xs text-center uppercase tracking-wide sm:tracking-wider md:tracking-widest">
          <span id="companyName" className="">{
            project?.clientName ? project?.clientName : project?.title
          }</span>
          <span className="px-2">|</span>
          <span className="">PT Samoa Selatan</span>
        </div>
      </div>
      <div className="flex flex-row bg-gray-200 rounded-md items-center text-sm leading-10 px-3">
        <div className="flex flex-grow flex-row font-semibold">
          <span className="pr-3">{module?.name}</span>
          <span className="font-normal px-3 border-l border-white">&nbsp;</span>
        </div>
        <div className="flex-0 text-right border-l border-white pl-3">
          <span className="font-light">Versi {module?.version}</span>
        </div>
      </div>
      <div className="flex flex-row text-sm text-gray-700 font-light px-2 py-2 border-b">
        <div className="flex-grow">{user?.fullname}</div>
        <div className="flex-1 text-right text-xs font-mono">
          <span id="timer" className="w-32 mr-2"></span>
          <span>Time Display</span>
        </div>
      </div>
    </div>
  )
}

export default Header