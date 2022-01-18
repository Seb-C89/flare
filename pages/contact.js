import { parseBody }  from "next/dist/server/api-utils" // https://github.com/vercel/next.js/discussions/14979
import Fullframe from "../component/Layout-fullframe.js"
import Form from "../component/Form-contact.js"
//import { send_mail } from "./api/form/contact.js"
import contact_api from "./api/form/contact.js"

export default function(props) {
	return <Fullframe>
		<Form { ...props }/>
	</Fullframe>
}

export async function getServerSideProps(context) {
	let {...fields} = await parseBody(context.req, '1mb'); 

	/*let error = null
	let submited = null*/
	/*let { message, reply_to, subject } = context.req.body || {}*/

	/*await send_mail(message, reply_to, subject)
		.then(() => submited = true)
		.catch(() => error = true)*/
	
	await contact_api({body: fields}, null)

	console.log(fields)
	
	return {
		/*props: {
			submited : submited ?? null,
			message : message ?? null,
			reply_to : reply_to ?? null,
			subject : subject ?? null,
			error : error ?? null,
		}*/
		props: { ...fields }
	}
}