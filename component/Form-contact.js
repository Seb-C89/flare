import React from "react"

export default function(props) {
	const form_ref = React.createRef();
	//const [status, setStatus] = useState();

	const onSubmit = async event => {
		event.preventDefault() // don't redirect the page
		var formData = new URLSearchParams(new FormData(form_ref.current))
		fetch("http://localhost:3000/api/form/contact", {
			method: 'POST',
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
	
	return <form ref={ form_ref } id="Form" method="POST" action="/result/contact" onSubmit={onSubmit}>
		<section>
			<h2>Contact</h2>
			<div>
				<label htmlFor="reply_to">
					<span>Entrez votre adresse email:</span>
					<input type="email" id="form_mail" name="reply_to" autoComplete="email" required={ true } />
				</label>
			</div>
			<div>
				<label htmlFor="message">
					<span>Entrez votre message:</span>
					<textarea id="form_message" name="message" required={ true } />
				</label>
			</div>
			<div>
				<input id="submit" type="submit" value="Envoyer" />
			</div>
			<div id="result">
				{
					//status()
				}
			</div>
		</section>
	</form>
}

export function onSuccess(query){
	return <p>Merci. Votre message à bien était enregistrer.<br />{ query.message }</p>
}

export function onFail(query){
	return <p>Un probléme est survenu lors de l'enregistrement de votre message. Veuillez réessayer plustard.<br />{ query.message}</p>
}