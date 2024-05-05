import * as jwe from "../../utils/jwt"

/* to know if an user is connected. see _app.js ~168 */
export default async function test (req, res) {
	const session = await jwe.getSession(req)
	if(req.query.start){
		let new_session = jwe.createUserSession(req.query.start)
		await jwe.saveSession(res, new_session)
	}
	if(req.query.gets){
		console.log("GETS", session)
	}
	if(req.query.close){
		await jwe.closeSession(res, session)
	}
	if(req.query.mod){
		session.mod = req.query.mod
		console.log("MOD", session)
		await jwe.saveSession(res, session)
	}
	res.json(session)
}