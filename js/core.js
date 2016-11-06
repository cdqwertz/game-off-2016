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

var loaded_map = null;

function load() {
	canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");

	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	ctx.translate(window.innerWidth/2, window.innerHeight/2);

	window.requestAnimationFrame(update);
}

function update(t) {
	time.update(t);

	if(loaded_map) {
		loaded_map.update();
		building.update(loaded_map);
		ctx.clearRect(-canvas.width/2, -canvas.height/2, canvas.width, canvas.height);
		loaded_map.draw();
		building.draw(loaded_map);
	}

	window.requestAnimationFrame(update);
}
