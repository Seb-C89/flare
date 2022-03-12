import React from "react"

export default function(props) {

	const form_ref = React.createRef();
	const [error, setError] = React.useState(props.error);
	const [submited, setSubmited] = React.useState(props.submited);

	async function onSubmit(event) {
		event.preventDefault() // don't redirect the page
		var formData = new URLSearchParams(new FormData(form_ref.current))  // ?key=value&key2=value2
		fetch("http://localhost:3000/api/gKlm/file", {
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
			{ props.error ? <p>{props.error}</p> : <></> }
			<fieldset>
				<legend>File without related post</legend>
				<p>Sélectionner les fichiers à supprimer</p>
				<ul>
					{ props.files_without_post?.map(x => {
						let id=x.id+"files_without_post"
						return <li key={id}><input type="checkbox" id={id} name={"files_without_post"} value={JSON.stringify({id: x.id, name:x.name})} />
								<label htmlFor={id}><b>{x.name}</b> <i>({x.ext ? "."+x.ext : ""}) {new Date(x.date).toLocaleString()}</i></label></li>
					}) }
				</ul>
			</fieldset>
			<fieldset>
				<legend>Post without related file</legend>
				<p>Sélectionner les posts à supprimer</p>
				<ul>
					{ props.posts_without_files?.map(x => {
						let id=x.id+"posts_without_files"
						return <li key={id}><input type="checkbox" id={id} name="posts_without_files" value={JSON.stringify({id: x.id, game:x.game})} />
								<label htmlFor={id}><b>{x.game}</b> ({new Date(x.date).toLocaleString()})</label></li>
					}) }
				</ul>
			</fieldset>
			<fieldset>
				<legend>Files in Database but not on Disk <em>(publique or uploads directory)</em></legend>
				<p>Sélectionner les fichiers à supprimer</p>
				<ul>
				{ props.files_lost?.map((x) => {
					let id=x.id+"files_lost"
						return <li key={id}><input type="checkbox" id={id} name="files_lost" value={JSON.stringify({id: x.id, name:x.name})} />
								<label htmlFor={id}><b>{x.name}</b> <i>({x.ext ? "."+x.ext : ""}) {new Date(x.date).toLocaleString()}</i></label></li>
					}) }
				</ul>
			</fieldset>
			<fieldset>
				<legend>Files in Disk but not in Database <em>(publique or uploads directory)</em></legend>
				<p>Sélectionner les fichiers à supprimer</p>
				<ul>
				{ props.files_not_registered?.map((x, index) => {
					let id=index+"files_not_registered"
						return <li key={id}><input type="checkbox" id={id} name="files_not_registered" value={JSON.stringify(x)} />
								<label htmlFor={id}>{x.directory}/{x.name}</label></li>
					}) }
				</ul>
			</fieldset>
			<fieldset>
				<legend>Files in bad directory</legend>
				<p>Disponible Bientôt</p>
			</fieldset>
			<div>
				<input id="submit" type="submit" value="Supprimer les fichiers sélectionnés" disabled={ submited }/>
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