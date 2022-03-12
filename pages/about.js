import Fullframe from "../component/Layout-fullframe.js"

export default function about(props) {
	return <Fullframe>
		<h1>Lens Flare</h1>
		<p>L'effet de "Lens-Flare" a pour but d'augmenter l'immersion et le rendu photoréalistique des jeux vidéos en reproduisant un phénoméne optique naturelle.<br />
		Ce phénoméne se produit quand une source de lumiére est aligné avec un objectif de camera ou d'appareille photo, produisant une abération chromatique caractéristique.<br /></p>
		<p>C'est cette abération chromatique qui nous intéresse car elle unique à chaque systéme d'objectif et difficile à d'écrire, si bien qu'elle donne lieux a diverse interprétation que nous nous proposons de recencé. En effet si l'effet est unique à chaque systéme d'objectif il est aussi unique à chaque jeux vidéos !</p>
		<p>Mais l'effet de "Lens_Flare" n'est pas aprécier de tous. En effet il s'accompagne souvent d'un effet d'éblouissement ce qui n'est pas trés agréable et est utilisé à tord et à travers ! On le retrouve dans de nombreux jeux à la première personne, entendez: où l'on voit à travers les yeux du personnages. C'est la que le bas blesse puisque nos yeux sont ensensible a cette effect, ce ne sont pas des objectifs il ne sont pas fait de lentilles. Cette effect devrait donc se restreindre aux jeux à la troisiéme personnes (où, cette fois-ci, nous voyons le personnage au travers d'une camera)</p>
	</Fullframe>
}