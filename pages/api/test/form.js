async function endpoint(req, res) {
  
	res.json('file recieved')

}

export const config = {
	api: {
		bodyParser: false,
	},
};

export default endpoint;

options.uploadDir
options.fileWriteStreamHandler