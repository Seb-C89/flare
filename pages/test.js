//import { BASIC, parseAuthorizationHeader } from 'http-auth-utils' // or https://www.npmjs.com/package/basic-auth
//const safecomp = require('tsscmp'); // Prevents timing attacks
import { getCookie } from "cookies-next"

export default function(props) {
	const onSubmit = async event => {
		fetch("http://localhost:3000/api/test", {
			method: 'POST',
		}).then((res) => {
			if(res.ok)
				console.log("DONE")
			else
				console.log("ERROR: "+res.status)
		}).catch(
			console.log("NETWORK ERROR")
		)
	}

	return <p onClick={onSubmit}>fetch me</p>
}