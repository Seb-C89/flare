const os = require('os'); // remove
import { fileTypeFromBuffer } from 'file-type'
const fs = require('fs')
const busboy = require('busboy');
const path = require('path');
var concat = require('concat-stream')
import { insert_post } from '../../../utils/db.js'

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
	req.body.files = []

	const bb = busboy({ headers: req.headers });
		// for each uploaded file
		bb.on('file', (name, file, info) => {
			const { filename, encoding, mimeType } = info;
			
			// save only file uploaded in the good field
			if(name === field_for_file ){
				console.log(`File [${name}]: filename: %j, encoding: %j, mimeType: %j`, filename, encoding, mimeType);
				let filename = Date.now().toString()+Math.trunc(Math.random()).toString()
				let filepath = path.join(save_dir, filename)
				
				//save file on hard drive
				//file.pipe(fs.createWriteStream(filepath))
				
				//concat file
				var concatStream = concat({ encoding: 'buffer' }, (file)=>{
					if(file.length){
						fs.writeFile(filepath, file, (err) => {
							if (err) throw err;
							console.log('The file has been saved!');
						});
						
						// file attribut
						let ext = null

						// analyse file
						await fileTypeFromBuffer(file)
							.then((res) => {
								ext = res.ext
								//fs.rename(files.file.filepath, files.file.filepath+'_'+res.ext)
							}).catch(() => {
								console.log('Failled to detecte file type for'+filepath)
							})
						
						// add file to the body
						req.body.files.push({
							name: filename,
							ext: ext,
							client_name: info.filename
						})
					}
					else
						console.log("FILE IS EMPTY")
				})
				file.pipe(concatStream)
				
				// listen file event
				/*file.on('data', (data) => {
					console.log(`File [${name}] got ${data.length} bytes`);
				}).on('end', async () => {

				}).on('close', () => {
					console.log(`File [${name}] done`);
				});*/
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
			
		bb.on('close', async () => {
			console.log('Done parsing form!');
			// MYSQL
			await insert_post(req.body.game, req.body.files)
				.then(()=>{
					res?.status(202).end()
				})
				.catch(()=>{
					res?.status(503).end()
				})
		});

    try {
		req.pipe(bb);
	} catch (e) {
		console.log("BUSBOY EXECPTION")
		res?.status(500).end()
	}

	console.log(req.body)
	//await insert_post(post, file)
	res?.json('file recieved')
}
