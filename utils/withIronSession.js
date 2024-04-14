import { getIronSession } from "iron-session";
import { unsealData } from "iron-session"

const options = {
	cookieName: process.env.COOKIES_NAME,
	password: process.env.COOKIES_PASSWORD,
	
	// secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
	cookieOptions: {
		secure: process.env.NODE_ENV === "production",
		maxAge: undefined // cookie deleted when client close browser
	},
};

export function withSessionRoute(handler) {
  return async (req, res) => {
	const session = await getIronSession(req, res, options);
	req.session = session

	return handler(req, res);
  }
}

export function withSessionSsr(handler) {
  return async (context) => {
	console.log(context.req.cookies[options.cookieName])
	context.req.cookies.get = function(name) {
		return (context.req.cookies[name]) ? {value: context?.req?.cookies[name], name: name} : undefined
	}
	/*context.req.cookies.set = function(name, value) {
		context.req.cookies[name] = value
	}*/

	context.req.session = await getIronSession(context.req.cookies, options);
	console.log("SESSION", context.req.session)
	
	return handler(context);
  }
}

export async function unseal_mail_perm(req, res){
	console.log("UNSEAL")
	const { mail_perm, mail } = await unsealData(req?.query?.mail, {
		password: process.env.SEAL_PASSWORD,
	});

	req.session.mail_perm = mail_perm
	req.session.mail = mail
		
	await req.session.save();
}