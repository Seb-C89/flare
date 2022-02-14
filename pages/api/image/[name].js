import { withSessionRoute } from "../../../utils/withIronSession"
const fs = require('fs')

export default withSessionRoute(async (req, res) => {
	let { name } = req.query

	let files_in_uploads = fs.readdirSync("uploads")

	if(files_in_uploads.includes(name)){ // ensure that the file requested is in the desired directory and avoid requesting other file
		try {
			const file = fs.openSync("./uploads/"+name)
			const stat = fs.fstatSync(file)
			const stream = fs.createReadStream(null, {fd: file})
				stream.on('finish', () => {
					res.end()
				})
			res.setHeader('Content-Length', stat.size);
			res.setHeader('Content-Type', 'image/jpg'); // TODO MIME
			stream.pipe(res)
		} catch(e){
			console.log(e)
			res.status(404).end()
		}
	} else
		res.status(404).end()
	
	//res.setHeader('Content-Disposition', 'attachment; filename=your_file_name');
});