import { withSessionRoute } from "../../../utils/withIronSession"
const fs = require('fs')
import { get_file_by_name } from "../../../utils/db"

export default withSessionRoute(async (req, res) => {
	let { name } = req.query

	{} await get_file_by_name(name)
		.then(data => {
			return data
		})
		.catch(err => {
			
		})


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
	} catch (e){
		console.log(e)
		res.status(404).end()
	}
	
	//res.setHeader('Content-Disposition', 'attachment; filename=your_file_name');
	//res.write(file, 'binary');
	//res.end()
});