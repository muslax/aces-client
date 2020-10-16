// project.js
// - id must be supplied 5f786ad74719017521867285
// - graball      -> returns whole project document
// - modules      -> return modules sub document
// - modules=type -> returns module with type

import { ObjectID } from 'mongodb'
import withSession from 'lib/session'
import { connect } from 'lib/database'


function fromQuery(query) {
  const {graball, modules} = query
  if (graball != undefined) {
    return {}
  }
  else if(modules == undefined) {
    return { _id: 0, modules: 0 }
  }
  else if (!modules || modules == "all") {
    return { _id: 0, modules: 1 }
  } else {
    return { _id: 0, modules: {
      $elemMatch: { type: modules }
    }}
  }
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

  const { id, modules, graball } = req.query
  const { db } = await connect()

  try {
    const projection = fromQuery(req.query)
    const rs = await db.collection("projects").findOne(
      { _id: ObjectID(id) },
      { projection: projection }
    )

    if (modules == undefined) {
      res.status(200).json( rs )
    } else {
      const rsdoc = (!modules || modules == "all") ? rs["modules"] : rs["modules"][0]
      res.status(200).json(rsdoc)
    }
  } catch (error) {
    res.status(404).json({ message: "Not found" })
  }
})
