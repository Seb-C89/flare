import { getCookie } from "cookies-next"
import { get_profil } from "../utils/auth"
import { Login } from "../component/Form-login"

export default function(props) {
	return <Login />
}

export async function getServerSideProps({req, res}) {	// handle legacy "action" param of <form> in case user not have javascript
	
	let { token } = getCookie('token', {req, res})

	return {
		props: {
			profil: get_profil(token)
		}
	}
}