//import { BASIC, buildWWWAuthenticateHeader, mechanisms } from 'http-auth-utils' // or https://www.npmjs.com/package/basic-auth
import { setCookies, getCookies } from "cookies-next";
import { generate_token, get_profil, is_admin, print_all_tokens } from "../../utils/auth";

export default async function endpoint(req, res) {
	crypto.pbkdf2("admin", '::salt::', 100000, 32, 'sha256', function(err, hashedPassword) {
		console.log(hashedPassword)
	})

	let {token, user, password} = getCookies({ req, res})

	if(!(get_profil(token) === "admin"))
		if(is_admin(user, password))
			setCookies("token", generate_token("admin"), {req, res, expires: expiration})
		else
			console.log("bad credential")
	else
		console.log("already admin")

	//print_all_tokens()
	res.status(202).end()
	return 
}

// https://medium.com/@greg.farrow1/nextjs-https-for-a-local-dev-server-98bb441eabd7