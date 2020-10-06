export default async function fetchPost(url, body) {
  console.log(body)
  const response = await fetch(url, {
    method: 'POST',
    headers: { Accept: 'application/json' },
    body: JSON.stringify(body)
  })
  return response.json()
}