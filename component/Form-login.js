import React from "react"

export default function(props) {

	const form_ref = React.createRef();
	const [error, setError] = React.useState(props.error);
	const [submited, setSubmited] = React.useState(props.submited);

	async function onSubmit(event) {
		event.preventDefault() // don't redirect the page
		var formData = new URLSearchParams(new FormData(form_ref.current))  // ?key=value&key2=value2
		fetch("http://localhost:3000/api/auth", {
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

	return <form ref={ form_ref } id="Form" method="POST" action="/login" onSubmit={onSubmit}>
		<section>
			<h2>Connexion</h2>
			<div>
				<label htmlFor="user">
					<span>Utilisateur:</span>
					<input id="user" name="user" autoComplete="username" required={ true } />
				</label>
			</div>
			<div>
				<label htmlFor="password">
					<span>Password:</span>
					<input id="password" name="password" type="password" autoComplete="current-password" required={ true } />
				</label>
			</div>
			<div>
				<input id="submit" type="submit" value="Envoyer" /*disabled={ submited }*//>
			</div>
			{ result() }
		</section>
	</form>
}

export function onSuccess(){
	return <p>Vous avez était authentifier</p>
}

export function onFail(){
	return <p>Utilisateur ou mot de passe erroné</p>
}