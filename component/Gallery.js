import Card from "./Card.js"
import React from "react";
//import { get_recent, get_games } from '../utils/db.js'

export default function({ posts }) {
	
	let initial_cards = posts?.map((v) => {
		return <Card post={v} />
	})

	const [cards, addCards] = React.useState(initial_cards);
	const [last_id, setError] = React.useState(posts[posts.length-1].post.id);
	console.log(posts)
	console.log("last_id", last_id, "cards length", cards.length)

	function get_more(){
		fetch(`http://localhost:3000/api/recent/${last_id}`, {
			method: 'GET',
		}).then((res) => {
			if(res.ok)
				console.log(res.json())
			else
				console.log("ERROR: "+res.status)
		}).catch(() => {
			console.log("NETWORK ERROR")
		})
	}

	return <section id="Gallery">
		{ cards }
		{ cards.length == 10 ? <a href={"/index/"+last_id}>Next</a> : <></> }
	</section>
}