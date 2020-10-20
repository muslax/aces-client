import { shuffle } from 'lib/utils'
import { func } from 'prop-types'

export const DefaultProjection = {
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

export const GPQProjection = {
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
  sequence: 1,
}

export function EvidenceTemplate(license, project, persona, fullname, items, maxTime) {
  items = parseInt(items)
  maxTime = parseInt(maxTime)
  return {
    license: license,
    projectId: project,
    personaId: persona,
    fullname: fullname,
    initiated: new Date().getTime(), // created and initiated
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

export function GPQEvidenceTemplate(license, project, persona, fullname, items, maxTime) {
  items = parseInt(items)
  maxTime = parseInt(maxTime)
  let arr = []
  for (let i=0; i<items; i++) { arr.push(i + 1) }
  const randomSeqs = shuffle(arr).join(' ')
  return {
    license: license,
    projectId: project,
    personaId: persona,
    fullname: fullname,
    initiated: new Date().getTime(), // created and initiated
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

export function Intray2Template(license, project, persona, fullname) {
  return {
    license: license,
    projectId: project,
    personaId: persona,
    fullname: fullname,
    initiated: new Date().getTime(), // created and initiated
    started: null,
    finished: null,
    touched: null,
    maxTime: maxTime,
    netTime: 0,
    remains: maxTime,
    items: items,
    task1: {
      info: "t = tahap",
      t1: "",  t2: "",  t3: "",
      started: null, saved: null, elapsed: 0,
    },
    task2: {
      info: "t = tindakan/inisiatif",
      t1: "", t2: "", t3: "", t4: "", t5: "",
      started: null, saved: null, elapsed: 0,
    },
    task3: {
      info: "t = tindakan/inisiatif",
      t1: "", t2: "", t3: "", t4: "", t5: "",
      started: null, saved: null, elapsed: 0,
    },
    task4: {
      info: "t = topik penugasan, p = peruntukan peran",
      t1: "", t2: "", t3: "", t4: "", p1: "", p2: "", p3: "", p4: "",
      started: null, saved: null, elapsed: 0,
    },
    task5: {
      info: "i = topik/informasi",
      i1: "", i2: "",  i3: "", i4: "",  i5: "",
      started: null, saved: null, elapsed: 0,
    },
    task6: {
      info: "u = upaya/inisiatif",
      u1: "", u2: "", u3: "", u4: "", u5: "",
      started: null, saved: null, elapsed: 0,
    },
    task7: {
      info: "u = usulan, a = alasan",
      u1: "", u2: "", u3: "", u4: "", a1: "", a2: "", a3: "", a4: "",
      started: null, saved: null, elapsed: 0,
    },
    task8: {
      info: "w1 = wajib, e1 = efektif 1, e2 = efektif 2, t1 = tidak efektif 1, t2 = tidak fektif 2",
      w1: "", e1: "", e2: "", t1: "", t2: "",
      started: null, saved: null, elapsed: 0,
    },
    task9: {
      info: "u = upaya/inisiatif",
      u1: "", u2: "", u3: "", u4: "", u5: "",
      started: null, saved: null, elapsed: 0,
    },
    createdAt: new Date(),
    updatedAt: null,
  }
}

export function Intray2Body() {
  return {
    task1: { t1: "", t2: "", t3: "" },
    task2: { t1: "", t2: "", t3: "", t4: "", t5: "" },
    task3: { t1: "", t2: "", t3: "", t4: "", t5: "" },
    rask4: { t1: "", t2: "", t3: "", t4: "", p1: "", p2: "", p3: "", p4: "" },
    task5: { i1: "", i2: "", i3: "", i4: "", i5: "" },
    task6: { u1: "", u2: "", u3: "", u4: "", u5: "" },
    task7: { u1: "", u2: "", u3: "", u4: "", a1: "", a2: "", a3: "", a4: "" },
    task8: { w1: "", e1: "", e2: "", t1: "", t2: "" },
    task9: { u1: "", u2: "", u3: "", u4: "", u5: "" },
  }
}