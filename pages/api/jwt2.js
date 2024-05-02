export default async function test (req, res) {
	console.log(req.headers["cookie"])
	console.log(req.cookies)
	
	res.status(200)
	res.json(req.headers)
}