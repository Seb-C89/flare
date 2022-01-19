import Fullframe from "../../component/Layout-fullframe.js"
import Form from "../../component/Form-post.js"
import post_api from "../api/form/post.js"

export default function(props) {
	return <Fullframe>
		<Form { ...props } />
	</Fullframe>
}

export async function getServerSideProps(context) {
	
	await post_api(context.req, null)

	console.log(context.req.body)
	
	return {
		props: { ...context.req.body }
	}
}