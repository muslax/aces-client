import { ObjectID } from 'mongodb'
import withSession from 'lib/session'
import { connect } from 'utils/database'
import { AIME_INFO, AIME_ITEMS, AIME_LIKERT } from "lib/aime-1.0";

const MODULE_TYPE = "aime"
const PROJECT_DB = "projects"
const EVIDENCE_DB = "ev_aime"

const defaultProjection = {
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
}

function newDocument(license, project, persona, fullname, items, maxTime) {
  return {
    license: license,
    projectId: project,
    personaId: persona,
    fullname: fullname,
    initiated: null,
    started: null,
    finished: null,
    touched: null,
    maxTime: maxTime,
    netTime: 0,
    remains: maxTime,
    items: items,
    done: 0,
    rows: [],
    createdAt: new Date(),
    updatedAt: null,
  }
}

async function moduleInfo(db, project) {
  try {
    const doc = await db.collection(PROJECT_DB).findOne(
      { _id: ObjectID(project) },
      { projection: {
        _id: 0,
        modules: { $elemMatch: { type: MODULE_TYPE }}
      }}
    )
    return doc["modules"][0]
  } catch (error) {
    return null
  }
}

export default withSession(async (req, res) => {
  const user = req.session.get("user")
  if (!user || !user.isLoggedIn) {
    res.status(401).json({ message: "Unauthorized" })
    return
  }

  const {license, project, persona, fullname, items, maxTime} = req.query
  console.log(license, project, persona, fullname, items, maxTime)
  const { db } = await connect()

  // Request evidence info (optionally create on first)
  // if (req.method == 'GET' && fullname) {
  if (req.method == 'GET') {
    try {
      const doc = await db.collection(EVIDENCE_DB).findOne(
        { projectId: project, personaId: persona},
        { projection: defaultProjection }
      )

      if (doc != null) {
        res.status(200).json(doc)
      } else {
        console.log("Creating AIME evidence template...")
        const module = await moduleInfo(db, project)
        const doc_ = newDocument(license, project, persona, fullname, module.items, module.maxTime)
        const rs = await db.collection(EVIDENCE_DB).insertOne(doc_)
        res.status(200).json({
          projectId:  rs["ops"][0]["projectId"],
          personaId:  rs["ops"][0]["personaId"],
          fullname:   rs["ops"][0]["fullname"],
          initiated:  rs["ops"][0]["initiated"],
          started:    rs["ops"][0]["started"],
          finished:   rs["ops"][0]["finished"],
          touched:    rs["ops"][0]["touched"],
          maxTime:    rs["ops"][0]["maxTime"],
          netTime:    rs["ops"][0]["netTime"],
          remains:    rs["ops"][0]["remains"],
          items:      rs["ops"][0]["items"],
          done:       rs["ops"][0]["done"],
        })
      }
    } catch (error) {
      res.status(404).json({ error: "Not found" })
    }
  }

  // Posting test item
  else if (req.method == "POST") {
    const body = JSON.parse(req.body)
    console.log("project", project)
    console.log("persona", persona)
    console.log("BODY", body)
// seq, element, likert, stance, statement, lastTouched,
    const { seq, element, likert, stance, statement, lastTouched } = body
    const date = new Date()
    const ts = date.getTime()
    const elapsed = ts - lastTouched
    const finished = seq == items ? ts : null

    try {
      const doc = await db.collection(EVIDENCE_DB).findOneAndUpdate(
        { projectId: project, personaId: persona },
        {
          $inc: { done: 1, netTime: elapsed, remains: -elapsed },
          $set: { touched: ts, finished: finished, updatedAt: date },
          $push: { rows: {
            seq: seq,
            element: element,
            likert: likert,
            stance: stance,
            statement: statement,
            saved: ts,
            elapsed: elapsed,
          }}
        },
        { projection: defaultProjection, returnOriginal: false }
      )

      // Update session
      // req.session.set("userpath", "/persona/aime/step")
      // await req.session.save()

      console.log("DOC.VALUE", doc)
      res.status(200).json(doc["value"])
    } catch (error) {
      console.log("error", error)
      res.status(500).json({ message: "Could not update database" })
    }
  }

  // On init, start, and pause events
  else if (req.method == 'PUT') {
    const body = JSON.parse(req.body)
    console.log(body)
    const { action, update } = body
    const ts = new Date()

    let props = { touched: ts.getTime(), updatedAt: ts }

    if (action == "init" && update) {
      props.initiated = ts.getTime()
    } else if (action == "start" && update) {
      props.started = ts.getTime()
    }

    try {
      const doc = await db.collection(EVIDENCE_DB).findOneAndUpdate(
        { projectId: project, personaId: persona },
        { $set: props },
        { projection: defaultProjection, returnOriginal: false },
      )
      console.log("Hasil PUT: ", doc["value"])
      res.status(200).json(doc["value"])
    } catch (error) {
      res.status(500).json({ message: "Could not update database." })
    }
  }

  else {
    res.status(200).json({})
  }
})

// ?license=sdi&personaId=5f786e76d11c7699cf09e596&projectId=5f786ad74719017521867285&fullname=Atik%20Suniar&items=136&maxTime=8160000