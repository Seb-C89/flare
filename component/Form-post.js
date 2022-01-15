import React from "react"

export default function(props) {

	const form_ref = React.createRef();
	let error = props.error
	
	const onSubmit = async event => {
		event.preventDefault() // don't redirect the page
		console.log("sending...")
		var formData = new FormData(form_ref.current)
		fetch("http://localhost:3000/api/form/post", {
			method: 'POST',
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
	
	return <form ref={ form_ref } id="Form" method="POST" encType="multipart/form-data" action="/result/post" onSubmit={onSubmit}>
		<section>
			<h2>Participez !</h2>
			<div>
				<label htmlFor="file">
					<span>Choisissez une capture d'écran:</span>
					<input type="file" id="form_file" name="file" /*accept=".jpg, .jpeg, .png, .bmp"*/ multiple={ false }/>
				</label>
			</div>
			<div>
				<label htmlFor="game">
					<span>Choisissez un jeu ou inscrivez un nouveau nom:</span>
					<input type="text" id="form_game" name="game" list="form_game_list" value={ props?.game } />
				</label>
			</div>
			<div>
				<label htmlFor="check">
					<input type="checkbox" id="form_check" name="check" value={ props?.check }/>
					<span>En cochant cette case je déclare sur l'honneur que mon attention est bonne et qu'elle ne vise pas à discriminer, choqué ou porter atteinte à une communauté quelle qu'elle soit.</span>
				</label>
			</div>
			<div>
				<label htmlFor="mail">
					<span>Entrez votre adresse email:</span>
					<input type="email" id="form_mail" name="mail" autoComplete="email" required={true} value={ props?.mail } />
					<br />
					<em>Vous devrez cliquez sur un lien envoyé par email pour validez le formulaire</em>
				</label>
			</div>
			<div>
				<input id="submit" type="submit" value="Envoyer" disabled={ props?.submited } />
			</div>
			<datalist id="form_game_list">
				<option value="Chrome" />
				<option value="Firefox" />
				<option value="Internet Explorer" />
				<option value="Opera" />
				<option value="Safari" />
				<option value="Microsoft Edge" />
			</datalist>
			{ props.error ? onSuccess() : onFail() }
		</section>
	</form>
}

export function onSuccess(){
	return <p>Merci. Votre participation à bien était enregistrer.</p>
}

export function onFail(){
	return <p>Un probléme est survenu lors de l'enregistrement de votre participation. Veuillez réessayer plustard.</p>
}