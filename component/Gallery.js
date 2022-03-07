import Card from "./Card.js"
import React from 'react';
import styles from '../styles/Gallery.module.css'

export default function({ posts, post_per_page, viewer_func }) {
	const [get_more_button_ref] = React.useState(React.createRef());
	const [get_more_link_ref] = React.useState(React.createRef());
	const [cards, setCards] = React.useState({	cards: posts.map(x => <Card post={x} viewer_func={viewer_func} lol={"lol"}/>),
												last_id: posts[posts.length-1]?.post.id,
												added_cards: posts.length });

	function addCards(posts){
		let new_cards = posts.map(x => <Card post={x} viewer_func={viewer_func} lol={"lol"}/>)
		
		setCards({	cards:cards.cards.concat(new_cards),
					last_id: posts[posts.length-1]?.post.id,
					added_cards: posts.length })

		if(posts.length == post_per_page)
			get_more_button_ref.current.disabled = false
	}

	function get_more(){
		get_more_button_ref.current.disabled = true
		fetch(`http://localhost:3000/api/recent/${cards.last_id}`, {
			method: 'GET',
		}).then(async res => {
			if(res.ok){
				let r = await res.json()
				addCards(r)
			} else
				console.log("ERROR: "+res.status)
		}).catch((e) => {
			console.log("NETWORK ERROR", e)
		})
	}

	/*	effect to hide/reveal the good button
		link to the next page if no javascript,
		button to get more post if javascript	*/
	React.useEffect(()=>{
		get_more_button_ref.current.style.display = 'initial'
		get_more_link_ref.current.style.display = 'none'
	}, [get_more_link_ref]) // block the hook, so it will be executed only once

	console.log(cards.added_cards, post_per_page)
	return <section className={styles.gallery}>
		{ cards.cards }
		{ cards.added_cards == post_per_page ? <a href={"/index/"+cards.last_id} ref={ get_more_link_ref } >Next</a> : <></> }
		{ cards.added_cards == post_per_page ? <button onClick={get_more} ref={ get_more_button_ref } style={{display: 'none'}}>Get More</button> : <></> }
	</section>
}