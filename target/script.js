function show_viewer(e){
	document.getElementById('Viewer').style.display = "block";
	document.getElementById('Viewport').src = e.getElementsByTagName('img')[0].src;
}

function hide_viewer(){
	document.getElementById('Viewer').style.display = "none";
}