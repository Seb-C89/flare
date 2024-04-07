import { withIronSessionApiRoute, withIronSessionSsr } from "iron-session/next";
import { unsealData } from "iron-session"

const sessionOptions = {
	cookieName: process.env.COOKIES_NAME,
	password: process.env.COOKIES_PASSWORD,
	
	// secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
	cookieOptions: {
		secure: process.env.NODE_ENV === "production",
		maxAge: undefined // cookie deleted when client close browser
	},
};

export function withSessionRoute(handler) {
  return withIronSessionApiRoute(handler, sessionOptions);
}

export function withSessionSsr(handler) {
  return withIronSessionSsr(handler, sessionOptions);
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