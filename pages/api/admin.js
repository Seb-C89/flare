//import { BASIC, buildWWWAuthenticateHeader, mechanisms } from 'http-auth-utils' // or https://www.npmjs.com/package/basic-auth
import { setCookies, getCookie } from "cookies-next";
import { generate_token, add_token, get_profil, print_all_tokens } from "../../utils/auth";

export default async function endpoint(req, res) {
	let cookie = getCookie('token', { req, res})
	//if(!cookie){
		console.log(cookie)
		if(!(get_profil(cookie) === "admin"))
		{
			let expiration = new Date()
				expiration.setDate(expiration.getDate() +1)
			let token = {
				expire: expiration,
				token: generate_token(),
				profil: "admin"
			}

			add_token(token)
			setCookies("token", token.token, {req, res, expires: expiration})

			print_all_tokens()
		} else
			console.log("already admin")
	//}

	res.status(202).end()
	return 
}

// https://medium.com/@greg.farrow1/nextjs-https-for-a-local-dev-server-98bb441eabd7

//var token = crypto.randomBytes(64).toString('hex');

/*crypto.pbkdf2(password, row.salt, 310000, 32, 'sha256', function(err, hashedPassword) {
	if (err) { return cb(err); }
	if (!crypto.timingSafeEqual(row.hashed_password, hashedPassword)) {
	  return cb(null, false, { message: 'Incorrect username or password.' });
	}
	return cb(null, row);*/