const { /*ClientCredentials, ResourceOwnerPassword,*/ AuthorizationCode } = require('simple-oauth2');
import { withSessionRoute, create_user_session } from '../../../utils/withIronSession.js';

/* TODO Microsoft do not allow redirect_uri with query_string. So the routing strategy need to be reviewed */

export default withSessionRoute(async (req, res) => {
	if(!req?.session?.mail_perm){
		const { code } = req.query
		
		const oauth = new AuthorizationCode({
			client: {
				id: `${process.env.OAUTH_OUTLOOK_CLIENT}`,
				secret: `${process.env.OAUTH_OUTLOOK_SECRET}`
			},
			auth: {
				tokenHost: 'https://login.microsoftonline.com',
				tokenPath: '/common/oauth2/v2.0/token',
				authorizePath: '/common/oauth2/v2.0/authorize',
			}
		})

		if (code) {
			const { code } = req.query;
			const options = {
				code,
				redirect_uri: "http://localhost:3000/api/Oauth/Outlook" // MICROSOFT REQUIRE REDIRECT_URI HERE TOO !!!
			};
			try {
				const accessToken = await oauth.getToken(options);
		
				const token = accessToken.token.access_token;
				console.log(token)
				let data;
				await fetch("https://graph.microsoft.com/v1.0/me", {
					method: 'get',
					headers: {
						'Authorization': `Bearer ${token}`,
						// Il faut obligatoirement un user agent, un voilà un au pif ¯\_(ツ)_/¯
						'User-Agent': "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36"
					}
				}).then(async res => {
					// en cas de réussite de la requête
					data = await res.json()
				}).catch(err => {
					console.log(err);
				})

				console.log(data);
				await create_user_session(req, res, data.mail) // impossible to know if email has been verified
			} catch (e) {
				console.error(e);
			}
			res.redirect("/auth?logged=true").end()
		} else
			res.redirect(oauth.authorizeURL({
				client_id: `${process.env.OAUTH_OUTLOOK_CLIENT}`,
				redirect_uri: "http://localhost:3000/api/Oauth/Outlook",
				scope: "User.Read",
				state: "hsiudgh" // TODO make it random
			}))
	} else
		res.redirect("/")
})