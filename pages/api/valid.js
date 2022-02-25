import { withSessionRoute } from "../../utils/withIronSession"

export default withSessionRoute((req, res) => {
	console.log("kjhgyfds", req.body)
	if(req.session.admin){
		
	}
	res.status(404).end()
})