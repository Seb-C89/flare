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
	console.log(connection.state, connection.status)
	connection.connect(
		function(err) {
			if (err)
				console.error('error connecting: ' + err.stack);
			else 
				console.log('connected as id ' + connection.threadId);
		}
	);
	console.log("aaaa", connection.state, connection.status)
	connection.query("SELECT user_name, game, image, UNIX_TIMESTAMP(date) AS date FROM post", 
		function(err, res){
			if(err)
				console.error('error querying: ' + err.stack);
			if(res)
				console.log(res)
		}
	)

	console.log("bbbb", connection.state, connection.status)
	res.status(200).json({ res: "ok" })

	connection.end(
		function(err){
			if(err)
				console.error('error closing connection: ' + err.stack)
		}
	);

	console.log("cccc", connection.state, connection.status)
	console.log('disconnected as id ' + connection.threadId);
}
