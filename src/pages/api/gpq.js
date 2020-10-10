import { ObjectID } from 'mongodb'
import { connect } from 'utils/database'
import { shuffle } from 'utils/utils'
import { getItem } from "lib/gpq-1.0";

/**
 * This API can only be accessed with, minimally, three
 * query strings: license, projectId, and personaId
 *
 * ?license=[LICENSE]&personaId=[PERSONAID]&projectId=[PROJECTID]
 *
 * GET                QUERY
 * =======================
 * Module info        projectId, module
 * Evidence info      projectId, personaId, license, fullname (for creating doc)
 * Evidence sequence  sequence
 *
 * POST               BODY
 * =======================
 * Update touched     event (just touch, e.g. for pausing progress)
 * Update initiated   event
 * Update started     event
 *
 * PUT               BODY
 * =======================
 * Add evidence row
 */

const GPQ = "gpq"
const PROJECT_DB = "projects"
const EVIDENCE_DB = "ev_GPQ"

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
  // sequence: 1,
}

function newEvidenceDoc(license, projectId, personaId, fullname, items, maxTime) {
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
    maxTime: maxTime,
    netTime: 0,
    remains: maxTime,
    items: items,
    done: 0,
    sequence: randomSeqs,
    rows: [],
    createdAt: new Date(),
    updatedAt: null,
  }
}

async function moduleInfo(db, projectId) {
  try {
    const doc = await db.collection(PROJECT_DB).findOne(
      { _id: ObjectID(projectId) },
      { projection: {
        _id: 0,
        modules: { $elemMatch: { type: GPQ }}
      }}
    )
    return doc["modules"][0]
  } catch (error) {
    return null
  }
}

function sequenceArray(sequence) {
  if (!sequence) return []
  return sequence.split(' ').map((d) => {
    return parseInt(d)
  })
}

export default async (req, res) => {
  const { license, projectId, personaId, fullname, module, sequence, item } = req.query
  const { db } = await connect()

  // if (license === undefined || projectId == undefined | personaId == undefined) {
  if (projectId == undefined | personaId == undefined) {
    res.status(400).json({ error: "Bad request" })
    // return
  }

  // Request project module info
  else if (req.method == 'GET' && module) {
    try {
      const doc = await moduleInfo(db, projectId)
      res.status(200).json(doc)
    } catch (error) {
      res.status(404).json({ error: "Not found" })
    }
  }

  // Request GPQ test item by natural sequence
  else if (req.method == 'GET' && item) {
    const response = getItem(parseInt(item))
    if (response) {
      res.status(200).json(response)
    } else {
      res.status(404).json({ error: "Not found" })
    }
  }

  // Request evidence info (optionally create on first)
  else if (req.method == 'GET' && fullname) {
    try {
      const doc = await db.collection(EVIDENCE_DB).findOne(
        { projectId: projectId, personaId: personaId},
        { projection: defaultProjection}
      )

      if (doc !== null) {
        console.log(doc)
        res.status(200).json(doc)
      } else {
        const mod_ = await moduleInfo(db, projectId)
        const doc_ = newEvidenceDoc(license, projectId, personaId, fullname, mod_.items, mod_.maxTime)
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
          sequence:   rs["ops"][0]["sequence"],
        })
      }
    } catch (error) {
      res.status(404).json({ error: "Not found" })
    }
  }

  // Request evidence sequence
  else if (req.method == 'GET' && sequence) {
    console.log(req.query)
    try {
      const doc = await db.collection(EVIDENCE_DB).findOne(
        { projectId: projectId, personaId: personaId},
        { projection: {_id: 0, sequence: 1}}
      )
      const sequence = sequenceArray(doc.sequence)
      console.log(sequence)
      res.status(200).json(sequence)
    } catch (error) {
      res.status(404).json({ error: "Not found" })
    }
  }

  // On init, start, and pause events
  else if (req.method == 'PUT') {
    const body = JSON.parse(req.body)
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
        { projectId: projectId, personaId: personaId },
        { $set: props },
        { projection: defaultProjection }
      )
      console.log("Hasil PUT: ", doc["value"])
      res.status(200).json(doc["value"])
    } catch (error) {
      res.status(500).json({ message: "Could not update database." })
    }
  }

  // On adding evidence
  else if (req.method == "POST") {
    const body = JSON.parse(req.body)
    const { seq, wbSeq, items, elm, statement, lastTouched } = body
    const date = new Date()
    const ts = date.getTime()
    const elapsed = ts - lastTouched
    const finished = seq == items ? ts : null

    try {
      const doc = await db.collection(EVIDENCE_DB).findOneAndUpdate(
        { projectId: projectId, personaId: personaId },
        {
          $inc: { done: 1, netTime: elapsed, remains: -elapsed },
          $set: { touched: ts, finished: finished, updatedAt: date },
          $push: { rows: {
            seq: seq,
            wbSeq: wbSeq,
            elm: elm,
            statement: statement,
            saved: ts,
            elapsed: elapsed,
          }}
        },
        { projection: defaultProjection }
      )
      res.status(200).json(doc["value"])
    } catch (error) {
      res.status(500).json({ message: "Server error" })
    }
  }

  else {
    res.status(401).json({ error: "Unauthorized" })
  }
}

/**
 *
 * http://localhost:3003/api/gpq
 * ?license=sdi
 * &fullname=Atik%20Suniar
 * &personaId=5f786e76d11c7699cf09e596
 * &projectId=5f786ad74719017521867285
 *
 * ?license=sdi&personaId=5f786e76d11c7699cf09e596&projectId=5f786ad74719017521867285
 * ?license=sdi&personaId=5f786e76d11c7699cf09e596&projectId=5f786ad74719017521867285&sequence=1
 * ?license=sdi&personaId=5f786e76d11c7699cf09e596&projectId=5f786ad74719017521867285&module=gpq
 * ?license=sdi&personaId=5f786e76d11c7699cf09e596&projectId=5f786ad74719017521867285&fullname=Atik%20Suniar
 * ?license=sdi&projectId=5f786ad74719017521867285&personaId=5f786ee0d11c7699cf09e598&item=1
*/