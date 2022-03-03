import { sql_query, get_file_from_post } from "../../../utils/db"

export default async function(req, res) {
	let { id } = req.query

	//TODO add WHERE status OK
	let data = id 	? await sql_query("SELECT * FROM post WHERE id > ? LIMIT ?", [id, parseInt(process.env.POST_PER_PAGE || 10)])
					: await sql_query("SELECT * FROM post LIMIT ?", parseInt(process.env.POST_PER_PAGE || 10))
	
	let posts = await Promise.all(data.map(async x => {
		x.date = x.date.valueOf()
		let file = await get_file_from_post(x.id)
					.then(data => data.map(f => {
						f.date = f.date.valueOf()
						return f
					}))
		return {
			post: x,
			file: file
		}
	}))

	res?.status(200).json(posts)
	return posts
}