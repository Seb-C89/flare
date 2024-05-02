const jose = require('jose')

/* to know if an user is connected. see _app.js ~168 */

export default async function test (req, res) {
	const secret = jose.base64url.decode('zH4NRP1HMALxxCFnRZABFA7GOJtzU_gIj02alfL1lvI')
	const jwt = await new jose.EncryptJWT({ 'urn:example:claim': true })
	.setProtectedHeader({ alg: 'dir', enc: 'A128CBC-HS256' })
	//.setIssuedAt()
	.setIssuer('seb@outllook.lol')
	//.setAudience('urn:example:audience')
	.setExpirationTime('1m')
	//.setNotBefore('3s')
	.encrypt(secret)

	console.log(jwt)
	console.log("cook", req.cookies)
	console.log("cook", res.cookies)

	//setCookies2(res, ["lool=loo1", "lool2=lool", "lool3=lool"])
	clearCookies2(res, "lool2")

	const a = await jose.jwtDecrypt(jwt, secret).then(res => { console.log("OK", res); return res }).catch(err => console.log("KO", err))
	console.log("RESULT", a)
	res.setHeader("authorization", "basic lol")
	res.status(200)
	res.send('<a href="/api/jwt2">next</a>')
}

function setCookies2(res, cookies) {
	let _cookies = res.getHeader("set-cookie") ?? []
	res.setHeader("set-cookie", [..._cookies, ...cookies])
}

function clearCookies2(res, cookiesNames) {
	if(!Array.isArray(cookiesNames))
		cookiesNames = [cookiesNames]
	let cookies = cookiesNames.map( cname => {
		return cname.concat(`=0; Expires=${new Date(0).toUTCString()}`)
	})
	setCookies2(res, cookies)
}