import { useState } from 'react'
import Link from 'next/link'
import useUser from 'lib/useUser'
import fetchJson from 'lib/fetchJson'
import Layout from "components/Layout";

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

  return (
    <Layout title="Joko Dolan">
      <UserBar />
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

const UserBar = ({ user }) => (
  <div className="mb-8">
    <div className="flex flex-row text-xs px-1 py-2 pt-3">
      <div className="flex-1 items-center">
        <span className="uppercase tracking-wide sm:tracking-wider md:tracking-widest">Asesmen Kinerja 2020</span>
      </div>
      <div className="flex-grow text-right">
        <span>Agus Mardiyah</span>
      </div>
    </div>
    <div className="flex flex-row bg-gray-200 rounded-sm items-center text-gray-700">
      <p className="pl-4 pr-6 border-r text-gray-800s leading-10 tracking-wide font-semibold">PPK</p>
      <p className="flex-grow text-gray-600 leading-10 text-sm text-right text-gray-700">
        <span className="mr-4">Pengukuran Preferensi Kerja</span>
      </p>
    </div>
    <div className="hidden text-sm text-centers text-gray-700 font-light px-1s py-2 border-b">
    Pengukuran Preferensi Kerja
    </div>
  </div>
)