import { withSessionRoute } from "../../utils/withIronSession"
import { sql_query } from "../../utils/db"

export default withSessionRoute(async (req, res) => {
	if(req.session.admin){
		console.log(req.body)
		try{
			for(const p in req.body){
				let post = JSON.parse(p)
				switch(req.body[p]){
					case 'VAL':
						await sql_query("UPDATE post SET status='OK' WHERE id=? AND game=?;", [post.id, post.game])
							.catch((e) => console.log(e))
						break;
					case 'DEL':
						await sql_query("UPDATE post SET status='DEL' WHERE id=? AND game=?;", [post.id, post.game])
							.catch((e) => console.log(e))
						break;
					default:
						console.log("NOTHING")
						break;
				}
			}
		} catch(e) {
			console.log(e)
		}
		res.status(202).end()
	} else
		res.status(404).end()
})