import { useRouter } from 'next/navigation'

import { withSessionSsr, unseal_mail_perm} from "../utils/withIronSession"

/* Landing page from connection, change the react state to connected, create session over cookie, and redirect */
// TODO change adresse in mail

export default function auth(props) {
	//console.log(props)
	props.setAuth(props.logged);
	if(props.redirect)
		if (typeof window !== 'undefined') { // TODO Why it work ? (remove if statement)
			useRouter().push(props.redirect, undefined, {shallow: false})
		}
	return <></>
}

export const getServerSideProps = withSessionSsr(async (context) => {
	if(context.query.logged && process.env.NODE_ENV === "development")
		context.session = { a: 1 }
	if(context.query.mail)
		unseal_mail_perm(context)
	if(context.query.logout)
		context.session?.destroy()
	//console.log("session", context?.session)
	return {
		props: {
			redirect: context?.query?.to || "/",
			logged: (context?.session) ? true : false
		}
	}
})