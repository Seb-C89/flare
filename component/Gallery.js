import Card from "./Card.js"
import React from 'react';
import styles from '../styles/Gallery.module.css'

export default function({ posts, post_per_page, viewer_func }) {
	const [get_more_button_ref] = React.useState(React.createRef());
	const [get_more_link_ref] = React.useState(React.createRef());
	const [cards, setCards] = React.useState({	cards: [],			// can't use addCards() here because it use setCards() and create infinite call between them
												last_id: undefined,
												addCards: undefined	});
	// Execute only one
	React.useState(() => {
		addCards(posts)	// add initial cards given by props
	})

	function addCards(posts){
		let new_cards = posts.map(x => <Card post={x} viewer_func={viewer_func}/>)
		
		setCards({	cards:cards.cards.concat(new_cards),
					last_id: posts[posts.length-1]?.post.id,
					added_cards: posts.length })
	}

	function get_more(){
		console.log("GETTING MORE CARDS")
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
		console.log("SET BUTTON DISPLAY")
		get_more_button_ref.current.style.display = 'initial'
		get_more_link_ref.current.style.display = 'none'

		get_more_button_ref.current.disabled = true
	}, [])

	/*	unlock the get more button if receive complete page,
		else it is that the end of database is reach			*/
	React.useEffect(()=>{
		console.log("UNBLOCK BUTTON")
		if(cards.added_cards == post_per_page)
			get_more_button_ref.current.disabled = false
	}, [cards])

	console.log(cards.added_cards, post_per_page)
	return <section className={styles.gallery}>
		{ cards.cards }
		{ /* if it added less card, it is that the end of the db is reach */ }
		{ cards.added_cards == post_per_page ? <a href={"/recent/"+cards.last_id} ref={ get_more_link_ref } >Next</a> : <></> }
		{ cards.added_cards == post_per_page ? <button onClick={get_more} ref={ get_more_button_ref } style={{display: 'none'}}>Get More</button> : <></> }
	</section>
}