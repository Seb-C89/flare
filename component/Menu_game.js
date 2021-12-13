export default function({ games }){
	
	let rows = games?.map((value, index) => {
		return <li key={ "game"+index }>{ ""+value.game+" ("+value.count+")" }</li>
	})

	return <ul>
		{ rows }
	</ul>
}