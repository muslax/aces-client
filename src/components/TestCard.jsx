import Link from 'next/link'
import { useRouter } from 'next/router'
import useSWR, { mutate } from 'swr'
import fetchJson from 'lib/fetchJson'
import { ACESModule } from "lib/modules";
import { getApiUrl, enterTest, startTest } from "lib/utils";

/**
 *
 * @param {Object, Object} param0 module project module
 */
export default function TestCard ({ user, module }) {
  // Extract API path from module's slug
  const path = module?.slug?.substr(0, module?.slug.lastIndexOf('-'))
  const url = `/api/${path}?license=${user?.license}&project=${user?.projectId}&persona=${user?._id}`
  const swrOptions = { refreshInterval: 0, revalidateOnFocus: false }
  const { data: progress } = useSWR(url, fetchJson, swrOptions)
  const acesModule = ACESModule(module?.slug, "info")
  const router = useRouter()

  // p-1 -mx-1

  return (
    <>
    <div key={module?.ref} className="mb-4">
      <div className="mod-box rounded-lg bg-blue-400 bg-opacity-0 hover:bg-opacity-25 hover:-m-1 hover:p-1">
        <div className="mod-box-inner rounded-md bg-gradient-to-r from-blue-100 hover:from-white hover:to-white border border-blue-300 hover:border-blue-500 p-4">
          <div className="flex flex-row items-center">

            <div className="flex-grow text-sm text-gray-700">
              <p className="text-2xl text-blue-600 font-light mb-2">{module?.name}</p>
              <p>
                <span className="inline-block w-24">Jumlah soal</span>
                <span className="">: {acesModule?.items}</span>
              </p>
              <p>
                <span className="inline-block w-24">Waktu</span>
                <span className="">: {acesModule?.maxTime ? acesModule?.maxTime / (1000 * 60) + " menit" : "--" }</span>
              </p>
              <p>
                <span className="inline-block w-24">Status</span>
                <span className="">: {(progress?.done == progress?.items) ? '-' : '-'}</span>
              </p>
            </div>

            <div className="flex flex-col items-center w-1/4 pl-4">
              <div className="mod-status rounded-full bg-blue-400 h-8 w-8 mb-4 flex items-center justify-center">&nbsp;</div>
                <Link href={`/${path}`}>
                  <a onClick={(event) => {
                    event.preventDefault()
                    enterTest(`/api/${path}`, user, progress)
                    router.push(`/${path}`)
                  }} className="mod-link inline-block bg-white rounded border border-gray-400 px-4 py-2 text-gray-500 hover:border-blue-500 hover:bg-blue-500 hover:text-white">Masuk</a>
                </Link>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
      .mod-box:hover > .mod-box-inner {
        background-color: white;
      }
      .mod-box:hover .mod-status {
        background-color: #4299e1;
      }
      .mod-box-inner:hover .mod-link {
        border-width: 1px;
      }
      .mod-box:hover .mod-link {
        color: #4299e1;
        border-color: #63b3ed;
        margin-bottom: 0px
      }
      .mod-box:hover .mod-link:hover {
        color: white;
        border-color: #4299e1;
      }
      `}</style>
    </div>
    {/* <pre className="pre">{JSON.stringify(progress, null, 2)}</pre> */}
    </>
  )
}