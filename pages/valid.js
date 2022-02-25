import { withSessionSsr } from "../utils/withIronSession.js"
import Fullframe from "../component/Layout-fullframe.js"
import Form from '../component/Form-valid.js'

export default function(props){
	return <Fullframe>
		{ props.admin ? <Form { ...props } /> : <></> }
	</Fullframe>
}

export const getServerSideProps = withSessionSsr(async (context) => {
	let notFound

	if(context.req?.session?.admin){

	}else {
		console.log("not admin")
		notFound = true
	}	

	return {
			props: { 
				admin: context.req.session.admin ?? false
			},
			notFound: notFound ?? null
		}
})