export default function(props){
	let a = [{"game":"battlefield 3","count":2},{"game":"serious sam: the second encounter","count":1}]
	
	let rows = a.map((v) => {
		return <li>{ ""+v.game+" ("+v.count+")" }</li>
	})

	return <ul>
		{ rows }
	</ul>
}