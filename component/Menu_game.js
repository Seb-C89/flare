import Link from 'next/link'

export default function({ games }){
	
	let rows = games?.map((value, index) => {
		return <li key={ "game"+index }>
			<Link href={"/game/"+value.game}>{ ""+value.game}</Link> {" ("+value.count+")" }
			</li>
	})

	return <ul id="game_menu">
		{ rows }
	</ul>
}