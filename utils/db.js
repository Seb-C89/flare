require('dotenv').config();

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
			console.log('NEW CONNEXION connected as id ' + connection.threadId);
	}
);

export default connection;
