import { withSessionRoute } from "../../../utils/withIronSession"
import { sql_query, get_file_from_post } from "../../../utils/db"
import { renameSync } from 'fs'

export default withSessionRoute(async (req, res) => {
	if(req.session.admin){
		try{
			for(const p in req.body){
				let post = JSON.parse(p)
				switch(req.body[p]){
					case 'VAL':
						await sql_query("START TRANSACTION")
							.then(await sql_query("UPDATE post SET status='OK' WHERE id=? AND game=?", [post.id, post.game]))
								.then(async () => {
									await get_file_from_post(post.id)
										.then(async (files) => {
											for(let file of files)
												renameSync(process.env.DIR_UPLOAD_IMG+file.name, process.env.DIR_PUBLIC_IMG+file.name)
										})
								})
							.then(async () => {
								await sql_query("COMMIT")
								return res.status(202).end()
							})
							.catch(async (e) => {
								console.log("SQL", e)
								await sql_query("ROLLBACK")
								return res.status(500).end()
							})
						break;
					case 'DEL':
						await sql_query("UPDATE post SET status='DEL' WHERE id=? AND game=?;", [post.id, post.game]) // TODO delete file ? move recycle bin ?
							.catch((e) => console.log(e))
						break;
					default:
						console.log("NOTHING")
						break;
				}
			}
		} catch(e) {
			console.log(e)
			return res.status(500).end()
		}
		return res.status(202).end()
	} else
		return res.status(404).end()
})