import withSession from 'lib/session'
import { ObjectID } from 'mongodb'
import { connect } from 'utils/database'

const bcrypt = require('bcryptjs')

export default withSession(async (req, res) => {
  const { username, password, project, path, loginType } = await req.body
  const collection = loginType == 'persona' ? 'personas' : 'project_members'
  console.log("signin.req.body", req.body)

  try {
    const { db } = await connect()
    const person = await db.collection(collection).findOne({ username: username })
    const verified = bcrypt.compareSync(password, person.hashed_password)
    if (verified) {
      // Load project title
      const projects = await db.collection('projects').find({ _id: ObjectID(project) }).project({ "title": 1 }).toArray()
      // console.log(projects)
      const user = loginType == 'persona' ? {
        isLoggedIn: true,
        _id: person._id,
        license: person.license,
        projectId: project,
        projectTitle: projects[0].title,
        path: path,
        type: loginType,
        fullname: person.fullname,
        username: person.username,
        tests: person.tests,
        testsPerformed: person.testsPerformed,
        simulations: person.simulations,
      } : {
        isLoggedIn: true,
        license: person.license,
        projectId: project,
        projectTitle: projects[0].title,
        path: path,
        type: loginType,
        _id: person._id,
        fullname: person.name,
        username: person.username,
        role: person.role,
      }
      console.log(user)
      req.session.set('user', user)
      req.session.set("path", "default-path")
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

/*
You can call session.set("name", "value");
and await http://session.save() again.
Is that what you're looking for?
*/
