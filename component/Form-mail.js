import React from "react"

export default function(props) {

	const form_ref = React.createRef();
	const autofocus_ref = React.createRef();
	const [error, setError] = React.useState(props.error);
	const [submited, setSubmited] = React.useState(props.submited);

	React.useEffect(() => {
		autofocus_ref.current.focus();
		console.log("FOCUS")
	});

	async function onSubmit(event) {
		event.preventDefault() // don't redirect the page
		var formData = new URLSearchParams(new FormData(form_ref.current))  // ?key=value&key2=value2
		fetch("http://localhost:3000/api/form/mail", {
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
			<p>Pour accéder aux formulaire vous devez d'abord validez votre adresse e-mail, ceci à fin d'éviter les spam/bot.<br />
			Vous recevrais un e-mail contenant le lien vous permettant de validez votre adresse e-mail.</p>
			<p><i>L'adresse e-mail ne sera ni conservé, ni communiqué à quiconque, conformément à notre politique de confidentialité.</i></p>
			<div>
				<label htmlFor="email">
					<span>E-mail:</span>
					<input id="email" name="email" type="email" ref={ autofocus_ref } autoFocus={ true } autoComplete="email" required={ true } />
				</label>
			</div>
			<div>
				<input id="submit" type="submit" value="Envoyer" disabled={ submited }/>
			</div>
			{ result() }
		</section>
	</form>
}

export function onSuccess(){
	return <p>Success</p>
}

export function onFail(){
	return <p>Fail</p>
}