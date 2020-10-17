import withSession from 'lib/session'
import { DefaultProjection, EvidenceTemplate } from 'lib/evidence'
import { connect } from 'lib/database'
// import { INFO } from 'lib/sjt-asn-1.0'
import { ACESModule } from 'lib/modules'

const EVIDENCE_DB = "ev_sjt"

export default withSession(async (req, res) => {
  const user = req.session.get("user")

  // Throw unauthorized access
  if (!user || !user.isLoggedIn) {
    res.status(401).json({ message: "Unauthorized" })
    return
  }

  const { license, project, persona, fullname, items, maxTime, create } = req.query
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
        { projection: DefaultProjection }
      )

      if (doc != null) {
        console.log("Sending RESPONSE...")
        res.status(200)
        res.json(doc)
      } else {
        // Only create if requested
        if (license && fullname && create) {
          console.log("Creating object...")
          // const info = ACESModule('sjt-asn-1.0', 'info')
          // console.log("infor", info)
          const props = EvidenceTemplate(license, project, persona, fullname, items, maxTime)
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
          }
          console.log("Sending RESPONSE...")
          res.status(200)
          res.json(rsdoc)
        } else {
          console.log("Sending NOT FOUND...")
          res.status(404).json({ message: "Not found" })
        }
      }
    } catch (error) {
      res.status(404).json({ error: "Not found" })
    }
  }

  // Request to persist evidence
  else if (req.method == "POST") {
    const body = JSON.parse(req.body)
    const { seq, mostElm, mostText, leastElm, leastText, lastTouched } = body
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
            mostElm: mostElm,
            mostText: mostText,
            leastElm: leastElm,
            leastText: leastText,
            saved: ts,
            elapsed: elapsed,
          }}
        },
        { projection: DefaultProjection, returnOriginal: false }
      )
      console.log("Sending POST RESPONSE...")
      const rsdoc = doc["value"]
      console.log(rsdoc)
      res.status(200)
      res.json(rsdoc)
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
        { projection: DefaultProjection, returnOriginal: false },
      )

      console.log("Sending PUT RESPONSE...")
      res.status(200).json(doc["value"])
    } catch (error) {
      res.status(500).json({ message: "Could not update database." })
    }
  }

  // Everything else will return 400
  else {
    res.status(400).json({ message: "Bad request" })
  }
})
