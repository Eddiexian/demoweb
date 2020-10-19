var cvs = document.getElementById('cvs');
var ctx = cvs.getContext('2d');
var radius =20;
var dragging = false;

cvs.width = 280;
cvs.height = 280;

ctx.lineWidth = radius*2;
var putPoint = function(e){
	if(dragging){
	var rect = cvs.getBoundingClientRect();
	ctx.lineTo(e.clientX-rect.left,e.clientY-rect.top);
	ctx.stroke();
	ctx.beginPath();
	ctx.arc(e.clientX-rect.left,e.clientY-rect.top,radius,0,Math.PI*2);
	ctx.fill();
	ctx.beginPath();
	ctx.moveTo(e.clientX-rect.left,e.clientY-rect.top);
	}
}

var setCanvasPosition = function() { 
    "use strict"; 
    cvs.style.top = "100px"; 
    cvs.style.left = "300px"; 
    cvs.style.position = "absolute"; 
	cvs.style.border = "solid 1px #000000";

}

var engage=function(e){
	dragging = true;
	putPoint(e);
}
var disengage=function(){
	dragging = false;
	ctx.beginPath();
}
setCanvasPosition();
cvs.addEventListener('mousedown',engage);
cvs.addEventListener('mousemove', putPoint);
cvs.addEventListener('mouseup',disengage);