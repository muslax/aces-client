import withSession from 'lib/session'
import { GPQEvidenceTemplate, GPQProjection } from 'lib/evidence'
import { connect } from 'lib/database'
import { ACESModule } from 'lib/modules'
// import { ACESModule } from 'lib/modules'
// import GPQ_1_0 from 'lib/gpq-1.0'

const EVIDENCE_DB = "ev_gpq"

// /api/gpq?
// license=sdi&
// project=5f786ad74719017521867285&
// persona=5f786e76d11c7699cf09e596

export default withSession(async (req, res) => {
  const user = req.session.get("user")

  // Throw unauthorized access
  if (!user || !user.isLoggedIn) {
    res.status(401).json({ message: "Unauthorized" })
    return
  }

  // const { license, projectId, personaId, fullname, module, sequence, item } = req.query
  const { license, project, persona, fullname, items, maxTime, create } = req.query
  // const { license, project, persona, fullname, slug, create } = req.query
  console.log("QUERY", req.query)

  // Only accepts request with project, and persona queries
  if (!project || !persona) {
    res.status(400).json({ message: "Bad request" })
    return
  }

  const { db } = await connect()

  // Request for evidence info. When intended to optionally create new object
  // when it doesn't exist yet, license, fullname, and create must be supplied.
  if (req.method == "GET") {
    try {
      const doc = await db.collection(EVIDENCE_DB).findOne(
        { projectId: project, personaId: persona },
        { projection: GPQProjection }
      )

      if (doc != null) {
        console.log("Sending RESPONSE...")
        res.status(200)
        res.json(doc)
      } else {
        // Only create if requested
        if (license && fullname && create) {
          console.log("Creating object...SSSSS")
          // ???? ACESModule wont run here ??????
          // const info =  ACESModule(slug, "info")
          // console.log(info)
          // const props = GPQEvidenceTemplate(license, project, persona, fullname, info.items, info.maxTime)
          const props = GPQEvidenceTemplate(license, project, persona, fullname, items, maxTime)
          console.log(props)
          const ndoc = await db.collection(EVIDENCE_DB).insertOne(props)
          const rsdoc = {
            projectId:  ndoc["ops"][0]["projectId"],
            personaId:  ndoc["ops"][0]["personaId"],
            fullname:   ndoc["ops"][0]["fullname"],
            initiated:  ndoc["ops"][0]["initiated"],
            started:    ndoc["ops"][0]["started"],
            finished:   ndoc["ops"][0]["finished"],
            touched:    ndoc["ops"][0]["touched"],
            maxTime:    ndoc["ops"][0]["maxTime"],
            netTime:    ndoc["ops"][0]["netTime"],
            remains:    ndoc["ops"][0]["remains"],
            items:      ndoc["ops"][0]["items"],
            done:       ndoc["ops"][0]["done"],
            sequence:   ndoc["ops"][0]["sequence"],
          }
          console.log("Sending RESPONSE...")
          res.status(200)
          res.json(rsdoc)
        }
      }
    } catch (error) {
      res.status(404).json({ error: "Not found" })
    }
  }

  // Request to persist evidence
  else if (req.method == "POST") {
    const body = JSON.parse(req.body)
    console.log("BODY", body)
    const { seq, wbSeq, elm, items, statement, lastTouched } = body
    const date = new Date()
    const ts = date.getTime()
    const elapsed = ts - lastTouched
    const finished = seq == items ? ts : null

    console.log("TRYING.....")
    console.log(GPQProjection)

    try {
      const rs = await db.collection(EVIDENCE_DB).findOneAndUpdate(
        { projectId: project, personaId: persona },
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
          }},
        },
        { projection: GPQProjection, returnOriginal: false }
      )
      const rsdoc = rs["value"]
      console.log("Sending POST RESPONSE...")
      console.log(rsdoc)
      res.status(200)
      res.json(rsdoc)
      // console.log("DOC.VALUE", rs)
      // res.status(200).json(rs["value"])
    } catch (error) {
      res.status(500).json({ message: "Could not persist user data" })
    }
  }

  // Request to save event
  else if (req.method == "PUT") {
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
        { projectId: project, personaId: persona },
        { $set: props },
        { projection: GPQProjection, returnOriginal: false },
      )
      console.log("Sending PUT RESPONSE...")
      res.status(200)
      res.json(doc["value"])
    } catch (error) {
      res.status(500).json({ message: "Could not update database." })
    }
  }

  // Everything else will return 400
  else {
    res.status(400).json({ message: "Bad request" })
  }
})

