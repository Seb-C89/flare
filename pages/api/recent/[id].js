import { sql_query, get_file_from_post } from "../../../utils/db"

export default async function(req, res) {
	let { id } = req.query

	let data = id 	? await sql_query("SELECT * FROM post WHERE id > ? LIMIT 10", id)
					: await sql_query("SELECT * FROM post WHERE LIMIT 10")
	
	let post = await Promise.all(data.map(async x => {
		let file = await get_file_from_post(x.id)
		return {
			posts: x,
			file: file
		}
	}))

	res.status(200).json(post)
}