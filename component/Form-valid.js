import React from "react"

export default function(props) {

	const form_ref = React.createRef();
	const [error, setError] = React.useState(props.error);
	const [submited, setSubmited] = React.useState(props.submited);

	async function onSubmit(event) {
		event.preventDefault() // don't redirect the page
		var formData = new URLSearchParams(new FormData(form_ref.current))  // ?key=value&key2=value2
		fetch("http://localhost:3000/api/valid", {
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

	console.log(props.posts)

	return <form ref={ form_ref } id="Form" method="POST" action="/admin" onSubmit={onSubmit}>
		<section>
			{ props.error ? <p>{props.error}</p> : <></> }
			{ props.posts.map(x => {
				return <fieldset>
				<label htmlFor={x.post.id}>Action: </label>
				<select name={JSON.stringify({
					id: x.post.id,
					game: x.post.game,
					date: x.post.date
				})} id={x.post.id}>
					<option value="">--Choisir une action--</option>
					<option value="val">VALID</option>
					<option value="del">DEL</option>
				</select>
				{x?.file[0] ? <img src={"/api/image/upload/"+x.file[0].name} alt={x.post.game}/> : <p>pas d'image</p>}
				</fieldset>
			})}
			<div>
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