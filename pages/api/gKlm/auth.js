import { is_admin } from "../../../utils/auth";
import { withSessionRoute } from "../../../utils/withIronSession.js"

export default withSessionRoute(async (req, res) => {
	
	if(req.method === "POST" && !req.session.admin){
		if(is_admin(req.body?.user, req.body?.password)){
			req.session.admin = true
			req.session.mail_perm = true
			req.session.mail = "admin"
			await req.session.save();
			console.log("authentified")
		}
		else
			console.log("bad credential")
	}

	res.status?.(202).end()
});