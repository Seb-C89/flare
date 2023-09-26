import React from "react"
import style from '../styles/Form-valid.module.css'

export default function(props) {

	const form_ref = React.createRef();
	const [error, setError] = React.useState(props.error);
	const [submited, setSubmited] = React.useState(props.submited);

	async function onSubmit(event) {
		event.preventDefault() // don't redirect the page
		var formData = new URLSearchParams(new FormData(form_ref.current))  // ?key=value&key2=value2
		fetch(process.env.NEXT_PUBLIC_API_admin+"/valid", {
			method: 'POST', // URLSearchParams passed in the body of the POST request, not in the url
			body: formData
		}).then((res) => {
			if(res.ok)
				//console.log("DONE")
				setSubmited(true)
			else
				//console.log("ERROR: "+res.status)
				setError(true)
		}).catch(() => {
			console.log("NETWORK ERROR")
		})
	}

	function result(){
		if(submited)
			return onSuccess()
		if(error)
			return onFail()
	}

	return <form ref={ form_ref } id="Form" className={style.form} method="POST" action="/admin" onSubmit={onSubmit}>
		<section>
			{ props.error ? <p>{props.error}</p> : <></> }
			{ props.posts.map(x => {
				return <>
				<div>
					<label htmlFor={x.post.id}>
						<ul>
							<li>Jeu: {x.post.game}</li>
							<li>Date: { new Date(x.post.date).toLocaleDateString() }</li>
							<li>Par: {x.post.user_name}</li>
							<li>Ckeck_box: {x.post.check_box}</li>
						</ul>
					</label>
					<select name={JSON.stringify({
						id: x.post.id,
						game: x.post.game,
						date: x.post.date
					})} id={x.post.id}>
						<option value="">--Choisir une action--</option>
						<option value="VAL">VALID</option>
						<option value="DEL">DEL</option>
					</select>
				</div>
				{x?.file[0] ? <img src={"/api/image/upload/"+x.file[0].name} alt={x.post.game} /> : <p>pas d'image</p>}
				</>
			})}
			<div className="submit">
				<input id="submit" type="submit" value="Sauvegarder les changements" disabled={ submited }/>
			</div>
			{ result() }
		</section>
	</form>
}

export function onSuccess(){
	return <p>Merci. Votre message à bien était enregistrer.</p>
}

export function onFail(){
	return <p>Un probléme est survenu lors de l'enregistrement de votre message. Veuillez réessayer plustard.</p>
}