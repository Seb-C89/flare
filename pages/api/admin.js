//import { BASIC, buildWWWAuthenticateHeader, mechanisms } from 'http-auth-utils' // or https://www.npmjs.com/package/basic-auth
import { setCookies } from "cookies-next";
//const safecomp = require('tsscmp'); // Prevents timing attacks

export default async function endpoint(req, res) {
	
	//res.setHeader('WWW-Authenticate', buildWWWAuthenticateHeader(BASIC, {realm: "paper pls"}))
	//res.status(401).end()
	setCookies('admin', 'true', {req, res})
	res.status(202).end()
	return 
}

// https://medium.com/@greg.farrow1/nextjs-https-for-a-local-dev-server-98bb441eabd7

/*export async function getServerSideProps(context) {	// handle legacy "action" param of <form> in case user not have javascript
	//console.log(context.req.headers['authorization'])

	//console.log(parseAuthorizationHeader(context.req.headers['authorization']))
	
	if(context.req.headers.hasOwnProperty('authorization'))
		else

	return {
		props: {}
	}
}*/