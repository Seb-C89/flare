const jose = require('jose')

/* to know if an user is connected. see _app.js ~168 */

export default async function test (req, res) {
	//const secret = jose.base64url.decode('zH4NRP1HMALxxCFnRZABFA7GOJtzU_gIj02alfL1lvI')
	const jwt = await new jose.EncryptJWT({
		'urn:example:claim': true,
		'exp': 1714653769,
		'iss': "uig"
	})
	.setProtectedHeader({ alg: 'dir', enc: 'A128CBC-HS256' })
	//.setIssuedAt()
	.setIssuer('seb@outllook.lol')
	//.setAudience('urn:example:audience')
	.setExpirationTime('1m')
	//.setNotBefore('3s')
	.encrypt(jose.base64url.decode(process.env.COOKIES_PASSWORD))

	console.log(jwt)
	console.log("cook", req.cookies)
	console.log("cook", res.cookies)

	setCookies(res, ["lool=loo1", "lool2=lool", "lool3=lool"])
	clearCookies(res, "lool2")

	const a = await jose.jwtDecrypt(jwt, jose.base64url.decode(process.env.COOKIES_PASSWORD)).then(res => { console.log("OK", res); return res }).catch(err => console.log("KO", err))
	console.log("RESULT", a)
	res.setHeader("authorization", "basic lol")
	res.status(200)
	res.send('<a href="/api/jwt2">next</a>')
}

function createUserSession(iss){
	return createSession(iss, ["user"])
}

function createAdminSession(iss){
	return createSession(iss, ["admin"])
}

async function createSession(iss, authorities) {
	/* return the session decrypted from cookies*/
	
}

async function getSession(req){
	/* return the session decrypted from cookies*/
	return await jose.jwtDecrypt(jwt, jose.base64url.decode(process.env.COOKIES_PASSWORD)).then(res => { console.log("OK", res); return res.payload }).catch(err => console.log("KO", err))
}

async function saveSession(res, session){
	/* Send updated token through cookies*/
	const jwt = await new jose.EncryptJWT(session)
	.setProtectedHeader({ alg: 'dir', enc: 'A128CBC-HS256' })
	.encrypt(jose.base64url.decode(process.env.COOKIES_PASSWORD))
	setCookies(res, `${process.env.COOKIES_NAMES}=${jwt}`)
}

async function closeSession(res, session){
	/* Make the token expires */
	await saveSession(res, { ...session, exp: 0 })
}

function clearSession(res){
	/* Make the cookies expires */
	clearCookies(res, process.env.COOKIES_NAMES)
}

function setCookies(res, cookies) {
	let _cookies = res.getHeader("Set-Cookie") ?? []
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