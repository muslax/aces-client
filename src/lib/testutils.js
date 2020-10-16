import fetchJson from 'lib/fetchJson'

export function getModule(project, type) {
  for(let i = 0; i < project?.modules.length; i++) {
    if (project.modules[i]['type'].toLowerCase() == type.toLowerCase())
      return project.modules[i]
  }

  return null
}

export async function enterTest(url, progress) {
  // const url = buildApiUrl(user, {}) // Empty license, but OK
  const update = progress?.initiated ? false : true
  await fetchJson(url, {
    method: 'PUT',
      headers: {
        Accept: 'application/json',
      },
      body: JSON.stringify({ action: "init", update: update }),
  })

  const url1 = buildApiUrl(user, { fullname: user.fullname })
  mutate(url1)
}