//import { BASIC, buildWWWAuthenticateHeader, mechanisms } from 'http-auth-utils' // or https://www.npmjs.com/package/basic-auth
import { setCookies, getCookie } from "cookies-next";
import { generate_token, get_profil, is_admin, print_all_tokens } from "../../utils/auth";

export default async function(req, res) {
	/*crypto.pbkdf2("admin", '::salt::', 100000, 32, 'sha256', function(err, hashedPassword) {
		console.log(hashedPassword, hashedPassword.length)
	})*/

	let token = getCookie('token', { req, res})

	if(!(get_profil(token) === "admin"))
		if(is_admin(req.body?.user, req.body?.password)){
			let t = generate_token("admin")
			setCookies("token",t.token , {req, res, expires: t.expires})
			res?.status(202).end()
			return {profil: t.profil} 
		}
		else {
			console.log("bad credential")
			res?.status(403).end()
			return false
		}
	else {
		console.log("already admin")
		res?.status(202).end()
		return {profil: get_profil(token)} 
	}
	//print_all_tokens()
}

// https://medium.com/@greg.farrow1/nextjs-https-for-a-local-dev-server-98bb441eabd7