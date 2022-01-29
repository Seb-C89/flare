//import { BASIC, parseAuthorizationHeader } from 'http-auth-utils' // or https://www.npmjs.com/package/basic-auth
//const safecomp = require('tsscmp'); // Prevents timing attacks
import { getCookie } from "cookies-next"

export default function(props) {
	return props.admin ? <><p>you are admin</p></> : <><p>not Authenticate</p></>
}

export async function getServerSideProps({req, res}) {	// handle legacy "action" param of <form> in case user not have javascript
	
	console.log(req.headers['cookie'])
	let admin = getCookie('admin', {req, res})

	return {
		props: {
			admin: admin
		}
	}
}