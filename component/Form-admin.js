import React from "react"

export default function(props) {

	const form_ref = React.createRef();
	const [error, setError] = React.useState(props.error);
	const [submited, setSubmited] = React.useState(props.submited);

	async function onSubmit(event) {
		event.preventDefault() // don't redirect the page
		var formData = new URLSearchParams(new FormData(form_ref.current))  // ?key=value&key2=value2
		fetch("http://localhost:3000/api/form/contact", {
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

	return <form ref={ form_ref } id="Form" method="DELETE" action="/admin" onSubmit={onSubmit}>
		<section>
			<p>{props.error}</p>
			<p>File without related post</p>
			<ul>
				{ props.files_without_post?.map((x) => {
					return <li><input type="checkbox" id={x.id} name="files_without_post" value={x.name} />
							<label htmlFor="files_without_post">{x.name}</label></li>
				}) }
			</ul>
			<p>Post without related file</p>
			<ul>
				{ props.posts_without_files?.map((x) => {
					return <li><input type="checkbox" id={x.id} name="posts_without_files" value={x.game} />
							<label htmlFor="posts_without_files">{x.game}</label></li>
				}) }
			</ul>
			<p>Files uploaded but not regitered in Database</p>
			<ul>
			{ props.files_not_registered?.map((x) => {
					return <li><input type="checkbox" id={x} name="files_not_registered" value={x} />
							<label htmlFor="files_not_registered">{x}</label></li>
				}) }
			</ul>
			<p>Files in Database but not on Disk</p>
			<ul>
			{ props.files_lost?.map((x) => {
					return <li><input type="checkbox" id={x.id} name="files_lost" value={x.name} />
							<label htmlFor="files_lost">{x.name}</label></li>
				}) }
			</ul>
			<div>
				<p>Valider les posts séléctionnés et supprimer les fichiers séléctionnés:</p>
				<input id="submit" type="submit" value="Valider et Supprimer" disabled={ submited }/>
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