import { useState } from 'react'
import Link from 'next/link'
import useUser from 'lib/useUser'
import fetchJson from 'lib/fetchJson'
import Layout from "components/Layout";
import useSWR from 'swr';

export default function Sample() {
  const [welcome, setWelcome] = useState(true)
  const [access, setAccess] = useState(null)
  const [acctries, setAcctries] = useState(0)
  const [logtries, setLogtries] = useState(0)
  const [accessErrorMsg, setAccessErrorMsg] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const { user } = useUser({ redirectTo: false })
  // const redirect = user?.role ? user?.role : user?.type
  // const { mutateUser } = useUser({ redirectTo: redirect, redirectIfFound: true })

  if (!user) return <div></div>

  return (
    <Layout title="Judul Test">
      <UserBar user={user} />
      <div className="">
        <h1 className="text-3xl text-center font-light mb-6">Petunjuk Mengerjakan Tes</h1>
        <div className="bg-yellow-200 border-l-8 border-red-600 text-sm my-6 px-4 py-4">
        Anda tercatat telah mengerjakan test ini hingga Soal # 17.
        Bila Anda merasa tidak perlu membaca petunjuk ini, silakan langsung
        ke bagian bawah halaman dan menekan (klik/tap) tombol Lanjut.
        </div>
      </div>
    </Layout>
  )
}

const UserBar = ({ user }) => {
  const url = `/api/gpq?license=${user?.license}&projectId=${user?.projectId}&personaId=${user?.personaId}&module=gpq`
  const {data: module} = useSWR(url, fetchJson)




  return (
    <div className="mb-8">
      <div className="flex flex-row text-xs px-1 py-2 pt-3">
        <div className="flex-1 items-center">
          <span className="uppercase tracking-wide sm:tracking-wider md:tracking-widest">{user?.projectTitle}</span>
        </div>
        <div className="flex-grow text-right">
          <span className="font-bold">{user?.fullname}</span>
        </div>
      </div>
      <div className="flex flex-row bg-gray-200 rounded-sm items-center text-gray-700">
        <div className="flex flex-row">
          <p className="px-4 border-r border-white text-gray-800s leading-10 tracking-wide font-semibold">{module?.title}</p>
          <p className="px-2 border-r border-white bg-grays-400 text-swhite leading-10 tracking-wide font-semibold">{module?.items}</p>
          <p className="px-3 border-r border-white bg-grays-600 text-swhite leading-10 tracking-wide font-semibold">18</p>
        </div>
        <div className="flex flex-grow flex-row-reverse leading-10 text-sm text-gray-700">
          <Link href="#">
            <a onClick={async (e) => {
                e.preventDefault()
              }} className="border-l border-white rounded-r-sm px-4 text-center text-gray-600 hover:bg-gray-600 hover:text-white">Pause</a>
          </Link>
        </div>
      </div>
      <div className="flex flex-row text-sm text-gray-700 font-light px-1s py-2 border-b">
        <div className="flex-grow">{module?.description}</div>
        <div className="flex flex-1 flex-row-reverse">
          <span className="w-32 text-right pr-1">320:56 PAUSED</span>
        </div>
      </div>
    </div>
  )
}