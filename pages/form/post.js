import Fullframe from "../../component/Layout-fullframe.js"
import Form from "../../component/Form-post.js"
import { is } from "type-is" // Expresse req.is()
//import post_api from "../api/form/post.js"

export default function(props) {
	return <Fullframe>
		<Form { ...props } />
	</Fullframe>
}

export async function getServerSideProps(context) {
	console.log(is(context.req, ["multipart/form-data"]))
	//console.log(context.req.get('content-type'))
	//console.log(context.req.get('content-type'))
	//console.log(context.req.is("multipart/form-data"))
	//await post_api(context.req, null)

	

	console.log(context.req.body)
	
	return {
		props: { ...context.req.body }
	}
}