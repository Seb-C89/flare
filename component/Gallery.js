import Card from "./Card.js"

export default function(props) {
	const { posts } = props
	
	let cards = posts.map((v) => {
		return <Card post={v} />
	})

	return <section id="Gallery">
		{ cards }
	</section>
}