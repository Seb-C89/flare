import { withSessionRoute } from "../../utils/withIronSession.js"

export default withSessionRoute(async (req, res) => {
	if(req.query.seal){
		const { mail_perm } = await unsealData(req.query.seal, { password: process.env.SEAL_PASSWORD })

		if(mail_perm){
			req.session.mail_perm = true
			await req.session.save();
			res.status(202).end()
		} else
			res.status(404).end()
	} else
		res.status(404).end()
});