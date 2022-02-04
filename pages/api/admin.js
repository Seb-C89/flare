import { is_admin } from "../../utils/auth";
import { withSessionRoute } from "../../utils/withIronSession.js"

export default withSessionRoute((req, res) => {
	// get user from database then:
	req.session.user = {
		id: 230,
		admin: true,
	};
	await req.session.save();
	res.send("Logged in");
});