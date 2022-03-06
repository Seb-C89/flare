let light = document.querySelector("#light")
	light.onload = () => {
		// add propertie
		light.halfClientWidth = light.clientWidth / 2.0
		light.halfClientHeight = light.clientHeight / 2.0
	}
	light.style.display = 'unset'	// unhide

let flare1 = document.querySelector("#flare1")
flare1.onload = () => {
	// add propertie
	flare1.halfClientWidth = flare1.clientWidth / 2.0
	flare1.halfClientHeight = flare1.clientHeight / 2.0
}
flare1.style.display = 'unset'	// unhide

let center = {	x: window.innerWidth / 2,
				y: window.innerHeight / 2	}
console.log("center", center.x, center.y)

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

	// move along the vector x;0 -> e.clientX;e.clientY
	let length = {	x: e.clientX - x,
					y: e.clientY		}
	
	flare1.style.left = `${x + length.x * 0.8 -flare1.halfClientWidth}px`
	flare1.style.top = `${length.y * 0.8 -flare1.halfClientHeight}px`

	light.style.left = `${ x -light.halfClientWidth}px`
	light.style.top = `${-light.halfClientHeight}px`
	console.log("source", light.style.left, light.style.top)
})