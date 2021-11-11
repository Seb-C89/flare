console.log(document.getElementById("Viewer"));

function show_viewer(e){
	//document.getElementById('Viewer').addEventListener("animationend", l);
	console.log("fade_in")
	document.getElementById('Viewer').style.display = "block";
	document.getElementById('Viewport').src = e.getElementsByTagName('img')[0].src;
	
	document.getElementById('Viewer').classList.toggle("fade_in");
	document.getElementById('Viewer').classList.toggle("fade_out", false);

	document.getElementById('Viewer').addEventListener("click", hide_viewer);
}

function hide_viewer(){
	console.log("fade_out", this)
	this.removeEventListener("click", hide_viewer);
	this.addEventListener("animationend", remove_viewer);

	this.classList.toggle("fade_in", false);
	this.classList.toggle("fade_out");
}

function remove_viewer() {
	console.log("animation end", this)
	this.style.display = "none";
	this.removeEventListener("animationend", remove_viewer);
}

/*function l() {
	console.log('ttttttt')
	document.getElementById('Viewer').addEventListener("click", hide_viewer);
	document.getElementById('Viewer').removeEventListener("animationend", l);
}*/