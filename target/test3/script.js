let middle_x = window.innerWidth / 2
let middle_y = window.innerHeight / 2

window.addEventListener('mousemove', e => {
	let a = ((e.clientY - middle_y) / (e.clientX - middle_x))
	let b = middle_y - a * middle_x
	console.log("a", a)
	console.log("b", b)
})