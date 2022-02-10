import { withSessionSsr } from "../utils/withIronSession.js"
import Fullframe from "../component/Layout-fullframe.js"
import { get_files_without_post, get_posts_without_files, get_files } from "../utils/db.js"
import { readdir } from 'fs/promises';

export default function(props){
	return <Fullframe>
	<form>
		<p>{props.error}</p>
		<p>File without related post</p>
		<ul>
			{ props.files_without_post?.map((x) => {
				return <li><input type="checkbox" id={x.id} name="files_without_post" value={x.name} />
						<label htmlFor="files_without_post">{x.name}</label></li>
			}) }
		</ul>
		<p>Post without related file</p>
		<ul>
			{ props.posts_without_files?.map((x) => {
				return <li><input type="checkbox" id={x.id} name="posts_without_files" value={x.game} />
						<label htmlFor="posts_without_files">{x.game}</label></li>
			}) }
		</ul>
		<p>Files uploaded but not regitered in Database</p>
		<ul>
		{ props.files_not_registered?.map((x) => {
				return <li><input type="checkbox" id={x} name="files_not_registered" value={x} />
						<label htmlFor="files_not_registered">{x}</label></li>
			}) }
		</ul>
		<p>Files in Database but not on Disk</p>
		<ul>
		{ props.files_lost?.map((x) => {
				return <li><input type="checkbox" id={x.id} name="files_lost" value={x.name} />
						<label htmlFor="files_lost">{x.name}</label></li>
			}) }
		</ul>
	</form>
	</Fullframe>
}

export const getServerSideProps = withSessionSsr(async (context) => {
	let files_without_post, posts_without_files, files_lost, files_not_registered
	let error = ""
	let files_in_db, files_in_public, files_in_uploads

	if(context.req?.session?.admin){
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
	} else
		console.log("not admin")

	return {
			props: {
				files_without_post: files_without_post ?? null,
				posts_without_files: posts_without_files ?? null,
				error: error ?? null,
				files_lost : files_lost ?? null,
				files_not_registered : files_not_registered ?? null,
			}
		}
})