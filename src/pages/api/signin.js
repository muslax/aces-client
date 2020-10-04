import withSession from 'lib/session'
import { connect } from 'utils/database'

const bcrypt = require('bcryptjs')

export default withSession(async (req, res) => {
  const { username, password, project, path, loginType } = await req.body
  const collection = loginType == 'persona' ? 'personas' : 'project_members'
  console.log(req.body)

  try {
    const { db } = await connect()
    const person = await db.collection(collection).findOne({ username: username })
    const verified = bcrypt.compareSync(password, person.hashed_password)
    if (verified) {
      const user = loginType == 'persona' ? {
        isLoggedIn: true,
        projectId: project,
        path: path,
        type: loginType,
        _id: person._id,
        fullname: person.fullname,
        username: person.username,
        tests: person.tests,
        testsPerformed: person.testsPerformed,
        simulations: person.simulations,
      } : {
        isLoggedIn: true,
        projectId: project,
        path: path,
        type: loginType,
        _id: person._id,
        fullname: person.name,
        username: person.username,
        role: person.role,
      }
      req.session.set('user', user)
      await req.session.save()
      res.json(user)
    }
    else {
      res.status(404).json({ message: "Username/password salah." })
    }
} catch (error) {
    res.status(404).json({ message: "Username/password salah." })
  }
})