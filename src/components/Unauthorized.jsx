import Head from 'next/head'
import DefaultErrorPage from 'next/error'

export default function Unauthorized() {
  return (
    <div className="w-full h-screen bg-gray-100 border-t-4 border-gray-700">
        <Head>
          <meta name="robots" content="noindex" />
        </Head>
        <DefaultErrorPage statusCode={404} />
      </div>
  )
}