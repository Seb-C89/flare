import { withSessionRoute } from "../../utils/withIronSession"

export default withSessionRoute((req, res) => {
	if(req.session.admin){
		console.log("kjhgyfds", req.body)
		res.status(202).end()
	}
	res.status(404).end()
})