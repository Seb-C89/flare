//const formidable = require('formidable');
import formidable from 'formidable';
const os = require('os'); // remove
import { fileTypeFromFile } from 'file-type'
const fs = require('fs')
//import { insert_post } from '../../../utils/db.js'

export const config = {
	api: {
		bodyParser: false,
	},
};

export default async function endpoint(req, res) {
	let field_for_file = "file" // name of the field containing the files
	
	const form = formidable({ 
		multiples: true,
		uploadDir: "uploads/",
		allowEmptyFiles: false,
		filter: function ({name}) { // reject files not contained in the appropriate field
			console.log("name"+name+"=")
			console.log(name === field_for_file)
			return name == field_for_file
		},
		//fileWriteStreamHandler: aaa // TODO function who receive files data and save it. (no intermediate file in hard disk)
	});

	form.parse(req, async (err,fields,files) => {
		if(err)
			console.log("PARSE ERROR")
		console.log(fields)
		console.log(files)
		console.log(os.tmpdir())
		
		// Need formidable 3.x https://github.com/node-formidable/formidable/issues/400
		// Else if there are one file, the files propertie is not an array with one file bur directly the file obj and break the while
		for(const f of files[field_for_file] || []){
			await fileTypeFromFile(f.filepath)
			.then((res) => {
				f["ext"] = res.ext
				//fs.rename(files.file.filepath, files.file.filepath+'_'+res.ext)
			})
			.catch(() => {
				console.log('Failled to detecte file type for'+f.filepath)
			})
		}

		let file/* = files[field_for_file]?.map(x => {
			return {ext, newFilename, originalFilename} = x
		})*/

		req.body = { ...fields, file } // add fields and files to req.body for giving access to the legacy handler
	})

	console.log(req.body)
	//await insert_post(post, file)
	res?.json('file recieved')
}
