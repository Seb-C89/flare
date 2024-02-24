import Link from 'next/link'

export default function (props){
	return <footer className="flex_menu" id="footer">
            <ul>
                <li><Link href="/form/post">Participez!</Link></li>
                <li>Confidentialité</li>
                <li>Mon autre projet: <Link href="/picross.html">Nonogram</Link></li>
                <li>Inspiré par: <Link href="https://vgsmproject.com/">The video game soda machin project</Link></li>
            </ul>
        </footer>
}