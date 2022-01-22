import Fullframe from "../../component/Layout-fullframe.js"
import Form from "../../component/Form-post.js"
import post_api from "../api/form/post.js"

export default function(props) {
	return <Fullframe>
		<Form { ...props } />
	</Fullframe>
}

export async function getServerSideProps(context) {	// handle legacy "action" param of <form> in case user not have javascript
	await post_api(context.req, null)	// call the interne api route

	console.log(context.req.body)
	
	return {
		props: { ...context.req.body }
	}
}