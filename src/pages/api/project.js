import { ObjectID } from 'mongodb'
import withSession from 'lib/session'
import { connect } from 'utils/database'

const PROJECT_DB = "projects"

function decideModuleProjection(modules) {
  let projection = { _id: 0 }
  if (modules.toLowerCase() == "all") {
    projection = { _id: 0, modules: 1 }
  } else {
    projection = {
      _id: 0,
      modules: {
        $elemMatch: { type: modules }
      }
    }
  }
  return projection
}

export default withSession(async(req, res) => {
  const user = req.session.get("user")
  if (!user || !user.isLoggedIn) {
    res.status(401).json({ message: "Unauthorized" })
    return
  }

  if (req.method != "GET") {
    res.status(403).json({ message: "Only receives GET" })
    return
  }

  const { id, modules } = req.query
  const { db } = await connect()

  console.log(id, modules)

  try {
    const projection = modules ? decideModuleProjection(modules) : {
      // Returns all fields
      // modules: 0,
      // createdAt: 0,
      // updatedAt: 0,
    }
    console.log(projection)
    const rs = await db.collection(PROJECT_DB).findOne(
      { _id: ObjectID(id) }, { projection: projection }
    )

    if (modules == undefined) {
      res.status(200).json( rs )
    } else if (modules == "all") {
      res.status(200).json( rs["modules"] )
    } else {
      res.status(200).json( rs["modules"][0] )
    }
  } catch (error) {
    res.status(404).json({ message: "Not found" })
  }
})
