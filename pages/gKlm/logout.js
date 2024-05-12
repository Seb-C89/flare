import logout_api from "../api/gKlm/logout.js"

export default function api_logout(props) {
	props.setAuth(props.profil);
	return props.profil ? <p>you are NOT logged out</p> : <p>you are logged out</p>
}

export async function getServerSideProps({req, res}) {	// handle legacy "action" param of <form> in case user not have javascript
	
	await logout_api(req, res)

	return {
		props: {
			profil: req.session?.admin ?? null
		}
	}
}