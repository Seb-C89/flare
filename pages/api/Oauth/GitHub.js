//https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps

const { /*ClientCredentials, ResourceOwnerPassword,*/ AuthorizationCode } = require('simple-oauth2');

export default async function api_recent(req, res) {
	const { callback } = req.query

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

	if (callback == "true") {
		const { code } = req.query;
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
			const user_primary_mail = emails.find((e) => e.primary == true).email; // TODO Session
			console.log("PRIMARY", user_primary_mail)
		} catch (e) {
			console.error(e);
		}
		res?.redirect("/").end()
	} else
		res?.redirect(oauth.authorizeURL({	// like `https://github.com/login/oauth/authorize?` + new URLSearchParams({})
			client_id: `${process.env.OAUTH_GITHUB_CLIENT}`,
			redirect_uri: "http://localhost:3000/api/Oauth/GitHub?callback=true",
			scope: "user:email",
			state: "hsiudgh" // TODO make it random
		}))
}