import Link from 'next/link'

export default function (props){
	return <header className="flex_menu" id="header">
            <h1 style={{order: 2}}>Lens flare</h1>
            <ul>
                <li style={{order: 1}}>
                    <Link href="/">Galerie</Link></li>
                <li style={{order: 3}}>
                    <Link href="/about">A propos</Link></li>
                <li style={{order: 3}}>
                    <Link href="/form/contact">Contact</Link></li>
            </ul>
        </header>
}