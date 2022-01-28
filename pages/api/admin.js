import { BASIC, buildWWWAuthenticateHeader, mechanisms } from 'http-auth-utils' // or https://www.npmjs.com/package/basic-auth
const safecomp = require('tsscmp'); // Prevents timing attacks

export default async function endpoint(req, res) {
	
	res.setHeader('WWW-Authenticate', buildWWWAuthenticateHeader(BASIC, {realm: "paper pls"}))
	res.status(401).end()
	return 
}

/*export async function getServerSideProps(context) {	// handle legacy "action" param of <form> in case user not have javascript
	//console.log(context.req.headers['authorization'])

	//console.log(parseAuthorizationHeader(context.req.headers['authorization']))
	
	if(context.req.headers.hasOwnProperty('authorization'))
		else

	return {
		props: {}
	}
}*/