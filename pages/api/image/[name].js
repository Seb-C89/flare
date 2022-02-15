import { withSessionRoute } from "../../../utils/withIronSession"
const fs = require('fs')
const path = require('path')
import { fileTypeFromFile } from 'file-type'

export default withSessionRoute(async (req, res) => {
	let { name } = req.query

	name = path.basename(name) // ensure that the client do not request file in other directory
	const { mime } = fileTypeFromFile("./uploads/"+name)

	if(/^image\//.test(mime)) // send only image/* MIME
		try {
			const file = fs.openSync("./uploads/"+name)
			const stat = fs.fstatSync(file)
			const stream = fs.createReadStream(null, {fd: file})
				stream.on('finish', () => {
					res.end()
				})
			
			res.setHeader('Content-Length', stat.size);
			res.setHeader('Content-Type', mime); // TODO MIME
			stream.pipe(res)
		} catch(e){
			console.log(e)
			res.status(404).end()
		}
	else
		res.status(404).end()
	
	//res.setHeader('Content-Disposition', 'attachment; filename=your_file_name');
});