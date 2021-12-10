import '../target/style.css'
import Header from '../component/Header.js'
import Footer from '../component/Footer.js'
import Link from 'next/link'

function MyApp({ Component, pageProps }) {
  return <> 
	<Header />
  		<Component {...pageProps} />
	<Footer />
  </>
}

export default MyApp
