import { renameSync } from 'fs'
// TODO close connection

var mysql      = require('mysql2');
var connection = mysql.createPool({
connectionLimit	: 1,
host			: process.env.MYSQL_HOST,
user			: process.env.MYSQL_USER,
password		: process.env.MYSQL_PASSWORD,
database		: process.env.MYSQL_DB,
port			: process.env.MYSQL_PORT
});

/*connection.connect(
	function(err) {
		if (err)
			console.error('error connecting: ' + err.stack);
		else 
			console.log('NEW CONNEXION connected as id ' + connection.threadId);
	}
);*/

export function sql_query(sql, arg){
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

export function get_recent(last_id){	
	console.log("LAST ID", last_id)
	return last_id	? sql_query("SELECT id, user_name, date, game FROM post WHERE id < ? AND status='OK' ORDER BY date DESC LIMIT ?", [last_id, parseInt(process.env.POST_PER_PAGE || 10)])
					: sql_query("SELECT id, user_name, date, game FROM post WHERE status='OK' ORDER BY date DESC LIMIT ?", parseInt(process.env.POST_PER_PAGE || 10))
}

export function get_posts_from_status(status){	
	return sql_query("SELECT * FROM post WHERE status=?", [status])
}

/*export function get_by_game(where){	
	return sql_query("SELECT user_name, game, UNIX_TIMESTAMP(date) AS date FROM post WHERE game = ?", [where])
}*/

export function get_games(){	
	return sql_query("SELECT game, COUNT(game) AS count FROM post WHERE status='OK' GROUP BY game", null)
}

export function get_games_distinct(){
	return sql_query("SELECT DISTINCT game FROM post WHERE status='OK'", null)
}

/*export function insert_message(message, reply_to) {
	return sql_query("INSERT INTO message (message, `reply-to`) VALUES (?, ?)", [message, reply_to])
}*/

export async function insert_post(post, files, mail) {
	return sql_query("START TRANSACTION")
		.then(async () => await sql_query("SELECT id FROM user WHERE mail=?", mail))
			.then(async user => {
				if(user[0]?.id)
					post.user_id = user[0].id
				else // Create user
					await sql_query("INSERT INTO user SET ?", {mail: mail})
						.then(r => {
							post.user_id = r.insertId
						})
			})
		.then(async () => await sql_query("INSERT INTO post SET ?", post)) // must be returned to passe the insertId to the next .then()
		.then(async r => {
			for(const f of files){
				f["post"] = r.insertId
				await sql_query("INSERT INTO file SET ?", f)
			}
		})
		.then(async () => await sql_query("COMMIT"))
		.catch(async e => {
			await sql_query("ROLLBACK")
			console.log(e)
		})
}

export function valid_post(id, game){
	return sql_query("START TRANSACTION")
		.then(async () => await sql_query("UPDATE post SET status='OK' WHERE id=? AND game=?", [post.id, post.game]))
			.then(async () => await get_file_from_post(post.id))
				.then(async files => {
					for(let file of files)
						renameSync(process.env.DIR_UPLOAD_IMG+file.name, process.env.DIR_PUBLIC_IMG+file.name)
				})
		.then(async () => await sql_query("COMMIT"))
		.catch(async e => {
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

export function get_file_from_post(post_id){
	return sql_query("SELECT * FROM file WHERE post=? LIMIT 1", post_id) // LIMIT 1 because the UI is not ready to have many image per post
}

export function get_file_by_id(id){
	return sql_query("SELECT * FROM file WHERE id=?", id)
}

export default sql_query;
