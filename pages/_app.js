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
	const [isload, setIsload] = React.useState(false) // avoid multiple window.addEventListener('click'
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
		//console.log("FLAAAAAARE")
		
		let flares = ["flare1", "light", "flare2", "flare3", "flare4", "flare5", "flare6"] // flare1 embed an bitmap, it is the larger file
		
		for(let id of flares){
			flares[id] = document.getElementById(id)
			
			if(!flares[id].complete){	// recall flare() onload (avoid cas where onload is not trigered because image is in the cache)
				//console.log("not loaded");
				flares[id].onload = flare;
				return;
			}
		}

		setIsload(true) 
		//console.log("FLAAAAAARE LOADED", flares)

		window.addEventListener('mousemove', e => {	// display flares on first move
			for(let id of flares){
				flares[id].style.display = 'initial'
				flares[id].halfClientWidth = flares[id].clientWidth / 2.0	// must be drawed for mesuring clientWidth and height
				flares[id].halfClientHeight = flares[id].clientHeight / 2.0
				flares[id].style.position = 'fixed'
				flares[id].style.top = '0px'
				flares[id].style.left = '0px'
			}
		}, {once: true})

		window.addEventListener('mousemove', e => {
			//console.log("clic", e.clientX, e.clientY)

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
		
			function find_light_positionX_by_point_reflection(){ // symetrie central
				return center.x + (center.x - e.clientX)
			}

			function client_angle(){
				var firstAngle = Math.atan2(e.clientY, e.clientX-x);
				var secondAngle = Math.atan2(1, 0);

				return firstAngle - secondAngle;
			}
		
			let center = {	x: window.innerWidth / 2,
							y: window.innerHeight / 2	}

			let x = find_light_positionX_by_point_reflection()

			// length of x;0(light) -> e.clientX;e.clientY
			let length = {	x: e.clientX - x,
							y: e.clientY - 0	}
			
			let opacity = x * 100 / (window.innerWidth)
				if(opacity < 50) opacity = 100 - opacity
				opacity /= 100
				opacity = 1 - opacity
			//console.log("opacity", opacity)

			let click_angle = client_angle()
			

			flares.light.style.left = `${ x -flares.light.halfClientWidth}px`
			flares.light.style.top = `${ 0 -flares.light.halfClientHeight}px`
			//console.log("source", flares.light.style.left, flares.light.style.top)

			flares.flare1.style.left = `${x + length.x * 0.25 -flares.flare1.halfClientWidth}px`
			flares.flare1.style.top = `${length.y * 0.15 -flares.flare1.halfClientHeight}px`
			flares.flare1.style.opacity = opacity

			flares.flare2.style.left = `${x + length.x * 0.55 -flares.flare2.halfClientWidth}px`
			flares.flare2.style.top = `${length.y * 0.55 -flares.flare2.halfClientHeight}px`
			flares.flare2.style.opacity = opacity

			flares.flare3.style.left = `${x + length.x * 0.7 -flares.flare3.halfClientWidth}px`
			flares.flare3.style.top = `${length.y * 0.7 -flares.flare3.halfClientHeight}px`
			flares.flare3.style.opacity = opacity

			let angle = { val: -20 * (Math.PI/180) }
				angle.sin = Math.sin(angle.val)
				angle.cos = Math.cos(angle.val)
			let x2 = e.clientX - x
				let xx = x2 * angle.cos - e.clientY * angle.sin	
				let yy = x2 * angle.sin + e.clientY * angle.cos;
			xx = xx + x	
			
			flares.flare4.style.left = `${x + + ((xx-x)) + 0.2 * length.x}px`
			flares.flare4.style.top = `${0 + 0.2 * length.y}px`
			flares.flare4.style.opacity = opacity

			flares.flare5.style.left = `${x + length.x * 0.8 -flares.flare5.halfClientWidth}px`
			flares.flare5.style.top = `${length.y * 0.8 -flares.flare5.halfClientHeight}px`
			flares.flare5.style.transform = `rotate(${click_angle}rad)`
			flares.flare5.style.opacity = opacity

			flares.flare6.style.left = `${x + length.x * 0.9 -flares.flare6.halfClientWidth}px`
			flares.flare6.style.top = `${length.y * 0.9 -flares.flare6.halfClientHeight}px`
			flares.flare6.style.transform = `rotate(${click_angle}rad)`
			flares.flare6.style.opacity = opacity
		
		})
	}

	React.useEffect(() => {	// because onLoad is not triggered on cached img and not triggered on window.onload
		if(!isload)
			flare();
	}, [])

	return <><div id="Viewer" ref={ viewer_ref }><img id="Viewport" ref={ viewport_ref }/></div>
		<Header />
			<Component {...pageProps} />
		<Footer />
		
		<img src="/light.svg" className="flare" id="light"/>
		<img src="/flare1.svg" className="flare" id="flare1"/>
		<img src="/flare2.svg" className="flare" id="flare2"/>
		<img src="/flare3.svg" className="flare" id="flare3"/>
		<img src="/flare4.svg" className="flare" id="flare4"/>
		<img src="/flare5.svg" className="flare" id="flare5"/>
		<img src="/flare6.svg" className="flare" id="flare6"/>
	</>
}
//<object data="flares.svg" type="image/svg+xml" id="flares" width="100%" height="100%" onLoad={flare}/>
export default MyApp
