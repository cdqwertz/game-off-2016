var canavs;
var ctx;

var time = new function() {
	this.last_time = 0;
	this.time = 0;
	this.dtime = 0;
	
	this.update = function(time) {
		this.dtime = time - this.last_time;
		this.last_time = time;
	}
}();

function load() {
	canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");

	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	window.requestAnimationFrame(update);
}

function update(t) {
	time.update(t);
	console.log(time.dtime);
	window.requestAnimationFrame(update);
}
