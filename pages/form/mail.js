import { parseBody }  from "next/dist/server/api-utils" // https://github.com/vercel/next.js/discussions/14979
import Fullframe from "../../component/Layout-fullframe.js"
import Form from "../../component/Form-mail.js"
//import contact_api from "../api/form/mail.js"

export default function(props) {
	return <Fullframe>
		<Form { ...props }/>
	</Fullframe>
}


export async function getServerSideProps(context) {			// handle legacy "action" param of <form> in case user not have javascript
	let {...fields} = await parseBody(context.req, '1mb');	// parse incoming request https://github.com/vercel/next.js/discussions/14979
	
	//await contact_api({body: fields}, null)		// call the interne api route

	console.log(fields)
	
	return {
		props: { ...fields }
	}
}