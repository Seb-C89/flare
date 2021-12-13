import Game_menu from "../../../component/Menu_game.js"
import Gallery from "../../../component/Gallery.js"
import Layout from "../../../component/Layout-sidemenu.js"
import { get_games, get_recent, get_by_game } from "../../../utils/db.js"

export default function({ posts, games }){
	return <Layout>
		<Game_menu games={games} />
		<Gallery posts={ posts } />
	</Layout>
}

export async function getServerSideProps(context) {
	console.log(context.params)
	let filter = context.params.filter ?? null
	let by = context.params.by?.[0] ?? null

	return {
	  props: { 
		  games : await get_games().then((data) => data).catch(() => []),
		  posts : await get_posts(filter, by)
											.then((data) => {
												console.log(data)  
												return data
											})
											.catch(() => []),
		  params : context.params
		}, // will be passed to the page component as props
	}
	
	async function get_posts(filter=undefined, game=undefined){
		switch(filter){
			default:
			case "recents":
				return get_recent()
			case "game":
				return get_by_game(game)
		}
	}
  }