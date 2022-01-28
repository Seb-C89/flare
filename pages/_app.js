import '../target/style.css'
import Header from '../component/Header.js'
import Footer from '../component/Footer.js'

function MyApp({ Component, pageProps }) {
  return <> 
	<Header />
  		<Component {...pageProps} />
	<Footer />
  </>
}

export default MyApp
