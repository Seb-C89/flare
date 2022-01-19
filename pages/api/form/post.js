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
	let nbr_files;
	let field_for_file = "file" // name of the field containing the files
	
	const form = formidable({ 
		multiples: true,
		uploadDir: "uploads/",
		allowEmptyFiles: false,
		filter: function ({name}) { // reject files not contained in the appropriate field
			nbr_files++;
			return name === field_for_file
		},
		//fileWriteStreamHandler: aaa // TODO function who receive files data and save it. (no intermediate file in hard disk)
	});

	form.parse(req, async (err,fields,files) => {
		console.log(err)
		console.log(fields)
		console.log(files)
		console.log(os.tmpdir())
		
		if(nbr_files === 1) // if there are only one file uploaded, the properties containing the files is not itterable...
			files[field_for_file] = [files[field_for_file]] // so put it in an array
		for(let f of files.file){
			await fileTypeFromFile(f.filepath)
			.then((res) => {
				f["ext"] = res.ext
				//fs.rename(files.file.filepath, files.file.filepath+'_'+res.ext)
			})
			.catch(() => {
				console.log('Failled to detecte file type for'+f.filepath)
			})
		}

		let post = {
			game: fields.game,
			check: fields.check ?? null,
		}

		let file = files.file.map(x => {
			return {ext, newFilename, originalFilename} = x
		})

		req.body = { ...post } // alter req.body for giving access to the legacy handler
		insert_post(post, file)
	})

	res.json('file recieved')
}
