import React from 'react'
import Head from 'next/head'

export default class LayoutIntray extends React.Component {

  constructor(props) {
    super(props)
  }

  handleScroll = function(e) {
    if (window.pageYOffset > 93) {
      document.getElementById('intray-page').classList.add('scrolled');
    } else {
      document.getElementById('intray-page').classList.remove('scrolled');
    }
  }

  componentDidMount () {
    window.document.body.classList.remove("bg-purple-500")
    window.addEventListener('scroll', this.handleScroll, false);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll, false);
  }

  render () {
    return (
      <>
        <Head>
          <title>{this.props.title}</title>
        </Head>
        <style jsx global>{`
        .container {
          max-width: 60rem;
        }
        .pre {
          color: #c20;
          padding: 4px;
          margin: 16px 0;
          max-height: 300px;
          font-size: 12px;
          background-color: #f8f8fa;
          border: 1px solid #f0f0f3;
          border-left: 4px solid #ebebeb;
          overflow: scroll;
        }
        `}</style>

        <main id="intray-page">
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