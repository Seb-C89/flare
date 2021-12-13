import Card from "./Card.js"
//import { get_recent, get_games } from '../utils/db.js'

export default function({ posts }) {
	
	let cards = posts?.map((v) => {
		return <Card post={v} />
	})

	return <section id="Gallery">
		{ cards }
	</section>
}