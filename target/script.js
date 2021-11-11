function show_viewer(e){
	document.getElementById('Viewer').style.display = "block";
	document.getElementById('Viewport').src = e.getElementsByTagName('img')[0].src;
	document.getElementById('Viewer').classList.toggle("fade_in");
	document.getElementById('Viewer').classList.toggle("fade_out", false);
	console.log("fade_in");
	//document.getElementById('Viewer').classList.toggle("fade_in");
	//document.getElementById('Viewer').style.animation = "fade_in 0.25s cubic-bezier(0,0,0,1) 1 forwards";
	//document.getElementById('Viewer').style.animation = "fade_in 0.25s ease-out 1 forwards";
	//document.getElementById('Viewer').style.animation = "fade_out 10s ease-out 1 forwards";
}

function hide_viewer(a){
	console.log("fade_out");
	a.addEventListener("AnimationEnd", (a) => remove_viewer(a));
	//document.getElementById('Viewer').style.animationPlayState = "paused";
	//document.getElementById('Viewer').style.animation = "fade_out 010s ease-out 0s 1 normal forwards";
	//document.getElementById('Viewer').style.animationPlayState = "running";
	//a.style.animation = "none";
	//a.classList.toggle("fade_in", false);
	//document.getElementById('Viewer').style.animation = "fade_in 10s ease-out 0s 1 reverse backwards";
	//a.classList.toggle("fade_out");
	document.getElementById('Viewer').classList.toggle("fade_in", false);
	document.getElementById('Viewer').classList.toggle("fade_out");
}

function remove_viewer(a) {
	console.log("animation_end");
	a.style.display = "none";
	a.removeEventListener("AnimationEnd", remove_viewer(a));
}