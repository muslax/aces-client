import { connect } from 'utils/database'
import { shuffle } from "utils/utils";

const GPQ_ITEMS = 120
const COLLECTION = "ev_GPQ"
const MAX_TIME = GPQ_ITEMS * 3 * 60 * 1000 // 120 x 3 minutes

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

function createNewDoc(license, projectId, personaId, fullname) {
  let arr = []
  for (let i=0; i<GPQ_ITEMS; i++) { arr.push(i + 1) }
  const randomSeqs = shuffle(arr).join(' ')
  return {
    license: license,
    projectId: projectId,
    personaId: personaId,
    fullname: fullname,
    initiated: null,
    started: null,
    finished: null,
    touched: null,
    maxTime: MAX_TIME,
    netTime: 0,
    remains: MAX_TIME,
    items: GPQ_ITEMS,
    done: 0,
    sequence: randomSeqs,
    rows: [],
    createdAt: new Date(),
    updatedAt: null,
  }
}

export default async (req, res) => {
  console.log(req.method, req.url)
  const projectId = req.query["projectId"]
  const personaId = req.query["personaId"]
  const license = req.query["license"]
  const fullname = req.query["fullname"]
  const { db } = await connect()

  if (req.method == 'POST') {
    console.log(req.body)
    console.log(req.body.seq)
    const body = JSON.parse(req.body)
    // console.log(body)
    const ts = new Date() // .getTime()
    const elapsed = ts.getTime() - body.lastTouched
    const finished = body.seq == GPQ_ITEMS ? ts.getTime() : null
    const doc = await db.collection(COLLECTION).findOneAndUpdate(
      { projectId: projectId, personaId: personaId },
      {
        $inc: { done: 1, netTime: elapsed, remains: -elapsed },
        $set: { touched: ts.getTime(), finished: finished, updatedAt: ts },
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
  }
  else if (req.method == 'PUT') {
    const body = JSON.parse(req.body)
    const ts = new Date()

    let doc = null
    if (body.field == "initiated") {
      doc = body.update ? {
        initiated: ts.getTime(), touched: ts.getTime(), updatedAt: ts
      } : {
        touched: ts.getTime(), updatedAt: ts
      }
    } else { // "started"
      doc = body.update ? {
        started: ts.getTime(), touched: ts.getTime(), updatedAt: ts
      } : {
        touched: ts.getTime(), updatedAt: ts
      }
    }

    console.log("PUT DOC", doc)

    const response = await db.collection(COLLECTION).findOneAndUpdate(
      { projectId: projectId, personaId: personaId },
      { $set: doc },
      { projection: projection }
    )
    console.log(response)
    res.status(200)
    res.json(response)
  }
  else { // GET
    try {
      const doc = await db.collection(COLLECTION).findOne(
        { projectId: projectId, personaId: personaId },
        { projection: projection }
      )
      console.log("DOC", doc)
      if (doc !== null) {
        res.status(200)
        res.json(doc)
      } else {
        // Create doc
        console.log("NEWDOC")
        const _doc_ = createNewDoc(license, projectId, personaId, fullname)
        const rs = await db.collection(COLLECTION).insertOne(_doc_)
        console.log("NEWDOC", rs)

        // Format
        const obj = rs["ops"][0]
        const newDoc = {
          projectId: obj["projectId"],
          personaId: obj["personaId"],
          fullname: obj["fullname"],
          initiated: obj["initiated"],
          started: obj["started"],
          finished: obj["finished"],
          touched: obj["touched"],
          maxTime: obj["maxTime"],
          netTime: obj["netTime"],
          remains: obj["remains"],
          items: obj["items"],
          done: obj["done"],
          sequence: obj["sequence"],
        }
        res.status(200)
        res.json(newDoc)
      }
    } catch (error) {
      res.status(404).json({ message: "Not found." })
    }
  }
}