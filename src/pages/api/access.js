import { connect } from 'utils/database'

/**
 * To check project, use req body {"code":"sdi-abk"}
 * To retrive project module info, use {"code":"sdi-abk","module":"gpq"}
 */
export default async (req, res) => {
  try {
    const { code, module } = req.query
    console.log(code, module)

    // If code starts with #, it is member. Otherwise persona.
    const type = code.charAt(0) == '#' ? 'member' : 'persona'
    const path = type == 'persona' ? code : code.substr(1)

    const { db } = await connect()
    const projection = module ? {
      _id: 1, path: 1,
      modules : { $elemMatch: { type: module }}
    } : {_id: 1, path: 1}
    const rs = await db.collection('projects').findOne(
      { path: path },
      { projection: projection }
    )
    const doc = module ? rs.modules[0] : { _id: rs._id.toString(), path: path, type: type }
    console.log(doc)
    res.status(200)
    res.json(doc)
  } catch (error) {
    res.status(404).json({ message: "Kode akses salah." })
  }
}