import { docInfo, firstElms, secondElms } from 'lib/gpq-1.0'

export default async (req, res) => {
  try {
    const seq = parseInt(req.query["seq"])
    if (seq && seq > 0) {
      const response = {
        wbSeq: seq,
        contents: [
          {elm: firstElms[seq -1][0], text: firstElms[seq -1][1]},
          {elm: secondElms[seq -1][0], text: secondElms[seq -1][1]},
        ]
      }
      res.status(200)
      res.json(response)
    } else {
      res.status(200)
      res.json(docInfo)
    }

  } catch (error) {
    res.status(404).json({ message: "Not found." })
  }
}
