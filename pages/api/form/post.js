const os = require('os'); // remove
import { fileTypeFromFile } from 'file-type'
const fs = require('fs')
const busboy = require('busboy');
const path = require('path');
var concat = require('concat-stream')
//import { insert_post } from '../../../utils/db.js'

export const config = {
	api: {
		bodyParser: false,
	},
};

export default async function endpoint(req, res) {
	let field_for_file = "file" // name of the field containing the files
	let save_dir = "uploads/"
	//console.log(req)
	/*if(!(req.is("multipart/form-data"))){
		res?.status(202).end()
		return 
	}*/

	if(!req.hasOwnProperty('body'))
		req.body = {}

	const bb = busboy({ headers: req.headers });
		// for each uploaded file
		bb.on('file', (name, file, info) => {
			const { filename, encoding, mimeType } = info;
			
			// save only file uploaded in the good field
			if(name === field_for_file ){
				console.log(`File [${name}]: filename: %j, encoding: %j, mimeType: %j`, filename, encoding, mimeType);
				let filepath = path.join(save_dir, Date.now().toString()+Math.trunc(Math.random()).toString())
				
				//save file on hard drive
				//file.pipe(fs.createWriteStream(filepath))
				
				//concat file
				var concatStream = concat({ encoding: 'buffer' }, (file)=>{
					if(file.length)
						console.log("file can be saved")
					else
						console.log("FILE IS EMPTY")
				})
				file.pipe(concatStream)
				
				// listen file event
				file.on('data', (data) => {
					console.log(`File [${name}] got ${data.length} bytes`);
				}).on('end', async () => {
					/*// file attribut
					let ext = null

					// analyse file
					await fileTypeFromFile(filepath)
						.then((res) => {
							ext = res.ext
							//fs.rename(files.file.filepath, files.file.filepath+'_'+res.ext)
						}).catch(() => {
							console.log('Failled to detecte file type for'+filepath)
						})
					
					// add file to the list
					if(!Array.isArray(req.body[name]))
						req.body[name] = []
					req.body[name].push({
						path: filepath,
						ext: ext,
						client_name: info.filename
					})*/

				}).on('close', () => {
					console.log(`File [${name}] done`);
					/*console.log(file.read())*/
				});
			}
			else{
				console.log(`file ${name} discarded`)
				file.resume() //ignore file
			}
		});
		
		// for each field
		bb.on('field', (name, val, info) => {
			console.log(`Field [${name}]: value: %j`, val);
			req.body[name] = val
		});
			
		bb.on('close', () => {
			console.log('Done parsing form!');
			//res.writeHead(303, { Connection: 'close', Location: '/' });
			//res.end();
		});

    req.pipe(bb);

	console.log(req.body)
	//await insert_post(post, file)
	res?.json('file recieved')
}
