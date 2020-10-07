import { ObjectID } from 'mongodb'
import { connect } from 'utils/database'

export default async (req, res) => {
  console.log(req.method, req.url)
  const projectId = req.query["projectId"]
  const personaId = req.query["personaId"]
  const { db } = await connect()
  const projection = {
    _id: 0,
    projectId: 1,
    personaId: 1,
    fullname: 1,
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

  if (req.method == 'POST') {
    console.log(req.body)
    console.log(req.body.seq)
    const body = JSON.parse(req.body)
    // console.log(body)
    const ts = new Date() // .getTime()
    const elapsed = ts.getTime() - body.lastTouched
    const doc = await db.collection("ev_GPQ").findOneAndUpdate(
      { projectId: projectId, personaId: personaId },
      {
        $inc: { done: 1 },
        $set: { touched: ts.getTime(), updatedAt: ts },
        $push: { rows: {
          seq: body.seq,
          wbSeq: body.wbSeq,
          elm: body.elm,
          statement: body.statement,
          saved: ts.getTime(),
          elapsed: elapsed,
        }}
      },
      { projection: projection }
    )
    console.log(doc["value"])
    res.status(200)
    res.json(doc["value"])
  } else {
    try {
      const projection = {
        _id: 0,
        projectId: 1,
        personaId: 1,
        fullname: 1,
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
      // const projection = { _id: 1, fullname: 1 }

      const doc = await db.collection("ev_GPQ").findOne(
        { projectId: projectId, personaId: personaId },
        { projection: projection }
      )
      console.log(doc)
      res.status(200)
      res.json(doc)
    } catch (error) {
      res.status(404).json({ message: "Not found." })
    }
  }
}