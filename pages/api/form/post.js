const os = require('os'); // remove
import { fileTypeFromFile } from 'file-type'
const fs = require('fs')
const busboy = require('busboy');
//import { insert_post } from '../../../utils/db.js'

export const config = {
	api: {
		bodyParser: false,
	},
};

export default async function endpoint(req, res) {
	let field_for_file = "file" // name of the field containing the files
	//console.log(req)
	/*if(!(req.is("multipart/form-data"))){
		res?.status(202).end()
		return 
	}*/

	const bb = busboy({ headers: req.headers });
		
		bb.on('file', (name, file, info) => {
			const { filename, encoding, mimeType } = info;
			
			if(name === field_for_file ){
				console.log(`File [${name}]: filename: %j, encoding: %j, mimeType: %j`, filename, encoding, mimeType);
				/*const saveTo = path.join(os.tmpDir(), `busboy-upload-${random()}`);
      			file.pipe(fs.createWriteStream(saveTo));*/
			}
			else{
				console.log(`file ${name} discarded`)
				file.resume()
			}
				
			file.on('data', (data) => {
				console.log(`File [${name}] got ${data.length} bytes`);
			}).on('close', () => {
				console.log(`File [${name}] done`);
				console.log()
			});
		});
			
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
