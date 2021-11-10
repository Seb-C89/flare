function show_viewer(e){
	document.getElementById('Viewer').style.display = "block";
	document.getElementById('Viewport').src = e.getElementsByTagName('img')[0].src;
	document.getElementById('Viewer').style.animation = "fade_in 0.25s cubic-bezier(0,0,0,1) 1 forwards";
}

function hide_viewer(a){
	a.addEventListener("AnimationEnd", remove_viewer(a));
	a.style.animation = "fade_out 0.25s cubic-bezier(0,0,0,1) 1 forwards";
}

function remove_viewer(a) {
	a.style.display = "none";
	a.removeEventListener("AnimationEnd", remove_viewer(a));
}