import { withIronSessionApiRoute, withIronSessionSsr } from "iron-session/next";
import { unsealData } from "iron-session"

const sessionOptions = {
	cookieName: "Gho4Re",
	password: "_can you smell what The Rock is cooking ?_",
	
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
	const { mail_perm } = await unsealData(req?.query?.mail, {
		password: process.env.SEAL_PASSWORD,
	});

	req.session.mail_perm = mail_perm
		
	await req.session.save();
}