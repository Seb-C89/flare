import React from "react"

export default function(props) {

	const form_ref = React.createRef();
	const [error, setError] = React.useState(props.error);
	const [submited, setSubmited] = React.useState(props.submited);

	async function onSubmit(event) {
		event.preventDefault() // don't redirect the page
		var formData = new URLSearchParams(new FormData(form_ref.current))  // ?key=value&key2=value2
		fetch("http://localhost:3000/api/logout", {
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

	return <form ref={ form_ref } id="Form" method="POST" action="/contact" onSubmit={onSubmit}>
		<section>
			<h2>Déconnexion</h2>
			<div>
				<input id="submit" type="submit" value="Se déconnecter" disabled={ submited }/>
			</div>
			{ result() }
		</section>
	</form>
}

export function onSuccess(){
	return <p>Vous êtes déconnecter</p>
}

export function onFail(){
	return <p>Une erreur est survenu</p>
}