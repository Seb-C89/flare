import { withSessionRoute } from "../../../../utils/withIronSession"
const fs = require('fs')
const path = require('path')
import { fileTypeFromFile } from 'file-type'

export default withSessionRoute(async (req, res) => {
	let { name, directory } = req.query
	let file_path
	console.log(name)
	name = path.basename(name) // ensure that the client do not request file in other directory

	if(directory === "public")
		file_path = process.env.DIR_PUBLIC+"/img/"+name
	else if(directory === "upload")
		if(req.session.admin)
			file_path = process.env.DIR_UPLOAD+"/img/"+name
	
	try {
		const { mime } = fileTypeFromFile("../../../../"+file_path)
		console.log(mime)
		if(/^image\//.test(mime)){ // send only MIME: image/*
			const file = fs.openSync("../../../../"+file_path)
			const { size } = fs.fstatSync(file)
			const stream = fs.createReadStream(null, {fd: file})
				stream.on('finish', () => {
					res.end()
				})

			res.setHeader('Content-Length', size);
			res.setHeader('Content-Type', mime);
			stream.pipe(res)
		} else throw 'not an image';
	} catch(e){
		console.log(e)
		res.status(404).end()
	}


	/*const { mime } = fileTypeFromFile(file_path)
	if(/^image\//.test(mime)){ // send only MIME: image/*
		try {
			const file = fs.openSync(file_path)
			const { size } = fs.fstatSync(file)
			const stream = fs.createReadStream(null, {fd: file})
				stream.on('finish', () => {
					res.end()
				})

			res.setHeader('Content-Length', size);
			res.setHeader('Content-Type', mime);
			stream.pipe(res)
		} catch(e){
			console.log(e)
			res.status(404).end()
		}
	} else
		res.status(404).end()*/
});