
function test() {
  fs.readFile(__dirname + '/../public/sitemap.xml', 'utf8', function(err, data) {
    if (!err) {
        console.log(data);
    }
})
}

export default async function NXML() {
  // const fs = test()
  const raw = await fetch("https://fakerestapi.azurewebsites.net/api/Authors", {
    "Content-Type": "application/xml; charset=utf-8"
  })

  return (
    <div className="max-w-2xl mx-auto my-12 text-sm font-light">
      <h1 className="text-lg">Node Js XML</h1>
      {/* <pre className="pre">{JSON.stringify(raw, null, 2)}</pre> */}
      {/* {raw && raw.map(x => {
        <p key={x} className="">{x.FirstName}</p>
      })} */}
    </div>
  )
}