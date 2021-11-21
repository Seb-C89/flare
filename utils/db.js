require('dotenv').config();

var mysql      = require('mysql2');
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

function sql_query(sql, arg){
	return new Promise((resolve, reject) => {
		connection.query(sql, arg, (e, r) => {
			if(e){
				reject(e)
			} else {
				resolve(r)
			}
		})
	})
}

export default sql_query;
