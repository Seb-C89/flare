import { withSessionRoute } from "../../utils/withIronSession"
import { rm } from "fs"

export default withSessionRoute(async (req, res) => {
	if(req.session.admin){
		console.log("RECEIVED")
		console.log(req.body)

		/* ensure each property is an array and parse JSON for each element */
		for(const p in req.body){
			if(!Array.isArray(req.body[p])){
				console.log("become array")
				req.body[p] = [req.body[p]]
			}

			req.body[p] = req.body[p].map(e => {
				console.log("aaaaaaaaaa", e)
				console.log(JSON.parse(e))
				return JSON.parse(e)
			})
		}

		console.log(req.body)
		
		let { files_without_post, posts_without_files, files_lost, files_not_registered } = req.body

		for(const f of files_not_registered){
			try{
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
			}catch(e){
				console.log(e)
			}
		}

		/*[Object: null prototype] {
		files_without_post: [ 'fdbhftnhjdf', 'fwsdbhw' ],
		files_lost: [ 'fdbhftnhjdf', 'fwsdbhw', 'hvgcn' ]
		}*/
		res.status(202).end()
	} else
		res.status(404).end()
})