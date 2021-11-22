import Game_menu from "../component/Menu_game.js"
import Gallery from "../component/Gallery.js"
import { get_games, get_recent } from "../utils/db.js"

export default function(props){
	return <>
		<Game_menu games={ props.games } />
		<Gallery posts={ props.posts } />
	</>
}

export async function getServerSideProps(context) {
	return {
	  props: { 
		  games : await get_games().then((data) => data).catch(() => []),
		  posts : await get_recent().then((data) => data).catch(() => [])
		}, // will be passed to the page component as props
	}
  }