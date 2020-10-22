import React from 'react'
import Head from 'next/head'
// import PropTypes from 'prop-types'


// const Layout = ({ title, children }) => (
export default class Layout extends React.Component {
  handleKeyDown = function(e) {
    e = e || window.event
    console.log(e.keyCode)
    if (e.keyCode == 65) document.getElementById("C-A").click()
    else if (e.keyCode == 66) document.getElementById("C-B").click()
    else if (e.keyCode == 67) document.getElementById("C-C").click()
    else if (e.keyCode == 68) document.getElementById("C-D").click()
    else if (e.keyCode == 69) document.getElementById("C-E").click()
  }

  componentDidMount () {
    console.log("DID MOUNT")
    document.getElementById("main").addEventListener("keydown", this.handleKeyDown)
    document.getElementById("main").focus()
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleKeyDown, false);
  }

  render () {
  return (
    <>
      <Head>
        <title>{this.props.title}</title>
      </Head>
      <style jsx global>{`
        *,
        *::before,
        *::after {
          box-sizing: border-box;
        }

        .min-w-tab { min-width: 50px; }

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

      <main id="main" tabIndex="0">
        <div className="container mx-auto px-4 sm:px-6 py-1s sm:py-1">
          <div className="bg-gray-200s min-h-screen">
            <div className="whitebox bg-white pb-32">
              {this.props.children}
            </div>
            <div className="border-t border-gray-300 text-gray-500 text-center text-xs px-10 pt-4 pb-8">
              Footer | Tenant messages
            </div>
          </div>
        </div>
      </main>
    </>
  )
  }
}