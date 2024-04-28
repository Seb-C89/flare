export default async function test (req, res) {
	res.status(200)
	res.json(req.headers)
}