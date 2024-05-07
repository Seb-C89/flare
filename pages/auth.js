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
	if(context.query.mail)
		await unseal_mail_perm(context)
	//if(context.query.logout)
	//	await context.req.session?.destroy()
	//console.log("ARE YOU CONNECTED", context?.req.session.mail_perm)
	return {
		props: {
			redirect: context?.query?.to || "/",
			logged: (context?.req.session.mail_perm) ? true : false
		}
	}
})