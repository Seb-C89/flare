//import { send_mail } from "../../pages/api/form/contact.js"
import { parseBody }  from "next/dist/server/api-utils" // https://github.com/vercel/next.js/discussions/14979
//import { onSuccess as OnSuccess, onFail as OnFail } from "../../component/Form-contact.js"
import Fullframe from "../../component/Layout-fullframe.js"
import Form from "../../component/Form-contact.js"

export default function(props) {
	return <Fullframe>
		<Form { ...props }/>
	</Fullframe>
}

export async function getServerSideProps(context) {
	context.req.body = await parseBody(context.req, '1mb');
	console.log(context.req.body)

	let error = null
	let { message, reply_to, subject } = context.req.body || {}

	/*await send_mail(message, reply_to, subject)
		.then(() => bool = true)
		.catch(() => bool = false)*/
	
	return {
		props: {
			submited : context.req.body ?? false, 
			message : message ?? null,
			reply_to : reply_to ?? null,
			subject : subject ?? null,
			error : error,
		}
	}
}