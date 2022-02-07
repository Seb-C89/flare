import { withSessionSsr } from "../utils/withIronSession.js"
import Fullframe from "../component/Layout-fullframe.js"
import { get_files_without_post, get_posts_without_files } from "../utils/db.js"

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
	</form>
	</Fullframe>
}

export const getServerSideProps = withSessionSsr(async (context) => {
	let files_without_post, posts_without_files
	let error = ""

	if(context.req?.session?.admin){
		await get_files_without_post().then((data) => {
			files_without_post = data
			console.log("files_without_post", files_without_post)
		}).catch((x) => error.concat(x))

		await get_posts_without_files().then((data) => {
			data.forEach((element) => element.date = element.date.getTime()) // nextjs do not serialize date object.
			posts_without_files = data
			console.log("posts_without_files", posts_without_files)
		}).catch((x) => error.concat(x))
	} else
		console.log("not admin")

	return {
			props: {
				files_without_post: files_without_post ?? null,
				posts_without_files: posts_without_files ?? null,
				error: error ?? null
			}
		}
})