export default function(props) {
	return <form id="Form">
		<section>
			<h2>Participez !</h2>
			<div>
				<label for="file">
					<span>Choisissez une capture d'écran:</span>
					<input type="file" id="form_file" name="file" accept=".jpg, .jpeg, .png, .bmp" />
				</label>
			</div>
			<div>
				<label for="game">
					<span>Choisissez un jeu ou inscrivez un nouveau nom:</span>
					<input type="text" id="form_game" name="game" list="form_game_list" />
				</label>
			</div>
			<div>
				<label for="check">
					<input type="checkbox" id="form_check" name="check" />
					<span>En cochant cette case je déclare sur l'honneur que mon attention est bonne et qu'elle ne vise pas à discriminer, choqué ou porter atteinte à une communauté quelle qu'elle soit.</span>
				</label>
			</div>
			<div>
				<label for="mail">
					<span>Entrez votre adresse email:</span>
					<input type="email" id="form_mail" name="mail" autocomplete="email" required="true" />
					<br />
					<em>Vous devrez cliquez sur un lien envoyé par email pour validez le formulaire</em>
				</label>
			</div>
			<div>
				<input id="submit" type="button" value="Envoyer" />
			</div>
			<datalist id="form_game_list">
				<option value="Chrome" />
				<option value="Firefox" />
				<option value="Internet Explorer" />
				<option value="Opera" />
				<option value="Safari" />
				<option value="Microsoft Edge" />
			</datalist>
		</section>
	</form>
}