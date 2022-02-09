import { withSessionSsr } from "../utils/withIronSession.js"
import Fullframe from "../component/Layout-fullframe.js"
import { get_files_without_post, get_posts_without_files, get_files } from "../utils/db.js"
import { readdir } from 'fs/promises';

export default function(props){
	return <Fullframe>
	<form>
		<p>{props.error}</p>
		<p>Delete file without related post</p>
		<ul>
			{ props.files_without_post?.map((x) => {
				return <li><input type="checkbox" id={x.id} name="files_without_post" value={x.name} />
						<label htmlFor="other">{x.name}</label></li>
			}) }
		</ul>
		<p>Delete post without related post</p>
		<ul>
			{ props.posts_without_files?.map((x) => {
				return <li><input type="checkbox" id={x.id} name="posts_without_files" value={x.game} />
						<label htmlFor="other">{x.game}</label></li>
			}) }
		</ul>
		<p>file in public</p>
	</form>
	</Fullframe>
}

export const getServerSideProps = withSessionSsr(async (context) => {
	let files_without_post, posts_without_files, files_lost, file_not_registered
	let error = ""
	let files_in_db, files_in_public, files_in_uploads

	if(context.req?.session?.admin){
		files_without_post = await get_files_without_post()
			.then(data => data)
			.catch(x => error.concat(x))
		//console.log("files_without_post", files_without_post)

		posts_without_files = await get_posts_without_files()
			.then(data => {
				data.forEach((element) => element.date = element.date.getTime()) // nextjs do not serialize date object.
				return data
			}) 
			.catch(x => error.concat(x))
		//console.log("posts_without_files", posts_without_files)

		files_in_uploads = await readdir("uploads/busboy/", {withFileTypes:true})
			.then((file_array) => file_array)
			.catch(x => error.concat(x))
		//console.log(files_in_uploads)

		files_in_public = await readdir("public/img/", {withFileTypes:true})
			.then((file_array) => file_array)
			.catch(x => error.concat(x))
		//console.log(files_in_public)

		files_in_db = await get_files()
			.then(data => {
				data.forEach((element) => element.date = element.date.getTime()) // nextjs do not serialize date object.
				return data
			})
			.catch(x => error.concat(x))
		//console.log(files_in_db)

		files_lost = files_in_db.filter(f => {
			return !(files_in_public.some(g => {
				console.log("public", g.name, f.name + "." + f.ext, g.isFile())
				let t = (g.name == (f.name + "." + f.ext) && g.isFile())
				console.log(t)
				return t
			})

			|| files_in_uploads.some(g => {
				console.log("uploads", g.name, f.name + "." + f.ext, g.isFile())
				let t = (g.name == (f.name) && g.isFile())
				console.log(t)
				return t
			}))
		})
		console.log("LOST", files_lost)

		file_not_registered = files_in_public.filter(f => {
			!files_in_db.some(g => {
				let t = (g.name == (f.name + "." + f.ext) && g.isFile())
				return t
			}
		})
		console.log("UNKNOW", files_lost)

	} else
		console.log("not admin")

	return {
			props: {
				files_without_post: files_without_post ?? null,
				posts_without_files: posts_without_files ?? null,
				error: error ?? null,
				//files_lost : files_lost ?? null,
				//files_in_db : files_in_db ?? null,
				//files_in_public : files_in_public ?? null,
				//files_in_uploads : files_in_uploads ?? null,
			}
		}
})