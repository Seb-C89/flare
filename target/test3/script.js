let flare1 = document.querySelector("#flare1")
	flare1.style.display = 'unset'

let middle_x = window.innerWidth / 2
let middle_y = window.innerHeight / 2

window.addEventListener('click', e => {
	console.log(e.clientX, e.clientY)
	let a = ((e.clientY - middle_y) / (e.clientX - middle_x))
	let b = middle_y - a * middle_x
	let solution = -b/a
	console.log("width", window.innerWidth)
	console.log("a", a, "b", b)
	console.log("solution", -b/a)
	flare1.style.left = `${solution}px`
})