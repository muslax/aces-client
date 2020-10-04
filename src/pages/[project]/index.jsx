import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { connect } from 'utils/database'
import useUser from 'lib/useUser'
import fetchJson from 'lib/fetchJson'

function ProjectLounge({ project }) {
  const router = useRouter()
  const { user, mutateUser } = useUser({ redirectTo: '/' })

  if (router.isFallback) {
    return <div>Loading...</div>
  }

  if (!user?.isLoggedIn) {
    return (
      <div className="h-screen bg-gray-300 border-t-4 border-gray-700"></div>
    )
  }

  return (
    <div className="m-6">
      <h1 className="text-3xl mb-4">{ project.title }</h1>

      {user?.isLoggedIn && (
        <p className="">
          <Link href="/api/logout">
            <a onClick={async (e) => {
                e.preventDefault()
                await mutateUser(fetchJson('/api/logout'))
                router.push('/')
              }} className="bg-indigo-600 border border-indigo-500 rounded py-1 px-3 text-white hover:bg-transparent hover:text-indigo-700">Logout</a>
          </Link>
        </p>
      )}

      {user?.isLoggedIn && <pre className="text-xs text-red-500 font-light">{JSON.stringify(user, null, 2)}</pre>}

      <pre className="text-xs font-light">{ JSON.stringify(project, null, 2) }</pre>
    </div>
  )
}

export async function getStaticPaths() {
  const { db } = await connect()
  const projects = await db.collection('projects').find({ status: "open" }).toArray()
  // const paths = projects.map((item) => ({
  //   params: { project: item.path.toString() }
  // }))

  // Using project id as route
  const paths = projects.map((item) => ({
    params: { project: item._id.toString() }
  }))

  console.log( paths )
  // console.log( projects )
  return { paths, fallback: true }
}

export async function getStaticProps({ params }) {
  const { db } = await connect()
  const projection = {
    _id: 1,
    license: 1,
    clientId: 1,
    contractId: 1,
    path: 1,
    title: 1,
    description: 1,
    startDate: 1,
    endDate: 1,
    status: 1,
    contact: 1,
    admin: 1,
    createdAt: 1,
  }

  // const doc = await db.collection('projects').findOne(
  //   {path: params.project},
  //   {fields: projection}
  // )

  // Using project id as route
  const ObjectID = require('mongodb').ObjectID
  const doc = await db.collection('projects').findOne(
    {_id: ObjectID(params.project)}
  )

  return {
    props: {
      project: {
        _id: doc._id.toString(),
        license: doc.license,
        clientId: doc.clientId,
        contractId: doc.contractId,
        path: doc.path,
        title: doc.title,
        description: doc.description,
        startDate: doc.startDate,
        endDate: doc.endDate,
        status: doc.status,
        contact: doc.contact,
        admin: doc.admin,
        createdAd: doc.createdAt.toString(),
      }
    },
    revalidate: 10, // In seconds
  }
}

export default ProjectLounge