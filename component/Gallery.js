import Card from "./Card.js"
import React, { useEffect, useState, createRef } from 'react';
import concat from "concat-stream";
//import { get_recent, get_games } from '../utils/db.js'

export default function({ posts }) {

	const get_more_button_ref = createRef();
	const [cards, setCards] = useState({	cards: posts.map(x => <Card post={x} />),
											last_id: posts[posts.length-1].post.id,
											added_cards: posts.length });

	function addCards(posts){
		console.log("ADDDDDDDD")
		let new_cards = posts.map(x => <Card post={x} />)
		setCards({	cards:cards.cards.concat(new_cards),
					last_id: posts[posts.length-1].post.id,
		added_cards: posts.length })
	}

	console.log("eeeeeeeeeeeeeeeeeeeee")

	function get_more(){
		get_more_button_ref.current.disabled = true
		fetch(`http://localhost:3000/api/recent/${cards.last_id}`, {
			method: 'GET',
		}).then(async res => {
			if(res.ok){
				let r = await res.json()
				addCards(r)
				if(r.length == 10)
					get_more_button_ref.current.disabled = false
			}
			else{
				console.log("ERROR: "+res.status)
			}
		}).catch(() => {
			console.log("NETWORK ERROR")
		})
	}

	return <section id="Gallery">
		{ cards.cards }
		{ cards.added_cards == 10 ? <a href={"/index/"+cards.last_id}>Next</a> : <></> }
		{ cards.added_cards == 10 ? <button onClick={get_more} ref={ get_more_button_ref }>Get More</button> : <></> }
	</section>
}