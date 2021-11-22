export default function(props){
	let { games } = props
	
	let rows = games.map((value, index) => {
		return <li key={ "game"+index }>{ ""+value.game+" ("+value.count+")" }</li>
	})

	return <ul>
		{ rows }
	</ul>
}