import Link from 'next/link'

export default function (props){
	return <footer className="flex_menu" id="footer">
		<ul>
			<li><Link href="/form/post"><a>Participez!</a></Link></li>
			<li>Confidentialit√©</li>
			<li>Inspir√© par: <a href="https://vgsmproject.com/">The video game soda machin project</a></li>
		</ul>
	</footer>
}