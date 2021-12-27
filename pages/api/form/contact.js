import { insert_message } from "../../../utils/db.js"

export default async function handler(req, res) {
	const { message, reply_to } = req.body
	console.log(req.body)
	console.log(message)
	console.log(reply_to)
	if( message && reply_to)
		await insert_message(message, reply_to).then(() => {
										console.log("inserting message "+message+"from "+reply_to)
										return res.status(202).end()
									}).catch(() => {
										console.error("when inserting message "+message+"from "+reply_to)
										return res.status(500).end()
									})
	else
		return res.status(400).end();
}
