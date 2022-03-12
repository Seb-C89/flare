import { withSessionRoute } from "../../../utils/withIronSession"
//import { rmSync } from "fs"
import { sql_query } from "../../../utils/db"

export default withSessionRoute(async (req, res) => {
	if(req.session.admin){
		/* ensure each property is an array and parse JSON for each element */
		for(const p in req.body){
			if(!Array.isArray(req.body[p]))
				req.body[p] = [req.body[p]]

			req.body[p] = req.body[p].map(e => JSON.parse(e))
		}
		
		let { files_without_post, posts_without_files, files_lost, files_not_registered } = req.body

		/* posts_without_files */
		for(const x of posts_without_files){
			sql_query("SELECT * FROM post WHERE id=? AND game=?", [x.id, x.game])
			//sql_query("DELETE FROM file WHERE id=? AND name=?", [x.id, x.name])
				.then(data => console.log("POST DELETED", data))
				.catch(e => {console.log(e); /*return res.status(404).end()*/})
		}
		
		/* files_without_post */
		for(const x of files_without_post){
			sql_query("SELECT * FROM file WHERE id=? AND name=?", [x.id, x.name])
			//sql_query("DELETE FROM file WHERE id=? AND name=?", [x.id, x.name])
				.then(data => {
					console.log("FILES WITHOUT POST DELETED", data)
					// TODO delete file, but now the directory of the file is unknown (public or upload ?)
					//console.log(`${path} removed`)
					//rmSync(f.path)
				})
			.catch(e => {console.log(e); /*return res.status(404).end()*/})
		}

		/* files_lost */
		for(const x of files_lost){
			sql_query("SELECT * FROM file WHERE id=? AND name=?", [x.id, x.name])
			//sql_query("DELETE FROM file WHERE id=? AND name=?", [x.id, x.name])
				.then(data => console.log("FILE LOST DELETED", data))
				.catch(e => {console.log(e); /*return res.status(404).end()*/})
		}

		/* files_not_registered */
		try{
			for(const f of files_not_registered){
				switch(f.directory){
					case "upload":
						f.path = process.env.DIR_UPLOAD_IMG+f.name
						break;
					case "public":
						f.path = process.env.DIR_PUBLIC_IMG+f.name
						break;
					default:
						throw `Wrong directory: ${f.directory}`
				}
				console.log(`${f.path} removed`)
				//rmSync(f.path)
			}
		}catch(e){
			console.log(e)
			//return res.status(404).end()
		}

		res.status(202).end()
	} else
		res.status(404).end()
})
