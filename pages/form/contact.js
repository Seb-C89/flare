import Fullframe from "../../component/Layout-fullframe"
import Form from "../../component/Form-contact"
import Form2 from "../../component/Form-mail"
import contact_api from "../api/form/contact"

export default function(props) {
	if(props.mail_perm === true)
		return <Fullframe><Form { ...props } /></Fullframe>
	else
		return <Fullframe><Form2 from="form/contact/" /></Fullframe>
}

export async function getServerSideProps(context){ // handle legacy "action" param of <form> in case user not have javascript

	context.req.query = context.query 	// In page, the query string is not in req property...
	await contact_api(context.req, context.res)	// call the interne api route
	
	let props = {...context.req.body}
		if(context.req.session?.mail_perm) // hide the mail_perm props to client who not have this perm
			props.mail_perm = context.req.session.mail_perm

	return {
		props: { ...props },
	}
}