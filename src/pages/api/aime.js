import withSession from 'lib/session'
import { DefaultProjection, EvidenceTemplate } from 'lib/evidence'
import { connect } from 'lib/database'
import { ACESModule } from "lib/modules";
// import { AIME_INFO, AIME_ITEMS, AIME_LIKERT } from "lib/aime-1.0";

// http://localhost:3003/api/aime?
// license=sdi&
// project=5f786ad74719017521867285&
// persona=5f786e76d11c7699cf09e596&
// fullname=Atik%20Suni


const EVIDENCE_DB = "ev_aime"

export default withSession(async (req, res) => {
  const user = req.session.get("user")
  if (!user || !user.isLoggedIn) {
    res.status(401).json({ message: "Unauthorized" })
    return
  }

  // slug is used to decide which module version to be used
  const {license, project, persona, fullname, slug, create} = req.query

  // Only accepts request with project, and persona queries
  if (!project || !persona) {
    res.status(400).json({ message: "Bad request" })
    return
  }

  const { db } = await connect()

  // Request for evidence info. When intended to optionally create new object
  // when it doesn't exist yet, license, fullname, and create must be supplied.\
  if (req.method == 'GET') {
    try {
      const doc = await db.collection(EVIDENCE_DB).findOne(
        { projectId: project, personaId: persona},
        { projection: DefaultProjection }
      )

      if (doc != null) {
        res.status(200)
        res.json(doc)
      } else {
        if (license && fullname && create) {
          console.log("Creating AIME evidence template...")
          const info = ACESModule(slug, "info")
          // const props = EvidenceTemplate(license, project, persona, fullname, AIME_INFO.items, AIME_INFO.maxTime)
          const props = EvidenceTemplate(license, project, persona, fullname, info.items, info.maxTime)
          const ndoc = await db.collection(EVIDENCE_DB).insertOne(props)
          const rsdoc = {
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
          }
          res.status(200)
          res.json(rsdoc)
        }
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
    const { seq, total, element, likert, stance, statement, lastTouched } = body
    const date = new Date()
    const ts = date.getTime()
    const elapsed = ts - lastTouched
    const finished = seq == total ? ts : null

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
        { projection: DefaultProjection, returnOriginal: false }
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
        { projection: DefaultProjection, returnOriginal: false },
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
