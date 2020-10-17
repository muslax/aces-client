import Layout from 'components/Layout'
import { ACESTestItem } from "lib/modules";

export default function Dev() {
  const item = ACESTestItem('sjt-asn-1.0', 2)
  const options = item.options

  const FLAG = "FLAG px-5 py-3 rounded-l-md bg-gray-200"
  const FLAGGREEN = "FLAG-GREEN px-5 py-3 rounded-l-md bg-green-200"
  const FLAGRED = "FLAG-RED px-5 py-3 rounded-l-md bg-red-200"

  const BGREEN = "BGREEN cursor-pointer flex items-center justify-center w-10 h-10 rounded-full bg-gray-500 hover:bg-green-500"
  const BGREEN_GREEN = "BGREEN cursor-default flex items-center justify-center w-10 h-10 rounded-full bg-green-500"
  const BRED = "BRED cursor-pointer flex items-center justify-center w-10 h-10 rounded-full bg-gray-500 hover:bg-red-500"
  const BRED_RED = "BRED cursor-default flex items-center justify-center w-10 h-10 rounded-full bg-red-500"

  return (
    <Layout title="SJT-ASN">
      <div className="max-w-3xl mx-auto px-6 py-16 mb-16">

        {options.map(opt => (
        <div key={opt.elm} className="flex flex-row rounded">
          <div className="flex-grow py-1">
            <div id={`OPT_${opt.elm}`} className={FLAG}>
              <span className="">{opt.statement}</span>
            </div>
          </div>
          <div className="flex py-1 border-l border-gray-400">
            <div className="flex rounded-r-md bg-gray-100 text-sm text-white font-bold px-2">
              <div className="flex items-center p-2">
                <button id={`GREEN_${opt.elm}`} className={BGREEN}>PE</button>
              </div>
              <div className="flex items-center p-2">
                <button id={`RED_${opt.elm}`} className={BRED}>PT</button>
              </div>
            </div>
          </div>
        </div>
        ))}

        <br/><br/>
        <div className="flex flex-row rounded">
          <div className="flex-grow py-1">
            <div className={FLAGGREEN}>
              <span className="">{item.options[3]["statement"]}</span>
            </div>
          </div>
          <div className="flex py-1 border-l border-gray-400">
          <div className="flex rounded-r-md bg-gray-100 text-sm text-white font-bold px-2">
              <div className="flex items-center p-2">
                <span className={BGREEN_GREEN}>PE</span>
              </div>
              <div className="flex items-center p-2">
                <span className={BRED}>PT</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-row rounded">
          <div className="flex-grow py-1">
            <div className={FLAG}>
              <span className="">{item.options[3]["statement"]}</span>
            </div>
          </div>
          <div className="flex py-1 border-l border-gray-400">
            <div className="flex rounded-r-md bg-gray-100 text-sm text-white font-bold px-2">
              <div className="flex items-center p-2">
                <span className={BGREEN}>PE</span>
              </div>
              <div className="flex items-center p-2">
                <span className={BRED}>PT</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-row rounded bg-gray-200a">
          <div className="flex-grow py-1">
            <div className={FLAGRED}>
              <span className="">{item.options[3]["statement"]}</span>
            </div>
          </div>
          <div className="flex py-1 border-l border-gray-400">
          <div className="flex rounded-r-md bg-gray-100 text-sm text-white font-bold px-2">
              <div className="flex items-center p-2">
                <span className="w-10 h-10 rounded-full bg-gray-300"></span>
              </div>
              <div className="flex items-center p-2">
                <span className={BRED_RED}>PT</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-row rounded bg-gray-200a">
          <div className="flex-grow py-1">
            <div className="px-5 py-3 rounded-l-md bg-gray-200">
              <span className="">{item.options[3]["statement"]}</span>
            </div>
          </div>
          <div className="flex py-1 border-l border-gray-400">
            <div className="flex rounded-r-md bg-gray-100 px-2">
              <div className="flex items-center p-2">
                <span className="w-10 h-10 rounded-full bg-gray-300"></span>
              </div>
              <div className="flex items-center p-2">
                <span className="w-10 h-10 rounded-full bg-gray-300"></span>
              </div>
            </div>
          </div>
        </div>



        {/* <div className="grid grid-cols-1 gap-4">
          <label htmlFor="" className="wrap rounded-lg bg-blue-300 hover:p-1 hover:-m-1 hover:bg-opacity-25">
            <div className="bg-white rounded-lg">
              <div className="flex flex-row items-center bg-gradient-to-r from-yellow-100 hover:bg-gradient-to-r hover:from-white hover:bg-opacity-25 rounded-lg border border-orange-300 hover:border-blue-300">
                <div className="flex-grow px-4 py-3">{item.options[0]["statement"]}</div>
                <div className="flex flex-0 items-center justify-center px-2">
                  <div className="w-12 h-16 flex items-center justify-center text-center">
                    <span className="w-10 h-10 rounded-full bg-green-100 border border-green-500 border-opacity-50 cursor-pointer"></span>
                  </div>
                  <div className="w-12 h-16 flex items-center justify-center text-center">
                  <span className="w-10 h-10 rounded-full bg-red-100 border border-orange-500 border-opacity-50 cursor-pointer"></span>
                  </div>
                </div>
              </div>
            </div>
          </label>

          <label htmlFor="" className="wrap rounded-lg bg-green-300 hover:p-1s hover:-m-1s hover:bg-opacity-25">
            <div className="bg-white rounded-lg">
              <div className="flex flex-row items-center bg-gradient-to-r from-white hover:bg-gradient-to-r hover:from-white hover:bg-opacity-25 rounded-lg border border-gray-400 hover:border-orange-300">
                <div className="flex-grow px-4 py-3">{item.options[0]["statement"]}</div>
                <div className="flex flex-0 items-center justify-center px-2">
                  <div className="w-12 h-16 flex items-center justify-center text-center">
                    <span className="w-10 h-10 rounded-full bg-green-100 border border-green-500 border-opacity-50 cursor-pointer"></span>
                  </div>
                  <div className="w-12 h-16 flex items-center justify-center text-center">
                  <span className="w-10 h-10 rounded-full bg-red-100 border border-orange-500 border-opacity-50 cursor-pointer"></span>
                  </div>
                </div>
              </div>
            </div>
          </label>

          <label htmlFor="" className="wrap rounded-lg bg-blue-400 hover:p-1 hover:-m-1 hover:bg-opacity-25">
            <div className="bg-white rounded-lg">
              <div className="flex flex-row items-center bg-gradient-to-r from-green-200 hover:bg-gradient-to-r hover:from-white hover:bg-opacity-25 rounded-lg border border-green-400 hover:border-blue-400">
                <div className="flex-grow px-4 py-3">{item.options[1]["statement"]}</div>
                <div className="flex flex-0 items-center justify-center px-2">
                  <div className="w-12 h-16 flex items-center justify-center text-center">
                    <span className="w-10 h-10 rounded-full bg-green-500 border-4 border-green-500 cursor-pointer"></span>
                  </div>
                  <div className="w-12 h-16 flex items-center justify-center text-center">
                    <span className="w-10 h-10 rounded-full border border-green-400 border-opacity-50s cursor-pointer"></span>
                  </div>
                </div>
              </div>
            </div>
          </label>

          <label htmlFor="" className="wrap rounded-lg bg-blue-400 hover:p-1 hover:-m-1 hover:bg-opacity-25">
            <div className="bg-white rounded-lg">
              <div className="flex flex-row items-center bg-gradient-to-r from-red-200 hover:bg-gradient-to-r hover:from-white hover:bg-opacity-25 rounded-lg border border-orange-400 hover:border-blue-400">
                <div className="flex-grow px-4 py-3">{item.options[1]["statement"]}</div>
                <div className="flex flex-0 items-center justify-center px-2">
                  <div className="w-12 h-16 flex items-center justify-center text-center">
                    <span className="w-10 h-10 rounded-full bg-white border border-orange-400 cursor-pointer"></span>
                  </div>
                  <div className="w-12 h-16 flex items-center justify-center text-center">
                    <span className="w-10 h-10 rounded-full bg-red-600 border-4 border-red-600 cursor-pointer"></span>
                  </div>
                </div>
              </div>
            </div>
          </label>

          <label htmlFor="" className="wrap rounded-lg bg-yellow-300s hover:p-1 hover:-m-1 hover:bg-opacity-25">
            <div className="bg-white rounded-lg">
              <div className="flex flex-row items-center bg-green-500 rounded-lg border border-green-500 text-white">
                <div className="flex-grow px-4 py-3">{item.options[2]["statement"]}</div>
                <div className="flex flex-0 items-center justify-center px-2">
                  <div className="w-12 h-16 flex items-center justify-center text-center">
                    <span className="w-10 h-10 rounded-full bg-white cursor-pointer"></span>
                  </div>
                  <div className="w-12 h-16 flex items-center justify-center text-center">
                    <span className="w-10 h-10 rounded-full border border-white hover:bg-yellow-400 cursor-pointer"></span>
                  </div>
                </div>
              </div>
            </div>
          </label>

          <label htmlFor="" className="wrap rounded-lg bg-yellow-300s hover:p-1 hover:-m-1 hover:bg-opacity-25">
            <div className="bg-white rounded-lg">
              <div className="flex flex-row items-center bg-red-500 rounded-lg border border-red-500 text-white">
                <div className="flex-grow px-4 py-3">{item.options[3]["statement"]}</div>
                <div className="flex flex-0 items-center justify-center px-2">
                  <div className="w-12 h-16 flex items-center justify-center text-center">
                    <span className="w-10 h-10 rounded-full border border-white hover:bg-green-500 cursor-pointer"></span>
                  </div>
                  <div className="w-12 h-16 flex items-center justify-center text-center">
                    <span className="w-10 h-10 rounded-full bg-white cursor-pointer"></span>
                  </div>
                </div>
              </div>
            </div>
          </label>
        </div>
         */}
        <br/>
        <pre className="pre mt-16">{JSON.stringify(item, null, 2)}</pre>
      </div>
    </Layout>
  )
}