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
		let aaa = connection.query(sql, arg, (e, r) => {
			if(e){
				console.log(e)
				reject(e)
			} else {
				resolve(r)
			}
		})
		console.log(aaa.sql)
	})
}

export function get_recent(){	
	return sql_query("SELECT user_name, game, image, UNIX_TIMESTAMP(date) AS date FROM post WHERE status='OK'", null)
}

export function get_posts_from_status(status){	
	return sql_query("SELECT user_name, game, image, UNIX_TIMESTAMP(date) AS date FROM post WHERE status=?", [status])
}

export function get_by_game(where){	
	return sql_query("SELECT user_name, game, image, UNIX_TIMESTAMP(date) AS date FROM post WHERE game = ?", [where])
}

export function get_games(){	
	return sql_query("SELECT game, COUNT(game) AS count FROM post GROUP BY game", null)
}

export function insert_message(message, reply_to) {
	return sql_query("INSERT INTO message (message, `reply-to`) VALUES (?, ?)", [message, reply_to])
}

export async function insert_post(post, files) {
	return sql_query("START TRANSACTION")
		.then(async () => {
	 		return await sql_query("INSERT INTO post SET ?", post) // must be returned to passe the insertId to the next .then()
		})
		.then(async (r) => {
			for(const f of files){
				f["post"] = r.insertId
				await sql_query("INSERT INTO file SET ?", f)
			}
		})
		.then(async () => {
			await sql_query("COMMIT")
		})
		.catch(async (e) => {
			await sql_query("ROLLBACK")
			console.log(e)
		})
}

export function get_files_without_post(){
	return sql_query("SELECT file.* FROM file LEFT JOIN post ON post.id = file.post WHERE post.id IS NULL")
}

export function get_posts_without_files(){
	return sql_query("SELECT * FROM post WHERE NOT post.status='DEL' AND post.id NOT IN (SELECT file.post FROM file)")
}

export function get_files(){
	return sql_query("SELECT * FROM file")
}

export function get_files_from_post(post_id){
	return sql_query("SELECT * FROM file WHERE post=?", post_id)
}

export function get_file_by_name(name){
	return sql_query("SELECT * FROM file WHERE name=?", name)
}

export default sql_query;
