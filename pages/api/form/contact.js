import { insert_message } from "../../../utils/db.js"

export default async function handler(req, res) {
	const { message, mail } = req.body
	console.log(req.body)
	console.log(message)
	console.log(mail)
	if( message && mail)
		await insert_message(message, mail).then(() => {
										console.log("inserting message "+message+"from "+mail)
										return res.status(202).end()
									}).catch(() => {
										console.error("when inserting message "+message+"from "+mail)
										return res.status(500).end()
									})
	else
		return res.status(400).end();
}
