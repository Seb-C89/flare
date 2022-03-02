import Game_menu from "../../component/Menu_game"
import Gallery from "../../component/Gallery"
import Layout from "../../component/Layout-sidemenu"
import { get_games } from "../../utils/db"
import api_recent from "../api/recent/[id]"

export default function({ posts, games }){
	return <Layout>
		<Game_menu games={games} />
		<Gallery posts={ posts } />
	</Layout>
}

export async function getServerSideProps(context) {
	const { last_index } = context.query
	console.log("query", last_index)

	let posts = await api_recent({query: context.query}, null)
						.then(data => data.map(x => {
							x.post.date = x.post.date.valueOf()
							if(x?.file)
								console.log("date", x.file.date)
							//	x.file.date = x.file.date.valueOf()
							return x.post
						}))
	let games = await get_games()

	return {
		props: { 
			posts: posts ?? null,
			games: games ?? null
		}
	}
}