// modules.js
// ACES Project Modules API


import { ObjectID } from 'mongodb'
import withSession from 'lib/session'
import { connect } from 'utils/database'

export default withSession(async (req, res) => {

  const user = req.session.get("user")
  if (!user || !user.isLoggedIn) {
    res.status(401).json({ message: "Unauthorized" })
    return
  }

  // Only process GET
  if (req.method != 'GET') {
    res.status(400).json({ message: "Unprocessable" })
    return
  }

  const { db } = await connect()
  const COLLECTION = "projects"
  const { license, project, persona, type, method } = await req.query

  // Project query is required
  try {
    // Request modules with specified method
    if (project) {
      // const rs = await db.collection(COLLECTION).findOne(
      const rs = await db.collection(COLLECTION).findOne(
        { _id: ObjectID(project) },
        { projection: { _id: 0, modules: 1}}
      )
      console.log(rs["modules"])
      res.status(200)
      res.json(rs["modules"])
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" })
  }

})