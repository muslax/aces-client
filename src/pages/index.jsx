import Head from 'next/head'
import Link from 'next/link'
import styles from 'styles/Home.module.css'

export default function Home() {
  const cls = styles.container + ' bg-gray-100 border-t-4 border-gray-700'
  return (
    // <div className="h-screen p-4 border-t-4 border-red-600">
    <div className={cls}>
      <Head>
        <title>Invitation Only</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="rounded-lg border border-gray-400 hover:border-gray-500 max-w-xl mx-auto p-8 bg-white">

        <h1 className="text-center text-lg text-gray-700 font-bold leading-snug mb-12">
          Hanya untuk yang memiliki kode akses
        </h1>

        <p className="text-center text-xl font-bold mb-8">
          <Link href="/access">
            <a className="bg-gray-600 rounded pt-3 pb-4 px-8 text-white hover:bg-gray-700 hover:text-white">
              Saya punya kode akses
            </a>
          </Link>
        </p>
      </div>
      <br/><br/><br/>
    </div>
  )
}