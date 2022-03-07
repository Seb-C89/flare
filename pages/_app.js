//import '../target/style.css'
import '../styles/globals.css'
import '../styles/viewer.css'
import Header from '../component/Header'
import Footer from '../component/Footer'
import React from 'react'

function MyApp({ Component, pageProps }) {
	const viewer_ref = React.createRef()
		pageProps.viewer_ref = viewer_ref
	const viewport_ref = React.createRef()
	
	function show_viewer(ref){
		console.log("SHOW", ref.current.src)
		console.log("fade_in")
		viewer_ref.current.style.display = "block";
		viewport_ref.current.src = ref.current.src;
		
		viewer_ref.current.classList.toggle("fade_in");
		viewer_ref.current.classList.toggle("fade_out", false);
	
		viewer_ref.current.addEventListener("click", hide_viewer);
	} pageProps.viewer_func = show_viewer
	
	function hide_viewer(){
		console.log("fade_out", this)
		viewer_ref.current.removeEventListener("click", hide_viewer);
		viewer_ref.current.addEventListener("animationend", remove_viewer);
	
		viewer_ref.current.classList.toggle("fade_in", false);
		viewer_ref.current.classList.toggle("fade_out");
	}
	
	function remove_viewer() {
		console.log("animation end", this)
		viewer_ref.current.style.display = "none";
		viewer_ref.current.removeEventListener("animationend", remove_viewer);
	}

	return <>
		<Header />
			<Component {...pageProps} />
		<Footer />
		<div id="Viewer" ref={ viewer_ref }><img id="Viewport" ref={ viewport_ref }/></div>
	</>
}

export default MyApp
