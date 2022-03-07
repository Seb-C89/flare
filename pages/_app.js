//import '../target/style.css'
import '../styles/globals.css'
import '../styles/fancy.css'
import Header from '../component/Header'
import Footer from '../component/Footer'

function MyApp({ Component, pageProps }) {
  return <> 
	<Header />
  		<Component {...pageProps} />
	<Footer />
  </>
}

export default MyApp
