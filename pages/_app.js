//import '../target/style.css'
import '../styles/globals.css'
import '../styles/viewer.css'
import '../styles/fancy.css'
import Header from '../component/Header'
import Footer from '../component/Footer'
import React from 'react'

function MyApp({ Component, pageProps }) {
	const [viewer_ref] = React.useState(React.createRef())
	const [viewport_ref] = React.useState(React.createRef())
	// execute only once
	React.useState(() => {
		//console.log("SET PAGES PROPS")
		//Object.assign(pageProps, {viewer_func: show_viewer})
		pageProps.viewer_func = show_viewer
	})

	function show_viewer(ref){
		//console.log("SHOW", ref.current.src)
		//console.log("fade_in")

		viewer_ref.current.style.display = "block";
		viewport_ref.current.src = ref.current.src;
		
		viewer_ref.current.classList.toggle("fade_in");
		viewer_ref.current.classList.toggle("fade_out", false);
	
		viewer_ref.current.addEventListener("click", hide_viewer);
		
	} 
	
	function hide_viewer(){
		//console.log("fade_out", this)
		viewer_ref.current.removeEventListener("click", hide_viewer);
		viewer_ref.current.addEventListener("animationend", remove_viewer);
	
		viewer_ref.current.classList.toggle("fade_in", false);
		viewer_ref.current.classList.toggle("fade_out");
	}
	
	function remove_viewer(){
		//console.log("animation end", this)
		viewer_ref.current.style.display = "none";
		viewer_ref.current.removeEventListener("animationend", remove_viewer);
	}

	function flare(){
		console.log("FLAAAAAARE")
		
		let center = {	x: window.innerWidth / 2,
						y: window.innerHeight / 2	}
		
		let flares = ["light", "flare1", "flare2", "flare3"]
		
		for(let id of flares){
			flares[id] = document.getElementById(id)
			if(!flares[id].complete){
				console.log("not loaded"); flares[id].onload = flare; return; } // recall flare() onload (avoid cas where onload is not trigered because image is in the cache)
				flares[id].style.display = 'initial'
				flares[id].style.position = 'fixed'
				flares[id].style.top = '0px'
				flares[id].style.left = '0px'
				flares[id].halfClientWidth = flares[id].clientWidth / 2.0
				flares[id].halfClientHeight = flares[id].clientHeight / 2.0
		}
		
		console.log("FLAAAAAARE LOADED", flares)
		
		window.addEventListener('click', e => {
			console.log("clic", e.clientX, e.clientY)

			function find_source_positionX_by_linear_function(){ // f(x) = ax + b
				//console.log(e.clientX, e.clientY)
				let a = ((e.clientY - center.y) / (e.clientX - center.x)) // TODO division par zero ! (vertical)
				let b = center.y - a * center.x
				let solution = -b/a	// f(x) = 0	// TODO division par zero ! (horizontal)
				//console.log("width", window.innerWidth)
				//console.log("a", a, "b", b)
				//console.log("solution", -b/a)
				return solution
			}
		
			function find_source_positionX_by_point_reflection(){ // symetrie central
				return center.x + (center.x - e.clientX)
			}
		
			let x = find_source_positionX_by_point_reflection()
		
			// length of x;0 -> e.clientX;e.clientY
			let length = {	x: e.clientX - x,
							y: e.clientY - 0	}
			
			flares.light.style.left = `${ x -flares.light.halfClientWidth}px`
			flares.light.style.top = `${ 0 -flares.light.halfClientHeight}px`
			console.log("source", flares.light.style.left, flares.light.style.top)

			flares.flare1.style.left = `${x + length.x * 0.1 -flares.flare1.halfClientWidth}px`
			flares.flare1.style.top = `${length.y * 0.1 -flares.flare1.halfClientHeight}px`

			flares.flare2.style.left = `${x + length.x * 0.5 -flares.flare2.halfClientWidth}px`
			flares.flare2.style.top = `${length.y * 0.5 -flares.flare2.halfClientHeight}px`

			flares.flare3.style.left = `${x + length.x * 0.6 -flares.flare3.halfClientWidth}px`
			flares.flare3.style.top = `${length.y * 0.6 -flares.flare3.halfClientHeight}px`

			let angle = 60 * (Math.PI/180)
			let rx = e.clientX - x
			let xx = rx * Math.cos(angle) - e.clientY * Math.sin(angle);
    		let yy = rx * Math.sin(angle) + e.clientY * Math.cos(angle);
			xx += rx
			flares.flare3.style.left = `${x + (xx-x) * 0.5 -flares.flare3.halfClientWidth}px`
			flares.flare3.style.top = `${yy * 0.5 -flares.flare3.halfClientHeight}px`
		})
	}

	/* Because of onLoad trigger is fucked need to do ourselves... */
	React.useEffect(() => {
			flare();
	}, [])

	return <><div id="Viewer" ref={ viewer_ref }><img id="Viewport" ref={ viewport_ref }/></div>
		<Header />
			<Component {...pageProps} />
		<Footer />
		
		<img src="light.svg" className="flare" id="light"/>
		<img src="flare1.svg" className="flare" id="flare1"/>
		<img src="flare2.svg" className="flare" id="flare2"/>
		<img src="flare3.svg" className="flare" id="flare3"/>
	</>
}
//<object data="flares.svg" type="image/svg+xml" id="flares" width="100%" height="100%" onLoad={flare}/>
export default MyApp
