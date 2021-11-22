import Image from 'next/image'

export default function (props){
	const { image, user_name, game, date } = props.post

	return <article class="card">
		<img src={ "/../public/img/"+image+".jpg" } alt="screenshoot" />
		<footer>
			<p>In <span class="game">{ game }</span> posted by <span class="author">{ user_name }</span> at <span class="date">{ date }</span></p>
		</footer>
	</article>
}