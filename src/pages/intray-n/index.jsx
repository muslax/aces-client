import { createContext, memo, useContext, useState } from 'react'
import useUser, { updateUserPath } from 'lib/useUser'
import fetchJson from 'lib/fetchJson'
import LayoutIntray from "components/LayoutIntray";
import useSWR, { mutate } from 'swr';
import { getApiUrl, sequenceArray, msToTimeString } from "lib/utils";
import { ACESModule, ACESTestItem, getTestSlug } from "lib/modules";
import { Intray2Body, Intray2Template } from "lib/evidence";
import { func } from 'prop-types';

const BASE_API_URL = "/api/intray-n"
const MAX_TAB_NUM = 9

export default function  Intray() {
  const { user } = useUser({ redirectTo: "/" })

  if (!user || !user.isLoggedIn) return <div></div>

  return (
    <TestProvider user={user}>
      <PageContent />
    </TestProvider>
  )
}

export const PageContent = memo(() => {
  return (
    <LayoutIntray title="Joko Lodang">
      <Content />
    </LayoutIntray>
  )
})

const TestContext = createContext();

function TestProvider({ user, children }) {
  const testSlug = "intray-n"
  const [tab, setTab] = useState(1)
  const [prevTab, setPrevTab] = useState(0)
  const [lastTab, setLastTab] = useState(0)
  const [visitStack, setVisitStack] = useState([])

  const [task1, setTask1] = useState({ t1: "", t2: "", t3: "" })
  const [task2, setTask2] = useState({ t1: "", t2: "", t3: "", t4: "", t5: "" })
  const [task3, setTask3] = useState({ t1: "", t2: "", t3: "", t4: "", t5: "" })
  const [task4, setTask4] = useState({ t1: "", t2: "", t3: "", t4: "", p1: "", p2: "", p3: "", p4: "" })
  const [task5, setTask5] = useState({ i1: "", i2: "", i3: "", i4: "", i5: "" })
  const [task6, setTask6] = useState({ u1: "", u2: "", u3: "", u4: "", u5: "" })
  const [task7, setTask7] = useState({ u1: "", u2: "", u3: "", u4: "", a1: "", a2: "", a3: "", a4: "" })
  const [task8, setTask8] = useState({ w1: "", e1: "", e2: "", t1: "", t2: "" })
  const [task9, setTask9] = useState({ u1: "", u2: "", u3: "", u4: "", u5: "" })

  const swrOptions = process.env.NODE_ENV == 'development' ? {
    refreshInterval: 0, revalidateOnFocus: false
  } : { revalidateOnFocus: true }

  return (
    <TestContext.Provider value={{
      user,
      testSlug,
      tab, setTab,
      prevTab, setPrevTab,
      lastTab, setLastTab,
      // currentTask, setCurrentTask,
      // biggestTabNum, setBiggestTabNum,
      visitStack, setVisitStack,
      task1, setTask1,
      task2, setTask2,
      task3, setTask3,
      task4, setTask4,
      task5, setTask5,
      task6, setTask6,
      task7, setTask7,
      task8, setTask8,
      task9, setTask9,
    }}>
      {children}
    </TestContext.Provider>
  )
}

