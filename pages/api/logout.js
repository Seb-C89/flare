import { withSessionRoute } from "../../utils/withIronSession.js"

export default withSessionRoute(async (req, res) => {
	
	await req.session?.destroy()

	res.status?.(202).end()
});