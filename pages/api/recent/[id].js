import { get_recent, get_file_from_post } from "../../../utils/db"

export default async function api_recent(req, res) {
	let { id } = req.query

	let data = await get_recent(id)
	
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