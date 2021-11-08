// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

require('dotenv').config();

export default function handler(req, res) {
	var mysql      = require('mysql');
	var connection = mysql.createConnection({
	host     : process.env.MYSQL_HOST,
	user     : process.env.MYSQL_USER,
	password : process.env.MYSQL_PASSWORD,
	database : process.env.MYSQL_DB,
	port     : process.env.MYSQL_PORT
	});

	connection.connect(
		function(err) {
			if (err)
				console.error('error connecting: ' + err.stack);
			else 
				console.log('connected as id ' + connection.threadId);
		}
	);

	connection.query("SELECT user_name, game, image, UNIX_TIMESTAMP(date) AS date FROM post", 
		function(err, res, fields){
			if(err)
				console.error('error querying: ' + err.stack);
			if(res)
				console.log(res)
			if(fields)
				console.log(fields)
		}
	)

	res.status(200).json({ res: res })

	connection.end(
		function(err){
			console.error('error closing connection: ' + err.stack)
		}
	);
}
