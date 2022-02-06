import { withSessionSsr } from "../utils/withIronSession.js"
import Fullframe from "../component/Layout-fullframe.js"
import { get_files_without_post, get_posts_without_files } from "../utils/db.js"

export default function(props){
	return <Fullframe>

	</Fullframe>
}

export const getServerSideProps = withSessionSsr(async (context) => {
	let files_without_post, posts_without_files

	if(context.req?.session?.admin){
		await get_files_without_post().then((data) => {
			files_without_post = data
		}).catch(() => console.log("erorororororro"))

		await get_posts_without_files().then((data) => {
			data.forEach((element) => element.date = element.date.getTime()) // nextjs do not serialize date object.
			posts_without_files = data  
		}).catch(() => console.log("erorororororro"))
	}

	return {
			props: {
				files_without_post: files_without_post ?? null,
				posts_without_files: posts_without_files ?? null,
			}
		}
})