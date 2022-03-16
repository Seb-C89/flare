import Image from 'next/image' // TODO
import styles from '../styles/Gallery.module.css'
import React from 'react'

export default function (props){
	const { user_name, game, date } = props.post.post
	const name = props.post.file[0]?.name ?? ""
	const [img_ref] = React.useState(React.createRef())
	
	//console.log("CARD", props.viewer_func, props)
	return <article className={styles.card} onClick={() => props.viewer_func(img_ref)}>
		<img src={ "/api/image/public/"+name } alt="screenshoot" ref={ img_ref } />
		<footer>
			<p>In <span className={styles.game}>{ game }</span> posted by <span className="author">{ user_name ? user_name : "Anonyme" }</span> at <span className="date">{ new Date(date).toLocaleDateString() }</span></p>
		</footer>
	</article>
}