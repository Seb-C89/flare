import React from "react"

export default function(props) {

	const form_ref = React.createRef();
	let error = props.error

	async function onSubmit(event) {
		event.preventDefault() // don't redirect the page
		var formData = new URLSearchParams(new FormData(form_ref.current))  // ?key=value&key2=value2
		fetch("http://localhost:3000/api/form/contact", {
			method: 'POST', // URLSearchParams passed in the body of the POST request, not in the url
			body: formData
		}).then((res) => {
			if(res.ok)
				//console.log("DONE")
				submited = true
			else
				//console.log("ERROR: "+res.status)
				error = true
		}).catch(
			console.log("NETWORK ERROR")
		)
	}

	return <form ref={ form_ref } id="Form" method="POST" action="/contact" onSubmit={onSubmit}>
		<section>
			<h2>Contact</h2>
			<div>
				<label htmlFor="reply_to">
					<span>Entrez votre adresse email:</span>
					<input type="email" id="form_mail" name="reply_to" autoComplete="email" required={ true } value={ props?.reply_to } />
				</label>
			</div>
			<div>
				<label htmlFor="subject">
					<span>Sujet:</span>
					<input id="subject" name="subject" autoComplete="email" required={ true } value={ props?.subject } />
				</label>
			</div>
			<div>
				<label htmlFor="message">
					<span>Message:</span>
					<textarea id="form_message" name="message" required={ true } value={ props?.message } />
				</label>
			</div>
			<div>
				<input id="submit" type="submit" value="Envoyer" disabled={ props?.submited }/>
			</div>
			{ props.error ? onSuccess() : onFail() }
		</section>
	</form>
}

export function onSuccess(){
	return <p>Merci. Votre message à bien était enregistrer.</p>
}

export function onFail(){
	return <p>Un probléme est survenu lors de l'enregistrement de votre message. Veuillez réessayer plustard.</p>
}