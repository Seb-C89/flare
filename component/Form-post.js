import React from "react"

export default function(props) {

	const form_ref = React.createRef();
	const [error, setError] = React.useState(props.error);
	const [submited, setSubmited] = React.useState(props.submited);
	
	const onSubmit = async event => {
		event.preventDefault() // don't redirect the page
		console.log("sending...")
		var formData = new FormData(form_ref.current)
		fetch(process.env.NEXT_PUBLIC_API+"/form/post", {
			method: 'POST',
			body: formData
		}).then((res) => {
			if(res.ok)
				//console.log("DONE")
				setSubmited(true)
			else
				//console.log("ERROR: "+res.status)
				setError(true)
		}).catch(
			console.log("NETWORK ERROR")
		)
	}

	function result(){
		if(submited)
			return onSuccess()
		if(error)
			return onFail()
	}
	
	return <form ref={ form_ref } id="Form" method="POST" encType="multipart/form-data" action="/form/post" onSubmit={onSubmit}>
		<section>
			<h2>Participez !</h2>
			<div>
				<label htmlFor="form_file">
					<span>Choisissez une capture d'écran:</span>
					<input type="file" id="form_file" name="file" accept=".jpg, .jpeg, .png, .bmp" multiple={ false } required={ true } />
				</label>
			</div>
			<div>
				<label htmlFor="form_game">
					<span>Choisissez un jeu ou inscrivez un nouveau nom:</span>
					<input type="text" id="form_game" name="game" list="form_game_list" value={ props?.game } required={ true } />
				</label>
			</div>
			<div>
				<label htmlFor="form_name">
					<span>Signer avec un pseudo (facultatif):</span>
					<input type="text" id="form_name" name="name" value={ props?.name } />
				</label>
			</div>
			<div>
				<label htmlFor="form_check">
					<input type="checkbox" id="form_check" name="check" value={ true } checked={ props?.check } />
					<span>En cochant cette case je déclare sur l'honneur que mon attention est bonne et qu'elle ne vise pas à discriminer, choquer ou porter atteinte à une communauté quelle qu'elle soit.</span>
				</label>
			</div>
			{/*<div>
				<label htmlFor="form_mail">
					<span>Entrez votre adresse email:</span>
					<input type="email" id="form_mail" name="mail" autoComplete="email" required={true} value={ props?.mail } />
					<br />
					<em>Vous devrez cliquez sur un lien envoyé par email pour validez le formulaire</em>
				</label>
			</div>*/}
			<div>
				<input id="form_submit" type="submit" value="Envoyer" disabled={ props?.submited } />
			</div>
			<datalist id="form_game_list">
				{ props?.games.map(x => <option value={ x.game } key={ x.game } />) }
			</datalist>
			{ result() }
		</section>
	</form>
}

export function onSuccess(){
	return <p>Merci. Votre participation à bien était enregistrer.</p>
}

export function onFail(){
	return <p>Un probléme est survenu lors de l'enregistrement de votre participation. Veuillez réessayer plustard.</p>
}