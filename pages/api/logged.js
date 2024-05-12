import { withSessionRoute } from '../../utils/withIronSession.js';

/* to know if an user is connected. see _app.js ~168 */

export default withSessionRoute(async (req, res) => {
	let logged = (req.session.mail_perm) ? true : false
	console.log("FROM INSIDE LOGGED API", logged, req.session)

	res?.status(200).json({logged})
	return logged
})