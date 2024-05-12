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
		setSubmited(true)
		var formData = new URLSearchParams(new FormData(form_ref.current))  // ?key=value&key2=value2
		fetch(process.env.NEXT_PUBLIC_API+"/form/mail", {
			method: 'POST', // URLSearchParams passed in the body of the POST request, not in the url
			body: formData
		}).then((res) => {
			if(res.ok)
				//console.log("DONE")
				setError(false)
			else
				//console.log("ERROR: "+res.status)
				setError(true)
		}).catch(() => {
			console.log("NETWORK ERROR")
		})
	}

	function result(){
		if(error !== undefined && error !== null) {
			if(error)
				return onFail()
			else
				return onSuccess()
		}
	}

	return <><form ref={ form_ref } id="Form" method="POST" action="/login" onSubmit={onSubmit}>
		<section>
			<h2>Connexion</h2>
			<p>Pour accéder au formulaire vous devez d'abord valider votre adresse e-mail, ceci à fin d'éviter les spam/bot.<br />
			Vous recevrez un e-mail contenant un lien vous permettant de vous connecter.</p>
			<p><i>L'adresse e-mail ne sera ni conservée, ni communiquée à quiconque, conformément à notre politique de confidentialité.</i></p>
			<div>
				<label htmlFor="email">
					<span>E-mail:</span>
					<input id="email" name="email" type="email" ref={ autofocus_ref } autoFocus={ true } autoComplete="email" required={ true } />
				</label>
			</div>
			<input name="from" type="hidden" value={props?.from} />
			<div>
				<input id="submit" type="submit" value="Envoyer" disabled={ submited }/>
			</div>
			{ result() }
		</section>
	</form>
	<form>
	<section id="Oauth_section">
		<h2>Ou utilisez un compte existant</h2>
		<p>Seule votre adresse mail sera consulter et utiliser pour enregistrez vos post ou message.</p>
			<button className="Oauth Gmail" formMethod="get" formAction="/api/Oauth/Google"><img src="/gmail_ico.png" /><span>Gmail</span></button>
			<button className="Oauth Outlook" formMethod="get" formAction="/api/Oauth/Outlook"><img src="/outlook_ico.ico" /><span>Outlook</span></button>
			<button className="Oauth GitHub" formMethod="get" formAction="/api/Oauth/GitHub"><img src="/github_ico.png" /><span>GitHub</span></button>
		</section>
	</form>
	</>
}

export function onSuccess(){
	return <p>Success</p>
}

export function onFail(){
	return <p>Fail</p>
}