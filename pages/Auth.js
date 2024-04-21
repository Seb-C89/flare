import { useRouter } from 'next/navigation'

import { withSessionSsr } from "../utils/withIronSession"

export default function form_post(props) {
	//console.log(props)
	props.setAuth(props.logged);
	if(props.redirect)
		if (typeof window !== 'undefined') { // TODO Why it work ? (remove if statement)
			useRouter().push(props.redirect, undefined, {shallow: false})
		}
	return <></>
}

export const getServerSideProps = withSessionSsr(async (context) => {
	if(context.query.logged)
		context.session = { a: 1 }
	if(context.query.logout)
		context.session?.destroy()
	console.log("session", context?.session)
	return {
		props: {
			redirect: context?.query?.to,
			logged: (context?.session) ? true : false
		}
	}
})