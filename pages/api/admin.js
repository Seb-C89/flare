//import { BASIC, buildWWWAuthenticateHeader, mechanisms } from 'http-auth-utils' // or https://www.npmjs.com/package/basic-auth
import { setCookies, getCookies } from "cookies-next";
import { generate_token, get_profil, is_admin, print_all_tokens } from "../../utils/auth";
const crypto = require('crypto')

export default async function endpoint(req, res) {
	/*crypto.pbkdf2("admin", '::salt::', 100000, 32, 'sha256', function(err, hashedPassword) {
		console.log(hashedPassword, hashedPassword.length)
	})*/

	let token = getCookies({ req, res})

	if(!(get_profil(token) === "admin"))
		if(is_admin(req.body.user, req.body.password)){
			let t = generate_token("admin")
			setCookies("token",t.token , {req, res, expires: t.expires})
			res.body
			res.status(202).end() 
		}
		else {
			console.log("bad credential")
			res.status(403).end()
		}
	else {
		console.log("already admin")
		res.status(202).end()
	}

	//print_all_tokens()
	return 
}

// https://medium.com/@greg.farrow1/nextjs-https-for-a-local-dev-server-98bb441eabd7