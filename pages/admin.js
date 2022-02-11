import { withSessionSsr } from "../utils/withIronSession.js"
import Fullframe from "../component/Layout-fullframe.js"
import { get_files_without_post, get_posts_without_files, get_files } from "../utils/db.js"
import { readdir } from 'fs/promises';
import Form from '../component/Form-admin.js'
import api_admin from './api/form/admin.js'

export default function(props){
	return <Fullframe>
		{ props.admin ? <Form { ...props } /> : <></> }
	</Fullframe>
}

export const getServerSideProps = withSessionSsr(async (context) => {
	let props_admin, notFound

	if(context.req?.session?.admin){
		if(context.req.method === "GET")
			props_admin = await get_props_admin()
		else if (req.method === "POST")
			await api_admin(req, res)
	} else {
		console.log("not admin")
		notFound = true
	}	

	return {
			props: { 
				...props_admin,
				admin: context.req.session.admin ?? false
			},
			notFound: notFound ?? null
		}
})

async function get_props_admin(){
	let files_without_post, posts_without_files, files_lost, files_not_registered
	let error = ""
	let files_in_db, files_in_public, files_in_uploads

	files_without_post = await get_files_without_post()
		.then(data => data)
		.catch(x => error.concat(x))

	posts_without_files = await get_posts_without_files()
		.then(data => {
			data.forEach((element) => element.date = element.date.getTime()) // nextjs do not serialize date object.
			return data
		}) 
		.catch(x => error.concat(x))

	files_in_uploads = await readdir("uploads/old", {withFileTypes:true})
		.then((file_array) => file_array.filter(f => f.isFile()))
		.catch(x => error.concat(x))

	files_in_public = await readdir("public/img/", {withFileTypes:true})
		.then((file_array) => file_array.filter(f => f.isFile()))
		.catch(x => error.concat(x))
	//console.log(files_in_public)

	files_in_db = await get_files()
		.then(data => {
			data.forEach((element) => element.date = element.date.getTime()) // nextjs do not serialize date object.
			return data
		})
		.catch(x => error.concat(x))

	files_lost = files_in_db.filter(db => {
		return !(files_in_public.some(f => {
			let t = (f.name == (db.name + "." + db.ext)) // public file have extension, so db.ext must be added to db.name
			return t
		})

		|| files_in_uploads.some(f => {
			let t = (f.name == db.name)
			return t
		}))
	})
	//console.log("LOST", files_lost)

	let public_files_not_registered = files_in_public.filter(f => {
		return !files_in_db.some(db => {
			let t = (f.name == (db.name + "." + db.ext)) // public file have extension, so db.ext must be added to db.name
			return t
		})
	})
	//console.log("UNKNOW PUB", public_files_not_registered)

	let upload_files_not_registered = files_in_uploads.filter(f => {
		return !files_in_db.some(db => {
			let t = (db.name == f.name)
			return t
		})
	})
	//console.log("UNKNOW UP", upload_files_not_registered)

	files_not_registered = [].concat(public_files_not_registered, upload_files_not_registered).map(f => f.name)
	//console.log(files_not_registered)

	return { error, files_without_post, posts_without_files, files_lost, files_not_registered }
}