import { fileTypeFromBuffer } from 'file-type'
const fs = require('fs')
const busboy = require('busboy');
const path = require('path');
var concat = require('concat-stream') // entiere file in buffer, like in Multer
import { insert_post } from '../../../utils/db.js'
import { withSessionRoute, unseal_mail_perm } from '../../../utils/withIronSession.js';

export const config = {
	api: {
		bodyParser: false,
	},
};

export default withSessionRoute(async (req, res) => {
	/* unseal mail_perm */
	if(!req.session?.mail_perm === true)
		if(req.query?.mail)
			await unseal_mail_perm(req, res)

	if(req.method === 'POST' && req.session?.mail_perm === true && req.session?.mail){
		try{
			let field_for_file = "file" // name of the field containing the files
			let save_dir = process.env.DIR_UPLOAD_IMG
			
			if(!req.hasOwnProperty('body'))
				req.body = {}
			req.body.files = []

			const bb = busboy({ headers: req.headers });
				// for each uploaded file
				bb.on('file', (name, file, info) => {
					// save only file uploaded in the good field
					if(name === field_for_file ){
						let filename = Date.now().toString()+Math.trunc(Math.random()).toString()
						let filepath = path.join(save_dir, filename)
									
						//concat file
						var concatStream = concat({ encoding: 'buffer' }, async (file)=>{
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
									name_client: info.filename
								})
							}
							else
								console.log("FILE IS EMPTY")
						})
						file.pipe(concatStream)
					}
					else{
						console.log(`file ${name} discarded`)
						file.resume() //ignore file
					}
				});
				
				bb.on('field', (name, val, info) => {
					console.log(`Field [${name}]: value: %j`, val);
					req.body[name] = val
				});
					
				bb.on('close', async () => {
					console.log('Done parsing form!');
					// MYSQL
					let post = {game: req.body.game}
						if(req.body?.name) post.user_name = req.body.name
						if(req.body?.check) post.check_box = true

					await insert_post(post, req.body.files, req.session.mail)
						.then(()=>{
							res.status?.(202).end()
						})
						.catch(()=>{
							res.status?.(503).end()
						})
				});

			req.pipe(bb);
		} catch(e) {
			res.status?.(500).end()
			console.log(e)
		}
	} else
		res.status?.(404).end()
})
