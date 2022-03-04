import Fullframe from "../../component/Layout-fullframe"
import Form from "../../component/Form-post"
import Form2 from "../../component/Form-mail"
import post_api from "../api/form/post"
import { get_games_distinct } from "../../utils/db"

export default function(props) {
	if(props.mail_perm === true)
		return <Fullframe><Form { ...props } /></Fullframe>
	else
		return <Fullframe><Form2 from="form/post/" /></Fullframe>
}

export async function getServerSideProps(context){ // handle legacy "action" param of <form> in case user not have javascript

	context.req.query = context.query 	// In page, the query string is not in req property...
	await post_api(context.req, context.res)	// call the interne api route
	
	let props = {...context.req.body}
		if(context.req.session?.mail_perm) // hide the mail_perm props to client who not have this perm
			props.mail_perm = context.req.session.mail_perm
	
	props.games = await get_games_distinct()

	return {
		props: { ...props },
	}
}