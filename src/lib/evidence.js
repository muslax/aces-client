import { shuffle } from 'lib/utils'

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
  return {
    license: license,
    projectId: project,
    personaId: persona,
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
    rows: [],
    createdAt: new Date(),
    updatedAt: null,
  }
}

export function GPQEvidenceTemplate(license, project, persona, fullname, items, maxTime) {
  let arr = []
  for (let i=0; i<items; i++) { arr.push(i + 1) }
  const randomSeqs = shuffle(arr).join(' ')
  return {
    license: license,
    projectId: project,
    personaId: persona,
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