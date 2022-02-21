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

	files_without_post = await get_files_without_post()
		.then(data => {
			data.forEach((element) => element.date = element.date.valueOf()) // nextjs do not serialize date object.
			return data
		}) 
		.catch(x => { error.concat(x); return [] })

	posts_without_files = await get_posts_without_files()
		.then(data => {
			data.forEach((element) => element.date = element.date.valueOf()) // nextjs do not serialize date object.
			return data
		}) 
		.catch(x => { error.concat(x); return [] })

	let files_in_upload = await readdir(process.env.DIR_UPLOAD_IMG, {withFileTypes:true})
		.then((file_array) => file_array.filter(f => f.isFile())
										.map(f => {return {name: f.name, directory: "upload"}}))
		.catch(x => { error.concat(x); return [] })

	let files_in_public = await readdir(process.env.DIR_PUBLIC_IMG, {withFileTypes:true})
		.then((file_array) => file_array.filter(f => f.isFile())
										.map(f => {return {name: f.name, directory: "public"}}))
		.catch(x => { error.concat(x); return [] })

	let files_in_disk = [].concat(files_in_public, files_in_upload)
	// TODO delete files_in_public, files_in_upload

	let files_in_db = await get_files()
		.then(data => {
			data.forEach((element) => element.date = element.date.getTime()) // nextjs do not serialize date object.
			return data
		})
		.catch(x => { error.concat(x); return [] })

	files_lost = files_in_db.filter(db => !files_in_disk.some(f => f.name == db.nam)) // public file have extension, so db.ext must be added to db.name

	files_not_registered = files_in_disk.filter(f => !files_in_db.some(db => (db.name == f.name)))

	// TODO file in bad directory

	return { error, files_without_post, posts_without_files, files_lost, files_not_registered }
}