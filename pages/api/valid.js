import { withSessionRoute } from "../../utils/withIronSession"
import { sql_query, get_file_from_post } from "../../utils/db"
import { renameSync } from 'fs'

export default withSessionRoute(async (req, res) => {
	if(req.session.admin){
		console.log(req.body)
		try{
			for(const p in req.body){
				let post = JSON.parse(p)
				switch(req.body[p]){
					case 'VAL':
						await sql_query("START TRANSACTION")
							.then(sql_query("SELECT * FROM post WHERE id=? AND game=?;", [post.id, post.game]))
							.then((data) => {
								sql_query("UPDATE post SET status='OK' WHERE id=?", data[0].id)
								.then(() => {
									get_file_from_post(data[0].id)
									.then(async (files) => {
										for(let file of files)
											try { renameSync(process.env.DIR_UPLOAD_IMG+file.name, process.env.DIR_PUBLIC_IMG+file.name) }
											catch { await sql_query("ROLLBACK") }
									})
								})
							})
							.then(async () => {
								await sql_query("COMMIT")
							})
							.catch(async (e) => {
								console.log(e)
								await sql_query("ROLLBACK")
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
		}
		res.status(202).end()
	} else
		res.status(404).end()
})