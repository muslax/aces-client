import React from 'react'
import Head from 'next/head'
import PropTypes from 'prop-types'

const Layout = ({ title, children }) => (
  <>
    <Head>
      <title>{title}</title>
    </Head>
    <style jsx global>{`
      *,
      *::before,
      *::after {
        box-sizing: border-box;
      }

      body {
        margin: 0;
        color: #333;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
          'Helvetica Neue', Arial, Noto Sans, sans-serif, 'Apple Color Emoji',
          'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
      }

      .container {
        max-width: 60rem;
      }

      .whitebox {
        min-height:600px;
      }

      .pre {
        padding: 4px;
        margin: 16px 0;
        max-height: 300px;
        font-size: 12px;
        background-color: #f8f8fa;
        border: 1px solid #f0f0f3;
        border-left: 4px solid #ebebeb;
        overflow: scroll;
      }
      .h-vh-75 {
        height: 75vh
      }
      .h-vh-50 {
        height: 50vh
      }
    `}</style>

    <main>
      <div className="container mx-auto px-4 sm:px-6 py-1s sm:py-1">
        <div className="bg-gray-200s min-h-screen">
          <div className="whitebox bg-white pb-32">
            {children}
          </div>
          <div className="border-t border-gray-300 text-gray-500 text-center text-xs px-10 pt-4 pb-8">
            Footer | Tenant messages
          </div>
        </div>
      </div>
    </main>
  </>
)

export default Layout

Layout.propTypes = {
  children: PropTypes.node,
}