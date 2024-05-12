import * as jwe from "./jwt.js"
const jose = require('jose')
//import { getIronSession, sealData } from "iron-session";
//import { unsealData } from "iron-session"

// const options = {
// 	cookieName: process.env.COOKIES_NAME,
// 	password: process.env.COOKIES_PASSWORD,
	
// 	// secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
// 	cookieOptions: {
// 		secure: process.env.NODE_ENV === "production",
// 		maxAge: undefined // cookie deleted when client close browser
// 	},
// };

export function withSessionRoute(handler) {
  return async (req, res) => {
// 	const session = (req?.session) ? req.session : await getIronSession(req, res, options);
// 	if(Object.keys(session).length !== 0) // req.session can be {} empty object and empty object is true...
// 		req.session = session
//console.log(req.rawHeaders)
//console.log(req.cookies)
	req.session = await jwe.getSession(req)
	console.log("with ironsession", req.session)
	req.session.save = async () => { console.log("want to save session", req.session); await jwe.saveSession(res, req.session) }
	req.session.destroy = async () => { console.log("GOOD BYE"); await jwe.closeSession(res, req.session); delete req.session }
	//req.session.mail_perm = Boolean(req.session.iss)
 	return handler(req, res);
   }
}

export function withSessionSsr(handler) {
	return async (context) => {
// 	console.log(context.req.cookies[options.cookieName])
// 	context.req.cookies.get = function(name) {
// 		return (context.req.cookies[name]) ? {value: context?.req?.cookies[name], name: name} : undefined
// 	}
// 	/*context.req.cookies.set = function(name, value) {
// 		context.req.cookies[name] = value
// 	}*/

// 	const session = (req?.session) ? req.session : await getIronSession(context.req.cookies, options);
context.req.session = await jwe.getSession(context.req)
// 	if(Object.keys(session).length !== 0) // req.session can be {} empty object and empty object is true...
// 		context.req.session = session
// 	console.log("SESSION", context.req?.session)
	
		return handler(context);
	}
}

export async function unseal_mail_perm(context){
	console.log("UNSEAL", context?.query?.mail)
	/*const { mail_perm, mail } = await unsealData(req?.query?.mail, {
		password: process.env.SEAL_PASSWORD,
	});*/
	const { mail, mail_perm } = await jose.jwtDecrypt(context?.query?.mail, jose.base64url.decode(process.env.SEAL_PASSWORD)).then(res => { console.log("OK", res); return res.payload }).catch(err => { console.log("KO", err.code); return {} })

	await create_user_session(context.req, context.res, mail, mail_perm);
}

export async function sealData ( data ) {
	return await new jose.EncryptJWT(data)
		.setProtectedHeader({ alg: 'dir', enc: 'A128CBC-HS256' })
		.encrypt(jose.base64url.decode(process.env.SEAL_PASSWORD))
}

export async function create_user_session(req, res, mail, mail_perm) {
	if(mail) { // TODO better check 
		req.session = jwe.createSession(mail)
		req.session.mail_perm = (mail_perm) ? mail_perm : true

		await jwe.saveSession(res, req.session)
	} else
		console.error("can not create session. Email is: ", mail)
}