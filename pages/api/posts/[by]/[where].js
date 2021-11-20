import db from "../../../../utils/db.js"

export default async function handler(req, res) {
	const { by, where } = req.query;
	switch(req.method){
		case "GET":
			switch(by){
				case "recent":
					return get_recent();
				case "game":
					return get_by_game(where);
			}
		default:
			return res.status(404);
	}
}
	
async function get_recent(){	
	return await db.query("SELECT user_name, game, image, UNIX_TIMESTAMP(date) AS date FROM post", 
		function(err, r){
			if(err) {
				console.error('error querying: ' + err.stack);
				return res.status(500)
			}
			if(res) {
				console.log(r)
				return res.status(200).json(r)
			}
		}
	)
}

async function get_recent(where){	
	return await db.query("SELECT user_name, game, image, UNIX_TIMESTAMP(date) AS date FROM post WHERE game ="+where, 
		function(err, r){
			if(err) {
				console.error('error querying: ' + err.stack);
				return res.status(500)
			}
			if(res) {
				console.log(r)
				return res.status(200).json(r)
			}
		}
	)
}
