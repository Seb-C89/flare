import { parseBody }  from "next/dist/server/api-utils" // https://github.com/vercel/next.js/discussions/14979
import auth_api from "./api/auth.js"
import Login from "../component/Form-login.js"
import Fullframe from "../component/Layout-fullframe.js"
import Link from 'next/link'

export default function(props) {
	return <Fullframe>
		{ props.profil ? <p><Link href="/logout"><a>Logout</a></Link></p> : <Login /> }
	</Fullframe>
}

export async function getServerSideProps({req, res}) {	// handle legacy "action" param of <form> in case user not have javascript
	await parseBody(req, '1mb')

	if (req.method === "POST")		// if the user attempt to connect
		await auth_api(req, res)	// iron-session require valid res object (can not pass null)
									// and iron-session automatically load the session into req.session 
	
	// if user is not admin do not redirect, else redirect to the admin pannel
	/*let redirect = !req.session.admin ? null : {	permanent: false,
													destination: "/test" }*/
	return {
		/*redirect: redirect ?? null,*/
		props: {
			profil: req.session?.admin ?? null
		}
	}
}