import { sql_query } from "../../../utils/db"

export default async function(req, res) {
	let { id } = req.query

	let data = id 	? await sql_query("SELECT * FROM posts WHERE id > ? LIMIT 10", id)
					: await sql_query("SELECT * FROM posts LIMIT 10")
	
	res.status(200).json(data)
}