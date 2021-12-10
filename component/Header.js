import Link from 'next/link'

export default function (props){
	return <header className="flex_menu">
		<h1 style={{order: 2}}>Lens flare</h1>
		<ul>
			<li style={{order: 1}}>
				<a href="#">Galerie</a></li>
			<li style={{order: 3}}>
				<Link href="/about"><a>A propos</a></Link></li>
			<li style={{order: 3}}>
				<a href="#">Contact</a></li>
		</ul>
	</header>
}