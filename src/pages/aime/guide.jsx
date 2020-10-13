import { createContext, memo, useContext, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import useUser, { updateUserPath } from 'lib/useUser'
import fetchJson from 'lib/fetchJson'
import Layout from "components/Layout";
import useSWR, { mutate } from 'swr';
import Header from "components/Header";

export default function AimeGuide() {
  const { user } = useUser({ redirectTo: "/" })

  if (!user || !user.isLoggedIn) return <div></div>

  return (
    <TestProvider user={user}>
      <PageContent />
    </TestProvider>
  )
}

const PageContent = memo(() => {
  return (
    <Layout title="AIME">
      <Content />
    </Layout>
  )
})

const TestContext = createContext();

function TestProvider({ user, children }) {
  const url = buildApiUrl(user, {fullname: user.fullname})
  const { data: progress, mutate: mutateProgress } = useSWR(url, fetchJson)
  const { data: project } = useSWR(`/api/project?id=${user?.projectId}`, fetchJson)

  return (
    <TestContext.Provider value={{
      user,
      project,
      progress, mutateProgress,
    }}>
      {children}
    </TestContext.Provider>
  )
}

function buildApiUrl(user, opt) {
  let url = `/api/aime?license=${user?.license}&project=${user?.projectId}&persona=${user?._id}`
  if (opt.fullname) return `${url}&fullname=${opt.fullname}`;
  else if (opt.something) return `${url}&something=${opt.something}`;

  return url
}

async function startTest(user, progress) {
  const url = buildApiUrl(user, {}) // Empty license, but OK
  const update = progress?.started ? false : true
  await fetchJson(url, {
    method: 'PUT',
      headers: {
        Accept: 'application/json',
      },
      body: JSON.stringify({ action: "start", update: update }),
  })

  const url1 = buildApiUrl(user, { fullname: user.fullname })
  mutate(url1)
}

function Guide() {
  const { user, progress } = useContext(TestContext)
  const router = useRouter()

  return (
    <div className="text-gray-700 font-light max-w-xl mx-auto">
      <div id="timer" className="hidden" />{/* Timer hack */}
      <h1 className="text-3xl text-center mt-16 mb-6">Pentunjuk Penyelesaian</h1>

      {progress?.done > 0 && (
        <div className="rounded-l-sm bg-yellows-200 bg-gradient-to-r from-yellow-200 text-sm border-l-8 border-orange-400 my-6">
          <div className="rounded-r-sm border border-yellow-300 p-4">
          Anda tercatat pernah mengerjakan test ini hingga{` `}
          <span className="font-semibold">Nomor {progress?.done}</span>.
          Bila Anda merasa sudah memahami petunjuk ini, Anda dapat langsung
          mulai melanjutkan dengan menekan tombol Lanjut di
          bagian bawah halaman.
          </div>
        </div>
      )}

      <div className="text-sm">
      <p className="my-6">
        Untuk setiap pernyataan dari <span className="text-orange-500 font-normal">136</span>{` `}
        pernyataan, Anda diminta memberikan tingkat persetujuan, dari{` `}
        <span className="text-orange-500 font-normal">sangat setuju</span> hingga{` `}
        <span className="text-orange-500 font-normal">sangat tidak setuju</span>.
      </p>
      <p className="my-6">
      Setiap pernyataan akan ditampilkan secara berurutan, satu per satu,{` `}
      dilengkapi dengan lima tombol persetujuan seperti dalam gambar berikut ini.
      </p>
      <p className="my-6 text-center">[GAMBAR]</p>
      <p className="my-6">
        Anda dapat mengubah pilihan persetujuan sebelum menekan tombol{` `}
        <span className="text-black font-normal">Lanjut</span> yang akan{` `}
        menampilkan pernyataan berikutnya.
      </p>
      <p className="my-6">
      Elit rhoncus adipiscing facilisis efficitur vitae consectetur orci consequat,
      pellentesque est sem blandit tristique curabitur vulputate ultricies, senectus
      enim risus hac mollis dapibus in magnis, arcu tincidunt lectus maximus conubia
      porttitor integer. Ipsum vel suspendisse tempor maximus mauris in blandit
      interdum quisque a, platea laoreet convallis elementum ad penatibus est luctus
       ex felis, vehicula magna duis quam hendrerit eros aenean finibus nisi,
       tincidunt ridiculus eu magnis semper rutrum diam turpis mi. Proin pellentesque
        dignissim quis vehicula ligula cubilia egestas hac mi, lectus fringilla
        faucibus lacus primis consequat convallis nascetur accumsan, senectus at sem
        lacinia imperdiet conubia fusce auctor, ac urna purus bibendum viverra
        tincidunt blandit duis.
      </p>
      <p className="text-center font-normal mt-16 mb-8">
        <Link href="/aime/steps">
          <a onClick={(event) => {
            event.preventDefault()
            startTest(user, progress)
            router.push("/aime/steps")
          }} className="rounded border border-green-400 text-lg text-green-500 px-6 py-3 hover:border-green-500 hover:bg-green-500 hover:text-white active:bg-green-700">
            Siap mengerjakan
          </a>
        </Link>
      </p>
      </div>
      <pre className="pre my-6">PROGRESS: {JSON.stringify(progress, null, 2)}</pre>
      <pre className="pre my-6">{JSON.stringify(user, null, 2)}</pre>
    </div>
  )
}

function Content() {
  const { user, project, progress } = useContext(TestContext)
  return (
    <div className="">
      <Header user={user} project={project} type="aime" />
      <Guide />
    </div>
  )
}