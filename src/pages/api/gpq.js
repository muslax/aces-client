import { connect } from 'utils/database'
import { shuffle } from 'utils/utils'

/*
export default async (req, res) => {
  console.log(req.query)
  if (req.query["seq"]) {
    console.log(req.query["seq"])
  } else {
    console.log("No seq.")
  }
  try {
    const { version, info, seq } = await req.body
    const { db } = await connect()
    const projection = {
      _id: 0,
      name: 1,
      version: 1,
      title: 1,
      description: 1,
      items: 1,
      elmRoles: 1,
      intro: 1,
      testItems: 1
    }
    const projection2 = {_id: 0, "testItems": {"$elemMatch": {"seq": 23}}}
    const seek = { "version": "1.0", "testItems.seq": 23}
    const docs = await db.collection('CAPPED10_GPQ').find(seek).project(projection2).toArray()
    console.log(docs[0]["testItems"])
    res.status(200)
    res.json(docs[0]["testItems"][0])
  } catch (error) {
    res.status(404).json({ message: "Invalid API request." })
  }
}
*/
// license=gaia&projectId=5f70ec59010bd033f07fd3a6&personaId=5f6ef337d784025cf45ab929&fullname=Joko&items=120

function createNewDoc(license, projectId, personaId, fullname, items) {
  let arr = []
  for (let i=0; i<items; i++) { arr.push(i + 1) }
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
    maxTime: 5400000,
    netTime: 0,
    remains: 5400000,
    items: items,
    done: 0,
    sequence: randomSeqs,
    rows: [],
    createdAt: new Date(),
    updatedAt: null
  }
}

export default async (req, res) => {
  try {
    console.log(req.body)
    res.status(200)
    res.json({message: "OK"})
  } catch (error) {
    res.status(500).json({ message: "Could not process request." })
  }
}

/*
  Load/check evidence doc, if not found, create
  /api/gpq?persona=5f786eecd11c7699cf09e59a


*/