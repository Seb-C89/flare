const formidable = require('formidable');
const os = require('os'); // remove

export const config = {
	api: {
		bodyParser: false,
	},
};

function aaa(){
	console.log("do smthg with file")
}

export default async function endpoint(req, res) {
	const form = formidable({ 
		multiples: true,
		uploadDir: "uploads/",
		//fileWriteStreamHandler: aaa // function who receive files data and save it
	});

	form.parse(req, (err,fields,files) => {
		console.log(err)
		console.log(fields)
		console.log(files.length)
		console.log(os.tmpdir())
	})

	res.json('file recieved')
}
