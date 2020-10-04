import { connect } from 'utils/database'

export default async (req, res) => {
  try {
    const { code } = await req.body
    // If code starts with #, it is member
    // Otherwise persona
    const type = code.charAt(0) == '#' ? 'member' : 'persona'
    const path = type == 'persona' ? code : code.substr(1)
    const { db } = await connect()
    const projection = {_id: 1, path: 1}
    const docs = await db.collection('projects').find({ path: path }).project(projection).toArray()
    console.log("docs", docs)
    if (docs.length > 0) {
      const doc = { _id: docs[0]._id.toString(), path: docs[0].path, type: type }
      console.log(doc)
      res.status(200)
      res.json(doc)
    } else {
      res.status(404).json({ message: "Kode akses salah." })
    }
  } catch (error) {
    res.status(404).json({ message: "Kode akses salah." })
  }
}