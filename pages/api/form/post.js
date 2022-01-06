const formidable = require('formidable');
const os = require('os'); // remove
import { fileTypeFromFile } from 'file-type'
const fs = require('fs')
import { insert_post } from '../../../utils/db.js'

export const config = {
	api: {
		bodyParser: false,
	},
};

export default async function endpoint(req, res) {
	const form = formidable({ 
		multiples: false,
		uploadDir: "uploads/",
		//fileWriteStreamHandler: aaa // function who receive files data and save it
	});

	form.parse(req, async (err,fields,files) => {
		console.log(err)
		console.log(fields)
		console.log(files.file.size)
		console.log(os.tmpdir())
		let res = await fileTypeFromFile(files.file.filepath)
			.then((res) => {
				console.log(res.mime)
				console.log(res.ext)
				//fs.rename(files.file.filepath, files.file.filepath+'_'+res.ext)
				return res.ext
			})
			.catch(() => {
				console.log('Failled to detecte file type')
			})
		//console.log(res.mime)
		//console.log(res.ext)
		let post = {
			game: fields.game,
			image: files.file.newFilename,
		}
		let file = [{
			name: files.file.newFilename,
			post: 999
		}]
		insert_post(post, file)
	})

	res.json('file recieved')
}
