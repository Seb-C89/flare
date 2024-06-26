//https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps

const { /*ClientCredentials, ResourceOwnerPassword,*/ AuthorizationCode } = require('simple-oauth2');
import { withSessionRoute, create_user_session } from '../../../utils/withIronSession.js';

export default withSessionRoute(async (req, res) => {
	if(!req?.session?.mail_perm){
		const { code } = req.query

		const oauth = new AuthorizationCode({
			client: {
				id: `${process.env.OAUTH_GITHUB_CLIENT}`,
				secret: `${process.env.OAUTH_GITHUB_SECRET}`
			},
			auth: {
				tokenHost: 'https://github.com',
				tokenPath: '/login/oauth/access_token',
				authorizePath: '/login/oauth/authorize',
			}
		})

		if (code) {
			const options = {
				code,
			};
			try {
				const accessToken = await oauth.getToken(options);
		
				const token = accessToken.token.access_token;
				//console.log(token)
				// Request user emailsss
				let emails;
				await fetch("https://api.github.com/user/emails", {
					method: 'get',
					headers: {
						'Authorization': `Bearer ${token}`,
						// Il faut obligatoirement un user agent, un voilà un au pif ¯\_(ツ)_/¯
						'User-Agent': "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36"
					}
				}).then(async res => {
					// en cas de réussite de la requête
					emails = await res.json();
				}).catch(err => {
					// en cas d’échec de la requête
					console.log(err);
				})

				//console.log(emails);
		
				// Search primary email
				const user_primary_mail = emails.find((e) => e.primary == true);
				console.log("PRIMARY", user_primary_mail)

				// Create session
				await create_user_session(req, res, (user_primary_mail.verified) ? user_primary_mail.email : undefined)
			} catch (e) {
				console.error(e);
			}
			res.redirect("/auth?logged=true").end()
		} else
			res.redirect(oauth.authorizeURL({	// like `https://github.com/login/oauth/authorize?` + new URLSearchParams({})
				client_id: `${process.env.OAUTH_GITHUB_CLIENT}`,
				redirect_uri: process.env.NEXT_PUBLIC_API+"/Oauth/GitHub?callback=true",
				scope: "user:email",
				state: "hsiudgh" // TODO make it random
			}))
	} else 
		res.redirect("/")
})