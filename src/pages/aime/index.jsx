import { createContext, memo, useContext, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import useUser, { updateUserPath } from 'lib/useUser'
import fetchJson from 'lib/fetchJson'
import Layout from "components/Layout"
import useSWR, { mutate } from 'swr'
import { ACESModule, ACESTestItem, getTestSlug } from "lib/modules";
import { getApiUrl, enterTest, startTest } from "lib/utils";

const BASE_API_URL = "/api/aime"

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
      <Content />
    </Layout>
  )
})

const TestContext = createContext();

function TestProvider({ user, children }) {
  const testType = "aime"
  const testSlug = getTestSlug(user, testType)

  const swrOptions = process.env.NODE_ENV == 'development' ? {
    refreshInterval: 0, revalidateOnFocus: false
  } : { revalidateOnFocus: true }
  // const url = buildApiUrl(user, {fullname: user.fullname})
  const url = getApiUrl(BASE_API_URL, user, {fullname: user.fullname})
  const { data: progress, error, mutate: mutateProgress } = useSWR(url, fetchJson, swrOptions)
  const { data: module } = useSWR(`/api/project?id=${user?.projectId}&modules=${testType}`, fetchJson, swrOptions)
  const acesModule = ACESModule(testSlug, "info")

  return (
    <TestContext.Provider value={{
      user,
      testType, testSlug,
      progress, mutateProgress,
      module, acesModule
    }}>
      {children}
    </TestContext.Provider>
  )
}

async function _enterTest(user, testSlug, progress) {
  // const url = buildApiUrl(user, {slug: testSlug}) // Empty license, but OK
  const url = getApiUrl(BASE_API_URL, user, {slug: testSlug})
  const update = progress?.initiated ? false : true
  await fetchJson(url, {
    method: 'PUT',
      headers: {
        Accept: 'application/json',
      },
      body: JSON.stringify({ action: "init", update: update }),
  })

  // const url1 = buildApiUrl(user, { fullname: user.fullname })
  const mutateUrl = getApiUrl(BASE_API_URL, user, { fullname: user.fullname })
  mutate(mutateUrl)
}

function About() {
  const { user, progress } = useContext(TestContext)

  return (
    <div>
      {progress?.done > 0 && (
        <div className="px-8 py-6 -mt-8 bg-gradient-to-b from-orange-100 border-b border-orange-200">
          {/* <div className="rounded-l-sm bg-yellows-200 bg-gradient-to-r from-yellow-200 text-sm border-l-8 border-orange-400 my-6"> */}
          <div className="max-w-3xl mx-auto">
            <div className="text-sms text-center text-orange-700 tracking-wide font-light">
            Anda tercatat sudah mengerjakan test ini hingga{` `}
            <span className="font-semibold">Nomor {progress?.done}</span>.
            </div>
          </div>
        </div>
      )}
      <div className="text-gray-700 font-light max-w-xl mx-auto">
        <div id="timer" className="hidden" />{/* Timer hack */}



        <h1 className="text-3xl text-center mt-12 mb-6">Petunjuk Mengerjakan</h1>
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

        </div>
      </div>
    </div>
  )
}

function Header() {
  const { user, progress, module } = useContext(TestContext)

  return (
    <div className="mb-8 text-gray-700">
      <div className="flex flex-col text-xs px-1 py-3 pt-4">
        <div className=" text-xs text-center uppercase tracking-wide sm:tracking-wider md:tracking-widest">
          <span id="companyName" className="font-bold">{user ? user.projectTitle : '...'}</span>
          <span className="px-2">|</span>
          <span className="">{user ? user.company : '...'}</span>
        </div>
      </div>

      <div className="flex flex-row bg-yellow-400 rounded-md items-center text-sm leading-10 px-4">
        <div className="flex flex-grow flex-row font-semibold">
          <span>{module ? module.name : '...'}</span>
        </div>
        <div className="flex flex-0 text-right pl-3 font-bold">
          {/* <span className=" bg-yellow-600 bg-opacity-25 px-3 border-l border-r border-yellow-500">{progress ? (progress.done + 1) : '-'}</span> */}
          <span className="pl-3">{progress ? progress.items : '-'}</span>
        </div>
      </div>

      <div className="flex flex-row text-sm text-gray-700 font-light px-2 py-2 border-b border-orange-300">
        <div className="flex-grow font-semibold">{user ? user.fullname : '...'}</div>
        <div className="flex-1 text-right text-xs font-mono">
          <div id="timer" className="mr-2">&nbsp;</div>
        </div>
      </div>
    </div>
  )
}

function Content() {
  const { user, progress, module, acesModule,testType, testSlug } = useContext(TestContext)
  const item = ACESTestItem(testSlug, 2)
  const router = useRouter()

  return (
    <div className="">
      <Header />
      {/* <p>{testType}:{testSlug}:{process.env.NODE_ENV}</p> */}
      <About />
      {/* <pre className="pre">{JSON.stringify(item, null, 2)}</pre> */}
      <p className="text-center font-normal mt-16">
          <Link href="/aime/steps">
            <a onClick={(event) => {
              event.preventDefault()
              startTest(BASE_API_URL, user, progress)
              router.push("/aime/steps")
            }} className="rounded border border-green-400 text-lg text-green-500 px-6 py-3 hover:border-green-500 hover:bg-green-500 hover:text-white active:bg-green-700">
              Mulai Mengerjakan
            </a>
          </Link>
        </p>
    </div>
  )
}