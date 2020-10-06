import { ObjectID } from 'mongodb'
import { connect } from 'utils/database'

export default async (req, res) => {
  try {
    console.log(req.method, req.url)
    const projectId = req.query["projectId"]
    const personaId = req.query["personaId"]
    const projection = {
      _id: 0,
      projectId: '5f6ef337d784025cf45ab926',
      personaId: '5f70ec59010bd033f07fd3a6',
      fullname: 'Suparman Sample',
      initiated: 1,
      started: 1,
      finished: 1,
      touched: 1,
      maxTime: 1,
      netTime: 1,
      remains: 1,
      items: 1,
      done: 1,
      sequence: 1,
    }
    const { db } = await connect()
    const doc = await db.collection("ev_GPQ").findOne(
      { projectId: projectId, personaId: personaId },
      { projection: projection }
    )
    res.status(200)
    res.json(doc)
  } catch (error) {
    res.status(404).json({ message: "Not found." })
  }
}