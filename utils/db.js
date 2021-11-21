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
				console.log(e)
				reject(e)
			} else {
				resolve(r)
			}
		})
	})
}

export function get_recent(){	
	return sql_query("SELECT user_name, game, image, UNIX_TIMESTAMP(date) AS date FROM post", null)
}

export function get_by_game(where){	
	return sql_query("SELECT user_name, game, image, UNIX_TIMESTAMP(date) AS date FROM post WHERE game = ?", [where])
}

export function get_games(){	
	return sql_query("SELECT game, COUNT(game) AS count FROM post GROUP BY game", null)
}

export default sql_query;
