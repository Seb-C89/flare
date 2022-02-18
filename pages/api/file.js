import { withSessionRoute } from "../../../utils/withIronSession"

export default withSessionRoute(async (req, res) => {
	if(req.session.admin){
	console.log(req.body)
		
	let { files_without_post, posts_without_files, files_lost, upload_files_not_registered, public_files_not_registered } = req.query

	for(f of files_without_post){
		
	}

	/*[Object: null prototype] {
	files_without_post: [ 'fdbhftnhjdf', 'fwsdbhw' ],
	files_lost: [ 'fdbhftnhjdf', 'fwsdbhw', 'hvgcn' ]
	}*/

	} else
		res.status(404).end()
})