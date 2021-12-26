import Image from 'next/image' // TODO

export default function (props){
	const { image, user_name, game, date } = props.post

	return <article className="card">
		<img src={ "/img/"+image+".jpg" } alt="screenshoot" />
		<footer>
			<p>In <span className="game">{ game }</span> posted by <span class="author">{ user_name }</span> at <span class="date">{ date }</span></p>
		</footer>
	</article>
}