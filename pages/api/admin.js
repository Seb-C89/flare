import { is_admin } from "../../utils/auth";
import { withSessionRoute } from "../../utils/withIronSession.js"

export default withSessionRoute(async (req, res) => {
	if(!req.session.admin){
		if(is_admin(req.body?.user, req.body?.password)){
			req.session.admin = true
			console.log("authentified")
		}
		else
			console.log("bad credential")
	} else {
		console.log("already admin")
	}

	await req.session.save();
	//console.log("res", res.status, res)

	res.status?.(202).end()
});