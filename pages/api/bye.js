import a from "../../utils/db.js"

export default async function handler(req, res) {
	var sql_res;
	return await a.query("SELECT user_name, game, image, UNIX_TIMESTAMP(date) AS date FROM post", 
		function(err, r){
			if(err) {
				console.error('error querying: ' + err.stack);
				res.status(500)
			}
			if(res) {
				sql_res = r
				//console.log(r)
				res.status(200).json({ res: sql_res })
			}
		}
	)
}