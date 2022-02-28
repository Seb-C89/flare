import { withSessionRoute } from "../../utils/withIronSession"

export default withSessionRoute((req, res) => {
	if(req.session.admin){
		console.log(req.body)
		try{
			for(const p in req.body){
				let post = JSON.parse(p)
				switch(req.body[p]){
					case 'VAL':
						console.log("VAL", post)
						break;
					case 'DEL':
						console.log("DEL", post)
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