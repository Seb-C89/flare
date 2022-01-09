import React from "react"

export default function(props) {

	let error = props.error

	async function onSubmit(event) {
		event.preventDefault() // don't redirect the page
		var formData = new URLSearchParams(new FormData(form_ref.current))  // ?key=value&key2=value2
		fetch("http://localhost:3000/api/form/contact", {
			method: 'POST', // URLSearchParams passed in the body of the POST request, not in the url
			body: formData
		}).then((res) => {
			if(res.ok)
				console.log("DONE")
			else
				console.log("ERROR: "+res.status)
		}).catch(
			console.log("NETWORK ERROR")
		)
	}

	return <form ref={ props.ref } id="Form" method="POST" action="/result/contact" onSubmit={onSubmit}>
		<section>
			<h2>Contact</h2>
			<div>
				<label htmlFor="reply_to">
					<span>Entrez votre adresse email:</span>
					<input type="email" id="form_mail" name="reply_to" autoComplete="email" required={ true } value={ props.reply_to } />
				</label>
			</div>
			<div>
				<label htmlFor="subject">
					<span>Sujet:</span>
					<input id="subject" name="subject" autoComplete="email" required={ true } value={ props.subject } />
				</label>
			</div>
			<div>
				<label htmlFor="message">
					<span>Message:</span>
					<textarea id="form_message" name="message" required={ true } value={ props.message } />
				</label>
			</div>
			<div>
				<input id="submit" type="submit" value="Envoyer" disabled={ props.submited }/>
			</div>
			{ props.submited ? onSuccess() : onFail() }
		</section>
	</form>
}

export function onSuccess(query){
	return <p>Merci. Votre message à bien était enregistrer.<br />{ query?.message }</p>
}

export function onFail(query){
	return <p>Un probléme est survenu lors de l'enregistrement de votre message. Veuillez réessayer plustard.<br />{ query?.message}</p>
}