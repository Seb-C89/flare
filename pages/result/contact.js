import { insert_message } from "../../utils/db.js"
import { parseBody }  from "next/dist/server/api-utils" // https://github.com/vercel/next.js/discussions/14979
import { onSuccess as OnSuccess, onFail as OnFail } from "../../component/Form-contact.js"
import Fullframe from "../../component/Layout-fullframe.js"

export default function(props) {
	return <Fullframe>
		{ props.success ? <OnSuccess /> : <OnFail /> }
	</Fullframe>
}

export async function getServerSideProps(context) {
	context.req.body = await parseBody(context.req, '1mb');
	
	let bool
	let { message, reply_to } = context.req.body || {}

	await insert_message(message, reply_to).then(() => bool = true).catch(() => bool = false)
	
	return {
		props: { 
			success : bool,
			message : message,
			reply_to : reply_to,
		}
	}
}