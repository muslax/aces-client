import { createContext, memo, useContext, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import useUser, { updateUserPath } from 'lib/useUser'
import fetchJson from 'lib/fetchJson'
import Layout from "components/Layout"
import Header from 'components/Header'
import useSWR, { mutate } from 'swr'

export default function AIMEX() {
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
      {/* <Header /> */}
      <Content />
    </Layout>
  )
})

const TestContext = createContext();

function TestProvider({ user, children }) {
  const url = aimeUrl(user, {fullname: user.fullname})
  const { data: progress, error, mutate: mutateProgress } = useSWR(url, fetchJson)
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

async function enterTest(user, progress) {
  const url = buildApiUrl(user, {}) // Empty license, but OK
  const update = progress?.initiated ? false : true
  await fetchJson(url, {
    method: 'PUT',
      headers: {
        Accept: 'application/json',
      },
      body: JSON.stringify({ action: "init", update: update }),
  })

  const url1 = buildApiUrl(user, { fullname: user.fullname })
  mutate(url1)
}

function About() {
  const { user, progress } = useContext(TestContext)
  const router = useRouter()

  return (
    <div className="text-gray-700 font-light max-w-xl mx-auto">
      <div id="timer" className="hidden" />{/* Timer hack */}
      <h1 className="text-3xl text-center mt-16 mb-6">Tentang Tes Ini</h1>
      <div className="text-sm">
      <p className="my-6">
        Tes ini terdiri dari 136 soal dengan waktu penyelesaian
        rata-rata 45 menit.
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
      <p className="text-center font-normal mt-16">
        <Link href="/aime/guide">
          <a onClick={(event) => {
            event.preventDefault()
            enterTest(user, progress)
            router.push("/aime/guide")
          }} className="rounded border border-green-400 text-lg text-green-500 px-6 py-3 hover:border-green-500 hover:bg-green-500 hover:text-white active:bg-green-700">
            Pentunjuk penyelesaian
          </a>
        </Link>
      </p>
      </div>
    </div>
  )
}

function Content() {
  const { user, project, progress } = useContext(TestContext)
  return (
    <div className="">
      <Header user={user} project={project} type="aime" />
      <About />
      <pre className="pre">{JSON.stringify(progress, null, 2)}</pre>
    </div>
  )
}

function aimeUrl(user, opt) {
  let url = `/api/aime?&project=${user?.projectId}&persona=${user?._id}`
  if (opt.fullname) return `${url}&fullname=${opt.fullname}`;
  else if (opt.something) return `${url}&something=${opt.something}`;

  return url
}