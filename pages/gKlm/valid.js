import { withSessionSsr } from "../../utils/withIronSession.js"
import Fullframe from "../../component/Layout-fullframe.js"
import Form from '../../component/Form-valid.js'
import api_valid from '../api/gKlm/valid'
import { get_posts_from_status, get_file_from_post } from "../../utils/db.js"

export default function valid(props){
	if(props.admin)
		return <Fullframe><Form { ...props } /></Fullframe>
	else
		return <></>
}

export const getServerSideProps = withSessionSsr(async (context) => {
	let posts, notFound

	if(context.req?.session?.admin){
		if(context.req.method === "GET")
			posts = await get_posts()
		else if (context.req.method === "POST")
			await api_valid(context.req, context.res)
	} else {
		console.log("not admin")
		notFound = true
	}	

	return {
			props: { 
				posts: posts ?? null,
				admin: context.req.session.admin ?? false
			},
			notFound: notFound ?? null
		}
})

async function get_posts(){
	let posts = await get_posts_from_status('MOD')
		.catch(() => [])

	return Promise.all(posts.map(async x => {
		x.date = x.date.valueOf()

		let f = await get_file_from_post(x.id)
			.catch(() => null)
		
		if(f[0]?.date)
			f[0].date = f[0].date.valueOf()

		return { post: x, file: f}
	}))
}