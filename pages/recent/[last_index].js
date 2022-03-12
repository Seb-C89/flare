import { get_games } from "../../utils/db"
import api_recent from "../api/recent/[id]"
import Game_menu from "../../component/Menu_game"
import Gallery from "../../component/Gallery"
import Layout from "../../component/Layout-sidemenu"

export default function recent(props){
	return <Layout>
		<Game_menu games={ props.games } />
		<Gallery posts={ props.posts } post_per_page={ props.post_per_page } viewer_func={ props.viewer_func } />
	</Layout>
}

export async function getServerSideProps(context) {
	const { last_index } = context.query || 0
	console.log("query", last_index)

	let posts = await api_recent({query: {id:last_index}}, null)
						.then(data => data.map(x => {
							x.post.date = x.post.date.valueOf()
							if(x.file[0])
								x.file[0].date = x.file[0].date.valueOf()
							return x
						}))
	let games = await get_games()

	return {
		props: { 
			posts: posts ?? null,
			games: games ?? null,
			post_per_page: parseInt(process.env.POST_PER_PAGE || 10)
		}
	}
}