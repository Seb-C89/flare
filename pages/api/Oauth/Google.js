// https://developers.google.com/identity/openid-connect/openid-connect#accessingtheservice
// https://developers.google.com/identity/protocols/oauth2/web-server#node.js

const { /*ClientCredentials, ResourceOwnerPassword,*/ AuthorizationCode } = require('simple-oauth2');
const {google} = require('googleapis');
import { withSessionRoute, create_user_session } from '../../../utils/withIronSession.js';

export default withSessionRoute(async (req, res) => {
	if(!req?.session?.mail_perm){
		const { code } = req.query

		const oauth2Client = new google.auth.OAuth2(
			process.env.OAUTH_GOOGLE_CLIENT,
			process.env.OAUTH_GOOGLE_SECRET,
			process.env.NEXT_PUBLIC_API+"/Oauth/Google"
		);

		if (code) {
			
			console.log("CODE", req.query.code)
			const {tokens, ...rest} = await oauth2Client.getToken(code)
				oauth2Client.setCredentials(tokens);
			console.log("TOKEN", rest)
			console.log("Oauth", oauth2Client.credentials.id_token)
			let data = await oauth2Client.verifyIdToken({
				idToken: oauth2Client.credentials.id_token,
				audience: process.env.OAUTH_GOOGLE_CLIENT
			})
			console.log("DATA", data)
			console.log("EMAIL", data.payload.email, data.payload.email_verified)
			await create_user_session(req, res, (data.payload.email_verified) ? data.payload.email : undefined)
			res.redirect("/auth?logged=true").end()
		} else
			res.redirect(oauth2Client.generateAuthUrl({
				scope: "https://www.googleapis.com/auth/userinfo.email"
			}))
	} else 
		res.redirect("/")
})