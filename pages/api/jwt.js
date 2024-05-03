const jose = require('jose')

/* to know if an user is connected. see _app.js ~168 */
export default async function test (req, res) {
	const session = await getSession(req)
	if(req.query.start){
		let new_session = createUserSession(req.query.start)
		await saveSession(res, new_session)
	}
	if(req.query.gets){
		console.log("GETS", session)
	}
	if(req.query.close){
		await closeSession(res, session)
	}
	if(req.query.mod){
		session.mod = req.query.mod
		console.log("MOD", session)
		await saveSession(res, session)
	}
	res.json(session)
}

function createUserSession(iss){
	return createSession(iss, ["user"])
}

function createAdminSession(iss){
	return createSession(iss, ["admin"])
}

function createSession(iss, authorities) {
	/* return the session decrypted from cookies*/
	return {
		iss: iss, // TODO check mail format
		iat: Date.now(),
		exp: Date.now() + (60 * 60 * 24 * 1000),
		aut: authorities
	}
}

async function getSession(req){
	/* return the session decrypted from cookies*/
	const session = await jose.jwtDecrypt(req.cookies[process.env.COOKIES_NAME], jose.base64url.decode(process.env.COOKIES_PASSWORD)).then(res => { console.log("OK", res); return res.payload }).catch(err => { console.log("KO", err); return {} })
	return (session?.iss) ? session : {}
}

async function saveSession(res, session){
	/* Send updated token through cookies and handle cookies expiration trough session exp*/
	const jwt = await new jose.EncryptJWT(session)
		.setProtectedHeader({ alg: 'dir', enc: 'A128CBC-HS256' })
		.encrypt(jose.base64url.decode(process.env.COOKIES_PASSWORD))
	setCookies(res, `${process.env.COOKIES_NAME}=${jwt}${(session.hasOwnProperty('exp')) ? '; Expires='+new Date(session.exp).toUTCString() : ''}`)
}

async function closeSession(res, session){
	/* Make the token expires */
	await saveSession(res, { ...session, exp: Date.now() })
}

function clearSession(res){
	/* Make the cookies expires */
	clearCookies(res, process.env.COOKIES_NAME)
}

function setCookies(res, cookies) {
	if(!Array.isArray(cookies))
		cookies = [cookies]
	let _cookies = res.getHeader("Set-Cookie") ?? []
	console.log("Set-Cookie", [..._cookies, ...cookies])
	res.setHeader("Set-Cookie", [..._cookies, ...cookies])
}

function clearCookies(res, cookiesNames) {
	if(!Array.isArray(cookiesNames))
		cookiesNames = [cookiesNames]
	let cookies = cookiesNames.map( cname => {
		return cname.concat(`=0; Expires=${new Date(0).toUTCString()}`)
	})
	setCookies(res, cookies)
}