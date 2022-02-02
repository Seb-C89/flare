import { parseBody }  from "next/dist/server/api-utils" // https://github.com/vercel/next.js/discussions/14979
import auth_apim from "./api/admin.js"
import Login from "../component/Form-login.js"
import Fullframe from "../component/Layout-fullframe.js"

export default function(props) {
	return <Fullframe>
		{ props.profil ? <p>SHOW ADMIN PANEL</p> : <Login /> }
	</Fullframe>
}

export async function getServerSideProps({req, res}) {	// handle legacy "action" param of <form> in case user not have javascript
	console.log(auth_apim)
	console.log(await parseBody(req, '1mb'))
	let { profil } = await auth_apim(req, null)

	return {
		props: {
			profil: profil ?? null
		}
	}
}