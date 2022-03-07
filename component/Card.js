import Image from 'next/image' // TODO
import styles from '../styles/Gallery.module.css'

export default function (props){
	const { user_name, game, date, id } = props.post.post
	const name = props.post.file[0]?.name ?? ""

	return <article className={styles.card}>
		<img src={ "/api/image/public/"+name } alt="screenshoot" />
		<footer>
			<p>In <span className="game">{ game }</span> posted by <span className="author">{ id }</span> at <span className="date">{ new Date(date).toLocaleDateString() }</span></p>
		</footer>
	</article>
}