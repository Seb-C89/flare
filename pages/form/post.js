import Fullframe from "../../component/Layout-fullframe.js"
import Form from "../../component/Form-post.js"
//import post_api from "../api/form/post.js"

export default function(props) {
	return <Fullframe>
		<Form { ...props } />
	</Fullframe>
}

export async function getServerSideProps(context) {
	if(context.req.headers["Content-type"] === "multipart/form-data" ||
		context.req.headers["content-type"] === "multipart/form-data"){
			console.log("REQ IS multipart/form-data")
		}
	else{
		console.log(context.req.headers["Content-type"])
		console.log(context.req.headers["content-type"])
	}
	//console.log(context.req.get('content-type'))
	//console.log(context.req.get('content-type'))
	//console.log(context.req.is("multipart/form-data"))
	//await post_api(context.req, null)

	

	console.log(context.req.body)
	
	return {
		props: { ...context.req.body }
	}
}