function Header() {
  const { user, tab, setTab, lastTab, setPrevTab } = useContext(TestContext)

  function handleClick(e) {
    e.preventDefault()
    const n = parseInt(e.target.value)

    // Skipping prohibitet
    if (n > lastTab) return false

    // Provide prev state
    setPrevTab(tab)


    setTab(n)
    window.scrollTo(0, 0)
  }

  const navWaiting = "WAITING w-full h-12 text-gray-400 whitespace-no-wrap uppercase hover:bg-gray-100 cursor-default"
  const navPast = "PAST w-full h-12 whitespace-no-wrap uppercase text-gray-700 hover:text-teal-600 hover:bg-teal-100"
  const navCurrent = "CURRENT w-full h-12 whitespace-no-wrap uppercase bg-teal-500 border-b border-teal-600 text-white cursor-default"
  const navPastCurrent = "PAST-CURRENT w-full h-12 whitespace-no-wrap uppercase bg-teal-500 border-b border-teal-600 text-white cursor-default"

  function whichClass(n) {
    //
    if (n == tab) return navCurrent
    else if (n > lastTab) return navWaiting

    return navPast
  }

  return (
    <div className="text-gray-700">
      <div className="flex flex-col text-xs px-1 py-3 pt-4">
        <div className=" text-xs text-center uppercase tracking-wide sm:tracking-wider md:tracking-widest">
          <span id="companyName" className="font-bold">Proyek Angkasa Laut</span>
          <span className="px-2">|</span>
          <span className="">PT Abhisek Lumberger</span>
        </div>
      </div>

      <div className="flex flex-row border-t border-b border-gray-400 items-center text-sm leading-10">
        <div className="flex flex-grow flex-row uppercase font-bold">
          <span className="w-22 sm:w-32 text-lg text-center tracking-widest">Intray</span>
          <span className="px-4 border-l border-gray-400">2020</span>
        </div>
        <div className="flex flex-0 pl-4 border-ls border-gray-400 font-bold">
          <span className="w-32s  pl-4s">{user?.fullname}</span>
        </div>
      </div>

      <div id="intray-tabs" className="bg-white border-b border-gray-400 z-50">
        <div className="container mx-auto">
          <div id="container-inner">
            <div className="flex flex-row items-center text-sm text-gray-700 font-light">
              <div className="flex flex-1 md:flex">
                <div id="" className="w-22 sm:w-32 pb-1s text-center text-gray-700 leading-10 tracking-wide">
                  <span className="not-scrolled block pb-1">Penugasan</span>
                  <span className="scrolled hidden text-lg text-center uppercase font-bold tracking-wide">Intray</span>
                </div>
              </div>
              <div className="flex flex-grow justify-center w-full">
                <div className="w-full border-l border-gray-400">
                  <ul className="grid grid-cols-9 gap-0 text-xs md:text-sm text-gray-500 py-3s">
                    <li className="flex min-w-tab items-center justify-center">
                      <button onClick={e => handleClick(e)} value="1" className={whichClass(1)}>Bab 1</button>
                    </li>
                    <li className="flex min-w-tab items-center justify-center">
                      <button onClick={e => handleClick(e)} value="2" className={whichClass(2)}>Bab 2</button>
                    </li>
                    <li className="flex min-w-tab items-center justify-center">
                      <button onClick={e => handleClick(e)} value="3" className={whichClass(3)}>Bab 3</button>
                    </li>
                    <li className="flex min-w-tab items-center justify-center">
                      <button onClick={e => handleClick(e)} value="4" className={whichClass(4)}>Bab 4</button>
                    </li>
                    <li className="flex min-w-tab items-center justify-center">
                      <button onClick={e => handleClick(e)} value="5" className={whichClass(5)}>Bab 5</button>
                    </li>
                    <li className="flex min-w-tab items-center justify-center">
                      <button onClick={e => handleClick(e)} value="6" className={whichClass(6)}>Bab 6</button>
                    </li>
                    <li className="flex min-w-tab items-center justify-center">
                      <button onClick={e => handleClick(e)} value="7" className={whichClass(7)}>Bab 7</button>
                    </li>
                    <li className="flex min-w-tab items-center justify-center">
                      <button onClick={e => handleClick(e)} value="8" className={whichClass(8)}>Bab 8</button>
                    </li>
                    <li className="flex min-w-tab items-center justify-center">
                      <button onClick={e => handleClick(e)} value="9" className={whichClass(9)}>Bab 9</button>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="flex-1 hidden md:flex text-right font-semibold">
                <div className="w-10 text-right">&nbsp;</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Entry({ title, placeholder, fn, task, item, disabled = false, height = 4 }) {
  const eTitle = title ? title : 'Aku perlu judul, bang...'

  const labelActive = "block w-full rounded-t bg-blue-100 text-sm text-blue-600 font-semibold px-4 py-2 border border-blue-300"
  const labelDisabled = "block w-full rounded-t bg-gray-100 text-sm text-gray-600 font-semibold px-4 py-2 border border-gray-400"
  const textareaHeight = height == 1 ? "textarea-h1" : "textarea-h4"
  const textActive = `${textareaHeight} w-full bg-gray-100 text-sm appearance-none rounded-b border-b border-l border-r border-blue-300 py-2 pb-0 px-4 focus:outline-none focus:bg-white`
  const textDisabled = `${textareaHeight} w-full bg-gray-100 text-blue-800 text-sm appearance-none rounded-b border-b border-l border-r border-gray-400 py-2 pb-0 px-4 focus:outline-none focus:bg-white`

  function handleChange(e) {
    fn({...task, [item]: e.target.value })
  }

  const myval = task[item]
  // const saved = myval.length > 0

  return (
    <div className="my-6">
      <label className={disabled ? labelDisabled : labelActive}>
        {disabled && (
          <svg className="h-4 mt-1 -mr-1 float-right bg-transparent fill-current w-auto mt-1s" tmp="486.733 486.733" viewBox="0 0 486.733 486.733" xmlns="http://www.w3.org/2000/svg">
            <path d="M403.88,196.563h-9.484v-44.388c0-82.099-65.151-150.681-146.582-152.145c-2.225-0.04-6.671-0.04-8.895,0
C157.486,1.494,92.336,70.076,92.336,152.175v44.388h-9.485c-14.616,0-26.538,15.082-26.538,33.709v222.632
c0,18.606,11.922,33.829,26.539,33.829h321.028c14.616,0,26.539-15.223,26.539-33.829V230.272
C430.419,211.646,418.497,196.563,403.88,196.563z M273.442,341.362v67.271c0,7.703-6.449,14.222-14.158,14.222H227.45
c-7.71,0-14.159-6.519-14.159-14.222v-67.271c-7.477-7.36-11.83-17.537-11.83-28.795c0-21.334,16.491-39.666,37.459-40.513
c2.222-0.09,6.673-0.09,8.895,0c20.968,0.847,37.459,19.179,37.459,40.513C285.272,323.825,280.919,334.002,273.442,341.362z
M331.886,196.563h-84.072h-8.895h-84.072v-44.388c0-48.905,39.744-89.342,88.519-89.342c48.775,0,88.521,40.437,88.521,89.342
V196.563z"/>
          </svg>
        )}
        <span>{eTitle}</span>
      </label>
      {disabled && <textarea value={myval} disabled placeholder={placeholder ? placeholder : "Tulis di sini..."} className={textDisabled}></textarea>}
      {!disabled && <textarea value={myval} onChange={e => handleChange(e)} placeholder={placeholder ? placeholder : "Tulis di sini..."} className={textActive}></textarea>}
    </div>
  )
}

function truncate(text) {
  if (text.length > 75) return text.substr(0, 70) + " [...]"
  return text
}

function Debug({ states, show }) {
  if (!show) return (<></>)

  // [label, text]
  return (
    <div className="text-xs text-red-500 mt-8">
      <p className="pb-1 border-b mb-1">DEBUG</p>
      {states.map(s => (
        <p key={s[0]} className="pb-1 border-b mb-1">
          <span className="inline-block w-8 text-black">{s[0]}:</span>
          <span>{truncate(s[1])}</span>
        </p>
      ))}
    </div>
  )
}

function TabSubmitter({ task, mutate, currentTabNum }) {
  const { setTab, prevTab, setPrevTab, lastTab, setLastTab } = useContext(TestContext)
  const [submittable, setSubmittable] = useState(false)

  const checkNormal = "block mx-auto text-gray-600 text-sm text-center font-semibolds hover:text-blue-500 cursor-pointer"
  const checkChecked = "block mx-auto text-blue-600 text-sm text-center font-semibolds cursor-pointer"
  const btnActive = "rounded border-2 border-green-400 text-lg text-green-500 px-6 py-3 hover:border-green-500 hover:bg-green-500 hover:text-white active:bg-green-700"
  const btnDisabled = "rounded border-2 text-lg text-gray-400 px-6 py-3"

  function handleChange(e) {
    if (e.target.checked) {
      document.getElementById("confirmLabel").className = checkChecked
      setSubmittable(true)
    } else {
      document.getElementById("confirmLabel").className = checkNormal
      setSubmittable(false)
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()

    console.log("handleSubmit()")
    console.log(task)

    // Mark task as saved
    mutate({...task, ["saved"]: true})

    setPrevTab(currentTabNum) // memorize

    if (lastTab < currentTabNum) setLastTab(currentTabNum)

    if (currentTabNum < MAX_TAB_NUM) setTab(currentTabNum + 1)

    window.scrollTo(0, 0)
  }

  return (
    <div>
      <form id="form" onSubmit={handleSubmit} className="max-w-2xl mx-auto">
        <p className={(submittable ? 'text-gray-500' : 'text-pink-500') + ' text-sm text-center font-light mt-8 mb-3'}>Pastikan Anda sudah menuliskan cukup jawaban untuk seluruh tugas di bagian ini.</p>
        <div className="flex justify-items-center">
          <label id="confirmLabel" htmlFor="confirm" className={checkNormal}>
            <input onChange={e => handleChange(e)} type="checkbox" id="confirm" className="text-3xl mr-4"/>
            Saya sudah menuliskan cukup jawaban.
          </label>
        </div>
        <p className="text-center mt-8">
          {submittable && <button id="submit" type="submit" className={btnActive}>Simpan dan lanjutkan</button>}
          {!submittable && <button id="submit" type="submit" disabled className={btnDisabled}>Simpan dan lanjutkan</button>}
        </p>
      </form>
    </div>
  )
}

function setCurrentTab(n) {
  const { setTab, lastTab, setLastTab } = useContext(TestContext)
  setTab(n)

  if (lastTab < n) setLastTab(n)
  return n;
}

function TAB1({ debug }) {
  const tabNum = setCurrentTab(1)
  // const tabNum = 1
  const { task1, setTask1 } = useContext(TestContext)
  const saved = task1.saved ? true : false
  const _debug = [
    ["T1", task1.t1],
    ["T2", task1.t2],
    ["T3", task1.t3],
  ]

  return (
    <div className="relative">
      <h1 className="text-center text-teal-500 text-2xl font-bold uppercase py-8">Bab 1</h1>

      <div className="situasi bg-orange-100 border-t border-orange-200">
        <div className="px-6 py-10">
          <div className="max-w-2xl mx-auto text-gray-700">
            <h1 className="text-xl font-bold mb-6">Situasi</h1>
            <p className="my-6">
            Pretium pharetra ornare facilisi urna hendrerit efficitur suscipit laoreet accumsan, molestie dictumst velit mus aptent mi nam consequat per, curabitur posuere phasellus proin iaculis rhoncus ligula in, egestas penatibus augue taciti habitasse elit mollis pulvinar. In lacinia aliquet bibendum nullam massa dictum sapien suscipit neque, vivamus morbi consequat quam urna vestibulum senectus pulvinar nec, vitae cursus rhoncus fringilla augue elit aliquam curabitur, hac iaculis adipiscing velit gravida ridiculus felis magnis. Etiam ante massa consequat mus ligula laoreet lacinia integer, suscipit justo imperdiet aptent potenti volutpat netus ultrices, interdum vitae dictum class proin tempor conubia enim sodales, hac tellus erat mauris luctus id aliquet.
            </p>
            <p className="my-6">
            Gravida fringilla porttitor molestie ligula dolor hendrerit laoreet litora elementum tristique urna, odio in nulla convallis nullam tortor himenaeos facilisi finibus lacus non sociosqu, auctor massa facilisis vivamus luctus metus morbi sapien est amet. Ipsum semper sodales eu senectus magnis tellus blandit lobortis augue, libero montes penatibus laoreet purus dolor felis volutpat aenean, faucibus magna velit donec potenti per etiam proin massa, lectus ultrices sem lorem nisi suspendisse litora vel. Imperdiet amet non enim rhoncus est diam leo fames tempus, integer ullamcorper lacus ante augue duis varius egestas sit, penatibus eu netus consectetur praesent vel primis aptent in nulla, facilisis ad sem nam nec erat morbi tristique. Aenean faucibus convallis cursus euismod mollis nulla curabitur est, orci fringilla ut consectetur eu hendrerit placerat neque, velit odio sapien accumsan natoque molestie dictum diam, eleifend sit aptent at quisque congue rhoncus.
            </p>
          </div>
        </div>
      </div>

      <div className="grad absolute z-0 w-full h-24-rem border-t border-pink-200 bg-gradient-to-b from-green-200 opacity-25"></div>

      <div className="tugas relative z-40 border-t border-orange-200">
        <div className="px-6 pt-10 pb-1">
          <div className="max-w-2xl mx-auto text-gray-700">
            <h1 className="text-xl font-bold mb-6">Tugas</h1>
            <p className="my-6">
            Pretium pharetra ornare facilisi urna hendrerit efficitur suscipit laoreet accumsan, molestie dictumst velit mus aptent mi nam consequat per, curabitur posuere phasellus proin iaculis rhoncus ligula in, egestas penatibus augue taciti habitasse elit mollis pulvinar. In lacinia aliquet bibendum nullam massa dictum sapien suscipit neque, vivamus morbi consequat quam urna vestibulum senectus pulvinar nec, vitae cursus rhoncus fringilla augue elit aliquam curabitur, hac iaculis adipiscing velit gravida ridiculus felis magnis. Etiam ante massa consequat mus ligula laoreet lacinia integer, suscipit justo imperdiet aptent potenti volutpat netus ultrices, interdum vitae dictum class proin tempor conubia enim sodales, hac tellus erat mauris luctus id aliquet.
            </p>
          </div>
        </div>
      </div>

      <div className="px-6">
        <div className="max-w-2xl mx-auto text-gray-700">
          <Entry title="Tahap 1 - Analisis kepentingan" placeholder={"Hora hayen"} fn={setTask1} task={task1} item="t1" disabled={saved} />
          <Entry title="Tahap 2 - Topik paling penting" placeholder={"Hora hayen"} fn={setTask1} task={task1} item="t2" disabled={saved} />
          <Entry title="Tahap 3 - Alasan mengapa topik palin penting" placeholder={"Hora hayen"} fn={setTask1} task={task1} item="t3" disabled={saved} />
        </div>
        <Debug states={_debug} show={debug} />
      </div>

      {!saved && <TabSubmitter task={task1} mutate={setTask1} currentTabNum={tabNum} />}
    </div>
  )
}

function TAB2({ debug }) {
  const tabNum = setCurrentTab(2)
  const { task2, setTask2 } = useContext(TestContext)
  const saved = task2.saved ? true : false
  const _debug = [
    ["T1", task2.t1],
    ["T2", task2.t2],
    ["T3", task2.t3],
    ["T4", task2.t4],
    ["T5", task2.t5],
  ]

  return (
    <div className="relative">
      <h1 className="text-center text-teal-500 text-2xl font-bold uppercase py-8">Bab 2</h1>

      <div className="situasi bg-orange-100 border-t border-orange-200">
        <div className="px-6 py-10">
          <div className="max-w-2xl mx-auto text-gray-700">
            <h1 className="text-xl font-bold mb-6">Situasi</h1>
            <p className="my-6">
            In lacinia aliquet bibendum nullam massa dictum sapien suscipit neque, vivamus morbi consequat quam urna vestibulum senectus pulvinar nec, vitae cursus rhoncus fringilla augue elit aliquam curabitur, hac iaculis adipiscing velit gravida ridiculus felis magnis. Etiam ante massa consequat mus ligula laoreet lacinia integer, suscipit justo imperdiet aptent potenti volutpat netus ultrices, interdum vitae dictum class proin tempor conubia enim sodales, hac tellus erat mauris luctus id aliquet.
            </p>
            <p className="my-6">
            Aenean faucibus convallis cursus euismod mollis nulla curabitur est, orci fringilla ut consectetur eu hendrerit placerat neque, velit odio sapien accumsan natoque molestie dictum diam, eleifend sit aptent at quisque congue rhoncus.
            </p>
          </div>
        </div>
      </div>

      <div className="grad absolute z-0 w-full h-64 border-t border-pink-200 bg-gradient-to-b from-orange-100 opacity-50"></div>

      <div className="tugas relative z-40 border-t border-orange-200">
        <div className="px-6 pt-10 pb-1">
          <div className="max-w-2xl mx-auto text-gray-700">
            <h1 className="text-xl font-bold mb-6">Tugas</h1>
            <p className="my-6">
            Pretium pharetra ornare facilisi urna hendrerit efficitur suscipit laoreet accumsan, molestie dictumst velit mus aptent mi nam consequat per, curabitur posuere phasellus proin iaculis rhoncus ligula in, egestas penatibus augue taciti habitasse elit mollis pulvinar. In lacinia aliquet bibendum nullam massa dictum sapien suscipit neque, vivamus morbi consequat quam urna vestibulum senectus pulvinar nec, vitae cursus rhoncus fringilla augue elit aliquam curabitur, hac iaculis adipiscing velit gravida ridiculus felis magnis. Etiam ante massa consequat mus ligula laoreet lacinia integer, suscipit justo imperdiet aptent potenti volutpat netus ultrices, interdum vitae dictum class proin tempor conubia enim sodales, hac tellus erat mauris luctus id aliquet.
            </p>
          </div>
        </div>
      </div>

      <div className="px-6">
        <div className="max-w-2xl mx-auto text-gray-700">
          <Entry title="Tindakan/inisiatif 1" placeholder={"Ketik jawaban Anda di sini"} fn={setTask2} task={task2} item="t1" disabled={saved} />
          <Entry title="Tindakan/inisiatif 2" placeholder={"Ketik jawaban Anda di sini"} fn={setTask2} task={task2} item="t2" disabled={saved} />
          <Entry title="Tindakan/inisiatif 3" placeholder={"Ketik jawaban Anda di sini"} fn={setTask2} task={task2} item="t3" disabled={saved} />
          <Entry title="Tindakan/inisiatif 4" placeholder={"Ketik jawaban Anda di sini"} fn={setTask2} task={task2} item="t4" disabled={saved} />
          <Entry title="Tindakan/inisiatif 5" placeholder={"Ketik jawaban Anda di sini"} fn={setTask2} task={task2} item="t5" disabled={saved} />
        </div>
        <Debug states={_debug} show={debug} />
        {!saved && <TabSubmitter task={task2} mutate={setTask2} currentTabNum={tabNum} />}
      </div>
    </div>
  )
}

function TAB3({ debug }) {
  const tabNum = setCurrentTab(3)
  const { task3, setTask3 } = useContext(TestContext)
  const saved = task3.saved ? true : false
  const _debug = [
    ["T1", task3.t1],
    ["T2", task3.t2],
    ["T3", task3.t3],
    ["T4", task3.t4],
    ["T5", task3.t5],
  ]

  return (
    <div className="relative">
      <h1 className="text-center text-teal-500 text-2xl font-bold uppercase py-8">Bab 3</h1>

      <div className="situasi bg-orange-100 border-t border-orange-200">
        <div className="px-6 py-10">
          <div className="max-w-2xl mx-auto text-gray-700">
            <h1 className="text-xl font-bold mb-6">Situasi</h1>
            <p className="my-6">
            In lacinia aliquet bibendum nullam massa dictum sapien suscipit neque, vivamus morbi consequat quam urna vestibulum senectus pulvinar nec, vitae cursus rhoncus fringilla augue elit aliquam curabitur, hac iaculis adipiscing velit gravida ridiculus felis magnis. Etiam ante massa consequat mus ligula laoreet lacinia integer, suscipit justo imperdiet aptent potenti volutpat netus ultrices, interdum vitae dictum class proin tempor conubia enim sodales, hac tellus erat mauris luctus id aliquet.
            </p>
            <p className="my-6">
            Aenean faucibus convallis cursus euismod mollis nulla curabitur est, orci fringilla ut consectetur eu hendrerit placerat neque, velit odio sapien accumsan natoque molestie dictum diam, eleifend sit aptent at quisque congue rhoncus.
            </p>
          </div>
        </div>
      </div>

      <div className="grad absolute z-0 w-full h-64 border-t border-pink-200 bg-gradient-to-b from-orange-100 opacity-50"></div>

      <div className="tugas relative z-40 border-t border-orange-200">
        <div className="px-6 pt-10 pb-1">
          <div className="max-w-2xl mx-auto text-gray-700">
            <h1 className="text-xl font-bold mb-6">Tugas</h1>
            <p className="my-6">
            Pretium pharetra ornare facilisi urna hendrerit efficitur suscipit laoreet accumsan, molestie dictumst velit mus aptent mi nam consequat per, curabitur posuere phasellus proin iaculis rhoncus ligula in, egestas penatibus augue taciti habitasse elit mollis pulvinar. In lacinia aliquet bibendum nullam massa dictum sapien suscipit neque, vivamus morbi consequat quam urna vestibulum senectus pulvinar nec, vitae cursus rhoncus fringilla augue elit aliquam curabitur, hac iaculis adipiscing velit gravida ridiculus felis magnis. Etiam ante massa consequat mus ligula laoreet lacinia integer, suscipit justo imperdiet aptent potenti volutpat netus ultrices, interdum vitae dictum class proin tempor conubia enim sodales, hac tellus erat mauris luctus id aliquet.
            </p>
          </div>
        </div>
      </div>

      <div className="px-6">
        <div className="max-w-2xl mx-auto text-gray-700">
          <Entry title="Tindakan/inisiatif 1" placeholder={"Ketik jawaban Anda di sini"} fn={setTask3} task={task3} item="t1" disabled={saved} />
          <Entry title="Tindakan/inisiatif 2" placeholder={"Ketik jawaban Anda di sini"} fn={setTask3} task={task3} item="t2" disabled={saved} />
          <Entry title="Tindakan/inisiatif 3" placeholder={"Ketik jawaban Anda di sini"} fn={setTask3} task={task3} item="t3" disabled={saved} />
          <Entry title="Tindakan/inisiatif 4" placeholder={"Ketik jawaban Anda di sini"} fn={setTask3} task={task3} item="t4" disabled={saved} />
          <Entry title="Tindakan/inisiatif 5" placeholder={"Ketik jawaban Anda di sini"} fn={setTask3} task={task3} item="t5" disabled={saved} />
        </div>
        <Debug states={_debug} show={debug} />
        {!saved && <TabSubmitter task={task3} mutate={setTask3} currentTabNum={tabNum} />}
      </div>
    </div>
  )
}

function TAB4({ debug }) {
  const tabNum = setCurrentTab(4)
  const { task4, setTask4 } = useContext(TestContext)
  const saved = task4.saved ? true : false
  const _debug = [
    ["T1", task4.t1],
    ["T2", task4.t2],
    ["T3", task4.t3],
    ["T4", task4.t4],
    ["P1", task4.p1],
    ["P2", task4.p2],
    ["P3", task4.p3],
    ["P4", task4.p4],
  ]

  return (
    <div className="relative">
      <h1 className="text-center text-teal-500 text-2xl font-bold uppercase py-8">Bab 4</h1>

      <div className="situasi bg-orange-100 border-t border-orange-200">
        <div className="px-6 py-10">
          <div className="max-w-2xl mx-auto text-gray-700">
            <h1 className="text-xl font-bold mb-6">Situasi</h1>
            <p className="my-6">
            In lacinia aliquet bibendum nullam massa dictum sapien suscipit neque, vivamus morbi consequat quam urna vestibulum senectus pulvinar nec, vitae cursus rhoncus fringilla augue elit aliquam curabitur, hac iaculis adipiscing velit gravida ridiculus felis magnis. Etiam ante massa consequat mus ligula laoreet lacinia integer, suscipit justo imperdiet aptent potenti volutpat netus ultrices, interdum vitae dictum class proin tempor conubia enim sodales, hac tellus erat mauris luctus id aliquet.
            </p>
            <p className="my-6">
            Aenean faucibus convallis cursus euismod mollis nulla curabitur est, orci fringilla ut consectetur eu hendrerit placerat neque, velit odio sapien accumsan natoque molestie dictum diam, eleifend sit aptent at quisque congue rhoncus.
            </p>
          </div>
        </div>
      </div>

      <div className="grad absolute z-0 w-full h-64 border-t border-pink-200 bg-gradient-to-b from-orange-100 opacity-50"></div>

      <div className="tugas relative z-40 border-t border-orange-200">
        <div className="px-6 pt-10 pb-1">
          <div className="max-w-2xl mx-auto text-gray-700">
            <h1 className="text-xl font-bold mb-6">Tugas</h1>
            <p className="my-6">
            Pretium pharetra ornare facilisi urna hendrerit efficitur suscipit laoreet accumsan, molestie dictumst velit mus aptent mi nam consequat per, curabitur posuere phasellus proin iaculis rhoncus ligula in, egestas penatibus augue taciti habitasse elit mollis pulvinar. In lacinia aliquet bibendum nullam massa dictum sapien suscipit neque, vivamus morbi consequat quam urna vestibulum senectus pulvinar nec, vitae cursus rhoncus fringilla augue elit aliquam curabitur, hac iaculis adipiscing velit gravida ridiculus felis magnis. Etiam ante massa consequat mus ligula laoreet lacinia integer, suscipit justo imperdiet aptent potenti volutpat netus ultrices, interdum vitae dictum class proin tempor conubia enim sodales, hac tellus erat mauris luctus id aliquet.
            </p>
          </div>
        </div>
      </div>

      <div className="px-6">
        <div className="max-w-2xl mx-auto text-gray-700">
          <Entry height={1} title="Topik penugasan 1" placeholder={"Ketik jawaban Anda di sini"} fn={setTask4} task={task4} item="t1" disabled={saved} />
          <Entry title="Berperan untuk" placeholder={"Ketik jawaban Anda di sini"} fn={setTask4} task={task4} item="p1" disabled={saved} />
          <hr className="border-pink-300 mb-8"/>
          <Entry height={1} title="Topik penugasan 2" placeholder={"Ketik jawaban Anda di sini"} fn={setTask4} task={task4} item="t2" disabled={saved} />
          <Entry title="Berperan untuk" placeholder={"Ketik jawaban Anda di sini"} fn={setTask4} task={task4} item="p2" disabled={saved} />
          <hr className="border-pink-300 mb-8"/>
          <Entry height={1} title="Topik penugasan 3" placeholder={"Ketik jawaban Anda di sini"} fn={setTask4} task={task4} item="t3" disabled={saved} />
          <Entry title="Berperan untuk" placeholder={"Ketik jawaban Anda di sini"} fn={setTask4} task={task4} item="p3" disabled={saved} />
          <hr className="border-pink-300 mb-8"/>
          <Entry height={1} title="Topik penugasan 4" placeholder={"Ketik jawaban Anda di sini"} fn={setTask4} task={task4} item="t4" disabled={saved} />
          <Entry title="Berperan untuk" placeholder={"Ketik jawaban Anda di sini"} fn={setTask4} task={task4} item="p4" disabled={saved} />
        </div>
        <Debug states={_debug} show={debug} />
        {!saved && <TabSubmitter task={task4} mutate={setTask4} currentTabNum={tabNum} />}
      </div>
    </div>
  )
}

function TAB5({ debug }) {
  const tabNum = setCurrentTab(5)
  const { task5, setTask5 } = useContext(TestContext)
  const saved = task5.saved ? true : false
  const _debug = [
    ["I1", task5.i1],
    ["I2", task5.i2],
    ["I3", task5.i3],
    ["I4", task5.i4],
    ["I5", task5.i5],
  ]

  return (
    <div className="relative">
      <h1 className="text-center text-teal-500 text-2xl font-bold uppercase py-8">Bab 5</h1>

      <div className="situasi bg-orange-100 border-t border-orange-200">
        <div className="px-6 py-10">
          <div className="max-w-2xl mx-auto text-gray-700">
            <h1 className="text-xl font-bold mb-6">Situasi</h1>
            <p className="my-6">
            In lacinia aliquet bibendum nullam massa dictum sapien suscipit neque, vivamus morbi consequat quam urna vestibulum senectus pulvinar nec, vitae cursus rhoncus fringilla augue elit aliquam curabitur, hac iaculis adipiscing velit gravida ridiculus felis magnis. Etiam ante massa consequat mus ligula laoreet lacinia integer, suscipit justo imperdiet aptent potenti volutpat netus ultrices, interdum vitae dictum class proin tempor conubia enim sodales, hac tellus erat mauris luctus id aliquet.
            </p>
            <p className="my-6">
            Aenean faucibus convallis cursus euismod mollis nulla curabitur est, orci fringilla ut consectetur eu hendrerit placerat neque, velit odio sapien accumsan natoque molestie dictum diam, eleifend sit aptent at quisque congue rhoncus.
            </p>
          </div>
        </div>
      </div>

      <div className="grad absolute z-0 w-full h-64 border-t border-pink-200 bg-gradient-to-b from-orange-100 opacity-50"></div>

      <div className="tugas relative z-40 border-t border-orange-200">
        <div className="px-6 pt-10 pb-1">
          <div className="max-w-2xl mx-auto text-gray-700">
            <h1 className="text-xl font-bold mb-6">Tugas</h1>
            <p className="my-6">
            Pretium pharetra ornare facilisi urna hendrerit efficitur suscipit laoreet accumsan, molestie dictumst velit mus aptent mi nam consequat per, curabitur posuere phasellus proin iaculis rhoncus ligula in, egestas penatibus augue taciti habitasse elit mollis pulvinar. In lacinia aliquet bibendum nullam massa dictum sapien suscipit neque, vivamus morbi consequat quam urna vestibulum senectus pulvinar nec, vitae cursus rhoncus fringilla augue elit aliquam curabitur, hac iaculis adipiscing velit gravida ridiculus felis magnis. Etiam ante massa consequat mus ligula laoreet lacinia integer, suscipit justo imperdiet aptent potenti volutpat netus ultrices, interdum vitae dictum class proin tempor conubia enim sodales, hac tellus erat mauris luctus id aliquet.
            </p>
          </div>
        </div>
      </div>

      <div className="px-6">
        <div className="max-w-2xl mx-auto text-gray-700">
          <Entry title="Topik/informasi 1" placeholder={"Ketik jawaban Anda di sini"} fn={setTask5} task={task5} item="i1" disabled={saved} />
          <Entry title="Topik/informasi 2" placeholder={"Ketik jawaban Anda di sini"} fn={setTask5} task={task5} item="i2" disabled={saved} />
          <Entry title="Topik/informasi 3" placeholder={"Ketik jawaban Anda di sini"} fn={setTask5} task={task5} item="i3" disabled={saved} />
          <Entry title="Topik/informasi 4" placeholder={"Ketik jawaban Anda di sini"} fn={setTask5} task={task5} item="i4" disabled={saved} />
          <Entry title="Topik/informasi 5" placeholder={"Ketik jawaban Anda di sini"} fn={setTask5} task={task5} item="i5" disabled={saved} />
        </div>
        <Debug states={_debug} show={debug} />
        {!saved && <TabSubmitter task={task5} mutate={setTask5} currentTabNum={tabNum} />}
      </div>
    </div>
  )
}

function TAB6({ debug }) {
  const tabNum = setCurrentTab(6)
  const { task6, setTask6 } = useContext(TestContext)
  const saved = task6.saved ? true : false
  const _debug = [
    ["U1", task6.u1],
    ["U2", task6.u2],
    ["U3", task6.u3],
    ["U4", task6.u4],
    ["U5", task6.u5],
  ]

  return (
    <div className="relative">
      <h1 className="text-center text-teal-500 text-2xl font-bold uppercase py-8">Bab 6</h1>

      <div className="situasi bg-orange-100 border-t border-orange-200">
        <div className="px-6 py-10">
          <div className="max-w-2xl mx-auto text-gray-700">
            <h1 className="text-xl font-bold mb-6">Situasi</h1>
            <p className="my-6">
            In lacinia aliquet bibendum nullam massa dictum sapien suscipit neque, vivamus morbi consequat quam urna vestibulum senectus pulvinar nec, vitae cursus rhoncus fringilla augue elit aliquam curabitur, hac iaculis adipiscing velit gravida ridiculus felis magnis. Etiam ante massa consequat mus ligula laoreet lacinia integer, suscipit justo imperdiet aptent potenti volutpat netus ultrices, interdum vitae dictum class proin tempor conubia enim sodales, hac tellus erat mauris luctus id aliquet.
            </p>
            <p className="my-6">
            Aenean faucibus convallis cursus euismod mollis nulla curabitur est, orci fringilla ut consectetur eu hendrerit placerat neque, velit odio sapien accumsan natoque molestie dictum diam, eleifend sit aptent at quisque congue rhoncus.
            </p>
          </div>
        </div>
      </div>

      <div className="grad absolute z-0 w-full h-64 border-t border-pink-200 bg-gradient-to-b from-orange-100 opacity-50"></div>

      <div className="tugas relative z-40 border-t border-orange-200">
        <div className="px-6 pt-10 pb-1">
          <div className="max-w-2xl mx-auto text-gray-700">
            <h1 className="text-xl font-bold mb-6">Tugas</h1>
            <p className="my-6">
            Pretium pharetra ornare facilisi urna hendrerit efficitur suscipit laoreet accumsan, molestie dictumst velit mus aptent mi nam consequat per, curabitur posuere phasellus proin iaculis rhoncus ligula in, egestas penatibus augue taciti habitasse elit mollis pulvinar. In lacinia aliquet bibendum nullam massa dictum sapien suscipit neque, vivamus morbi consequat quam urna vestibulum senectus pulvinar nec, vitae cursus rhoncus fringilla augue elit aliquam curabitur, hac iaculis adipiscing velit gravida ridiculus felis magnis. Etiam ante massa consequat mus ligula laoreet lacinia integer, suscipit justo imperdiet aptent potenti volutpat netus ultrices, interdum vitae dictum class proin tempor conubia enim sodales, hac tellus erat mauris luctus id aliquet.
            </p>
          </div>
        </div>
      </div>

      <div className="px-6">
        <div className="max-w-2xl mx-auto text-gray-700">
          <Entry title="Upaya/inisiatif 1" placeholder={"Ketik jawaban Anda di sini"} fn={setTask6} task={task6} item="i1" disabled={saved} />
          <Entry title="Upaya/inisiatif 2" placeholder={"Ketik jawaban Anda di sini"} fn={setTask6} task={task6} item="i2" disabled={saved} />
          <Entry title="Upaya/inisiatif 3" placeholder={"Ketik jawaban Anda di sini"} fn={setTask6} task={task6} item="i3" disabled={saved} />
          <Entry title="Upaya/inisiatif 4" placeholder={"Ketik jawaban Anda di sini"} fn={setTask6} task={task6} item="i4" disabled={saved} />
          <Entry title="Upaya/inisiatif 5" placeholder={"Ketik jawaban Anda di sini"} fn={setTask6} task={task6} item="i5" disabled={saved} />
        </div>
        <Debug states={_debug} show={debug} />
        {!saved && <TabSubmitter task={task6} mutate={setTask6} currentTabNum={tabNum} />}
      </div>
    </div>
  )
}

function TAB7({ debug }) {
  const tabNum = setCurrentTab(7)
  const { task7, setTask7 } = useContext(TestContext)
  const saved = task7.saved ? true : false
  const _debug = [
    ["U1", task7.u1],
    ["A1", task7.a1],
    ["U2", task7.u2],
    ["A2", task7.a2],
    ["U3", task7.u3],
    ["A3", task7.a3],
    ["U4", task7.u4],
    ["A4", task7.a4],
  ]

  return (
    <div className="relative">
      <h1 className="text-center text-teal-500 text-2xl font-bold uppercase py-8">Bab 7</h1>

      <div className="situasi bg-orange-100 border-t border-orange-200">
        <div className="px-6 py-10">
          <div className="max-w-2xl mx-auto text-gray-700">
            <h1 className="text-xl font-bold mb-6">Situasi</h1>
            <p className="my-6">
            In lacinia aliquet bibendum nullam massa dictum sapien suscipit neque, vivamus morbi consequat quam urna vestibulum senectus pulvinar nec, vitae cursus rhoncus fringilla augue elit aliquam curabitur, hac iaculis adipiscing velit gravida ridiculus felis magnis. Etiam ante massa consequat mus ligula laoreet lacinia integer, suscipit justo imperdiet aptent potenti volutpat netus ultrices, interdum vitae dictum class proin tempor conubia enim sodales, hac tellus erat mauris luctus id aliquet.
            </p>
            <p className="my-6">
            Aenean faucibus convallis cursus euismod mollis nulla curabitur est, orci fringilla ut consectetur eu hendrerit placerat neque, velit odio sapien accumsan natoque molestie dictum diam, eleifend sit aptent at quisque congue rhoncus.
            </p>
          </div>
        </div>
      </div>

      <div className="grad absolute z-0 w-full h-64 border-t border-pink-200 bg-gradient-to-b from-orange-100 opacity-50"></div>

      <div className="tugas relative z-40 border-t border-orange-200">
        <div className="px-6 pt-10 pb-1">
          <div className="max-w-2xl mx-auto text-gray-700">
            <h1 className="text-xl font-bold mb-6">Tugas</h1>
            <p className="my-6">
            Pretium pharetra ornare facilisi urna hendrerit efficitur suscipit laoreet accumsan, molestie dictumst velit mus aptent mi nam consequat per, curabitur posuere phasellus proin iaculis rhoncus ligula in, egestas penatibus augue taciti habitasse elit mollis pulvinar. In lacinia aliquet bibendum nullam massa dictum sapien suscipit neque, vivamus morbi consequat quam urna vestibulum senectus pulvinar nec, vitae cursus rhoncus fringilla augue elit aliquam curabitur, hac iaculis adipiscing velit gravida ridiculus felis magnis. Etiam ante massa consequat mus ligula laoreet lacinia integer, suscipit justo imperdiet aptent potenti volutpat netus ultrices, interdum vitae dictum class proin tempor conubia enim sodales, hac tellus erat mauris luctus id aliquet.
            </p>
          </div>
        </div>
      </div>

      <div className="px-6">
        <div className="max-w-2xl mx-auto text-gray-700">
          <Entry height={1} title="Usulan/rancangan 1" placeholder={"Ketik jawaban Anda di sini"} fn={setTask7} task={task7} item="u1" disabled={saved} />
          <Entry title="Alasan" placeholder={"Ketik jawaban Anda di sini"} fn={setTask7} task={task7} item="a1" disabled={saved} />
          <hr className="border-pink-300 mb-8"/>
          <Entry height={1} title="Usulan/rancangan 2" placeholder={"Ketik jawaban Anda di sini"} fn={setTask7} task={task7} item="u2" disabled={saved} />
          <Entry title="Alasan" placeholder={"Ketik jawaban Anda di sini"} fn={setTask7} task={task7} item="a2" disabled={saved} />
          <hr className="border-pink-300 mb-8"/>
          <Entry height={1} title="Usulan/rancangan 3" placeholder={"Ketik jawaban Anda di sini"} fn={setTask7} task={task7} item="u3" disabled={saved} />
          <Entry title="Alasan" placeholder={"Ketik jawaban Anda di sini"} fn={setTask7} task={task7} item="a3" disabled={saved} />
          <hr className="border-pink-300 mb-8"/>
          <Entry height={1} title="Usulan/rancangan 4" placeholder={"Ketik jawaban Anda di sini"} fn={setTask7} task={task7} item="u4" disabled={saved} />
          <Entry title="Alasan" placeholder={"Ketik jawaban Anda di sini"} fn={setTask7} task={task7} item="a4" disabled={saved} />
        </div>
        <Debug states={_debug} show={debug} />
        {!saved && <TabSubmitter task={task7} mutate={setTask7} currentTabNum={tabNum} />}
      </div>
    </div>
  )
}

function TAB8({ debug }) {
  const tabNum = setCurrentTab(8)
  const { task8, setTask8 } = useContext(TestContext)
  const saved = task8.saved ? true : false
  const _debug = [
    ["W1", task8.w1],
    ["E1", task8.e1],
    ["E2", task8.e2],
    ["T2", task8.t1],
    ["T3", task8.t2],
  ]

  return (
    <div className="relative">
      <h1 className="text-center text-teal-500 text-2xl font-bold uppercase py-8">Bab 8</h1>

      <div className="situasi bg-orange-100 border-t border-orange-200">
        <div className="px-6 py-10">
          <div className="max-w-2xl mx-auto text-gray-700">
            <h1 className="text-xl font-bold mb-6">Situasi</h1>
            <p className="my-6">
            In lacinia aliquet bibendum nullam massa dictum sapien suscipit neque, vivamus morbi consequat quam urna vestibulum senectus pulvinar nec, vitae cursus rhoncus fringilla augue elit aliquam curabitur, hac iaculis adipiscing velit gravida ridiculus felis magnis. Etiam ante massa consequat mus ligula laoreet lacinia integer, suscipit justo imperdiet aptent potenti volutpat netus ultrices, interdum vitae dictum class proin tempor conubia enim sodales, hac tellus erat mauris luctus id aliquet.
            </p>
            <p className="my-6">
            Aenean faucibus convallis cursus euismod mollis nulla curabitur est, orci fringilla ut consectetur eu hendrerit placerat neque, velit odio sapien accumsan natoque molestie dictum diam, eleifend sit aptent at quisque congue rhoncus.
            </p>
          </div>
        </div>
      </div>

      <div className="grad absolute z-0 w-full h-64 border-t border-pink-200 bg-gradient-to-b from-orange-100 opacity-50"></div>

      <div className="tugas relative z-40 border-t border-orange-200">
        <div className="px-6 pt-10 pb-1">
          <div className="max-w-2xl mx-auto text-gray-700">
            <h1 className="text-xl font-bold mb-6">Tugas</h1>
            <p className="my-6">
            Pretium pharetra ornare facilisi urna hendrerit efficitur suscipit laoreet accumsan, molestie dictumst velit mus aptent mi nam consequat per, curabitur posuere phasellus proin iaculis rhoncus ligula in, egestas penatibus augue taciti habitasse elit mollis pulvinar. In lacinia aliquet bibendum nullam massa dictum sapien suscipit neque, vivamus morbi consequat quam urna vestibulum senectus pulvinar nec, vitae cursus rhoncus fringilla augue elit aliquam curabitur, hac iaculis adipiscing velit gravida ridiculus felis magnis. Etiam ante massa consequat mus ligula laoreet lacinia integer, suscipit justo imperdiet aptent potenti volutpat netus ultrices, interdum vitae dictum class proin tempor conubia enim sodales, hac tellus erat mauris luctus id aliquet.
            </p>
          </div>
        </div>
      </div>

      <div className="px-6">
        <div className="max-w-2xl mx-auto text-gray-700">
          <Entry title="Tindakan yang wajib dilakukan" placeholder={"Ketik jawaban Anda di sini"} fn={setTask8} task={task8} item="w1" disabled={saved} />
          <Entry title="Tindakan paling efektif 1" placeholder={"Ketik jawaban Anda di sini"} fn={setTask8} task={task8} item="e1" disabled={saved} />
          <Entry title="Tindakan paling efektif 2" placeholder={"Ketik jawaban Anda di sini"} fn={setTask8} task={task8} item="e2" disabled={saved} />
          <Entry title="Tindakan paling tidak efektif 1" placeholder={"Ketik jawaban Anda di sini"} fn={setTask8} task={task8} item="t1" disabled={saved} />
          <Entry title="Tindakan paling tidak efektif 2" placeholder={"Ketik jawaban Anda di sini"} fn={setTask8} task={task8} item="t2" disabled={saved} />
        </div>
        <Debug states={_debug} show={debug} />
        {!saved && <TabSubmitter task={task8} mutate={setTask8} currentTabNum={tabNum} />}
      </div>
    </div>
  )
}

function TAB9({ debug }) {
  const tabNum = setCurrentTab(9)
  const { task9, setTask9 } = useContext(TestContext)
  const saved = task9.saved ? true : false
  const _debug = [
    ["U1", task9.u1],
    ["U2", task9.u2],
    ["U3", task9.u3],
    ["U4", task9.u4],
    ["U5", task9.u5],
  ]

  return (
    <div className="relative">
      <h1 className="text-center text-teal-500 text-2xl font-bold uppercase py-8">Bab 9</h1>

      <div className="situasi bg-orange-100 border-t border-orange-200">
        <div className="px-6 py-10">
          <div className="max-w-2xl mx-auto text-gray-700">
            <h1 className="text-xl font-bold mb-6">Situasi</h1>
            <p className="my-6">
            In lacinia aliquet bibendum nullam massa dictum sapien suscipit neque, vivamus morbi consequat quam urna vestibulum senectus pulvinar nec, vitae cursus rhoncus fringilla augue elit aliquam curabitur, hac iaculis adipiscing velit gravida ridiculus felis magnis. Etiam ante massa consequat mus ligula laoreet lacinia integer, suscipit justo imperdiet aptent potenti volutpat netus ultrices, interdum vitae dictum class proin tempor conubia enim sodales, hac tellus erat mauris luctus id aliquet.
            </p>
            <p className="my-6">
            Aenean faucibus convallis cursus euismod mollis nulla curabitur est, orci fringilla ut consectetur eu hendrerit placerat neque, velit odio sapien accumsan natoque molestie dictum diam, eleifend sit aptent at quisque congue rhoncus.
            </p>
          </div>
        </div>
      </div>

      <div className="grad absolute z-0 w-full h-64 border-t border-pink-200 bg-gradient-to-b from-orange-100 opacity-50"></div>

      <div className="tugas relative z-40 border-t border-orange-200">
        <div className="px-6 pt-10 pb-1">
          <div className="max-w-2xl mx-auto text-gray-700">
            <h1 className="text-xl font-bold mb-6">Tugas</h1>
            <p className="my-6">
            Pretium pharetra ornare facilisi urna hendrerit efficitur suscipit laoreet accumsan, molestie dictumst velit mus aptent mi nam consequat per, curabitur posuere phasellus proin iaculis rhoncus ligula in, egestas penatibus augue taciti habitasse elit mollis pulvinar. In lacinia aliquet bibendum nullam massa dictum sapien suscipit neque, vivamus morbi consequat quam urna vestibulum senectus pulvinar nec, vitae cursus rhoncus fringilla augue elit aliquam curabitur, hac iaculis adipiscing velit gravida ridiculus felis magnis. Etiam ante massa consequat mus ligula laoreet lacinia integer, suscipit justo imperdiet aptent potenti volutpat netus ultrices, interdum vitae dictum class proin tempor conubia enim sodales, hac tellus erat mauris luctus id aliquet.
            </p>
          </div>
        </div>
      </div>

      <div className="px-6">
        <div className="max-w-2xl mx-auto text-gray-700">
          <Entry title="Upaya/inisiatif 1" placeholder={"Ketik jawaban Anda di sini"} fn={setTask9} task={task9} item="u1" disabled={saved} />
          <Entry title="Upaya/inisiatif 2" placeholder={"Ketik jawaban Anda di sini"} fn={setTask9} task={task9} item="u2" disabled={saved} />
          <Entry title="Upaya/inisiatif 3" placeholder={"Ketik jawaban Anda di sini"} fn={setTask9} task={task9} item="u3" disabled={saved} />
          <Entry title="Upaya/inisiatif 4" placeholder={"Ketik jawaban Anda di sini"} fn={setTask9} task={task9} item="u4" disabled={saved} />
          <Entry title="Upaya/inisiatif 5" placeholder={"Ketik jawaban Anda di sini"} fn={setTask9} task={task9} item="u5" disabled={saved} />
        </div>
        <Debug states={_debug} show={debug} />
        {!saved && <TabSubmitter task={task9} mutate={setTask9} currentTabNum={tabNum} />}
      </div>
    </div>
  )
}

export function Content() {
  const { tab, lastTab, prevTab } = useContext(TestContext)
  // const [submittable, setSubmittable] = useState(false)

  // switch (tab) {
  //   case 1:
  //     return <TAB1 debug={true} />
  //   case 2:
  //     return <TAB2 debug={true} />
  //   case 3:
  //     return <TAB3 debug={true} />
  //   case 4:
  //     return <TAB4 debug={true} />
  //   case 5:
  //     return <TAB5 debug={true} />
  //   case 6:
  //     return <TAB6 debug={true} />
  //   case 7:
  //     return <TAB7 debug={true} />
  //   case 8:
  //     return <TAB8 debug={true} />
  //   case 9:
  //     return <TAB9 debug={true} />
  //   default:
  //     return <div>HOLO</div>
  // }

  return (
    <div>
      <Header />
      {tab == 1 && <TAB1 debug={true} />}
      {tab == 2 && <TAB2 debug={true} />}
      {tab == 3 && <TAB3 debug={true} />}
      {tab == 4 && <TAB4 debug={true} />}
      {tab == 5 && <TAB5 debug={true} />}
      {tab == 6 && <TAB6 debug={true} />}
      {tab == 7 && <TAB7 debug={true} />}
      {tab == 8 && <TAB8 debug={true} />}
      {tab == 9 && <TAB9 debug={true} />}

      <p className="text-sm text-gray-700 text-center mt-12">
        CURRENT TAB: <span className="text-red-500">{tab}</span>
        &nbsp;&nbsp;-&nbsp;&nbsp;PREV TAB: <span className="text-red-500">{prevTab}</span>
        &nbsp;&nbsp;-&nbsp;&nbsp;MAX VISITED: <span className="text-red-500">{lastTab}</span>
      </p>
      {/* <p className="text-sm text-gray-700 text-center mt-2">Visits: {visitStack.join(' ')}</p> */}
      {/* <pre className="pre">{JSON.stringify(task1, null, 2)}</pre> */}
      {/* <pre className="pre">{JSON.stringify(intrayBody, null, 2)}</pre> */}
    </div>
  )
}