import React from 'react'
import Head from 'next/head'
// import PropTypes from 'prop-types'


// const Layout = ({ title, children }) => (
export default class Layout extends React.Component {
  handleKeyDown = function(e) {
    e = e || window.event
    console.log(e.keyCode)
    if (e.keyCode == 68) {
      document.getElementById("C-D").click()
      // document.getElementById("C-D").fireEvent("onchange")
    }
  }

  componentDidMount () {
    console.log("DID MOUNT")
    document.getElementById("main").addEventListener("keydown", this.handleKeyDown)
    document.getElementById("main").focus()
    // window.addEventListener("keydown", handleKeyDown)

    // const div = document.getElementById("timer")
    // if (div && div.innerText) {
    //   const ms = parseInt(div.innerText)
    //   let h = Math.floor((ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    //   let m = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    //   let hours = (h < 10) ? "0" + h : h
    //   let minutes = (m < 10) ? "0" + m : m
    //   let text = hours + ":" + minutes
    //   div.innerText = '' // text
    // }
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

// export default Layout

/*
export class XLayout extends React.Component {

  handleKeyDown = function(e) {
    e = e || window.event
    console.log(e.keyCode)
  }

  componentDidMount () {
    console.log("DID MOUNT")
    document.getElementById("main").addEventListener("keydown", handleKeyDown)
    document.getElementById("main").focus()
    // window.addEventListener("keydown", handleKeyDown)

    const div = document.getElementById("timer")
    if (div && div.innerText) {
      const ms = parseInt(div.innerText)
      let h = Math.floor((ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      let m = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
      let hours = (h < 10) ? "0" + h : h
      let minutes = (m < 10) ? "0" + m : m
      let text = hours + ":" + minutes
      div.innerText = '' // text
    }
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
*/
