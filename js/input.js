var input = new function() {
	this.mouseX = 0;
	this.mouseY = 0;

	this.onmousemove = function(e) {
		input.mouseX = e.pageX - canvas.width/2;
		input.mouseY = e.pageY - canvas.height/2;
	};

	this.onmousedown = function(e) {
		if (core.game_state == 1 || core.game_state == 0) {
			core.onmousedown(e)
		} else {
			building.onmousedown(e, core.get_map());
		}
	};

	this.onwheel = function(e) {
		building.onwheel(e);
	};

	this.onkeydown = function(e) {
		core.onkeydown(e);
	};
}();

window.onmousemove = input.onmousemove;
window.onmousedown = input.onmousedown;
window.onwheel = input.onwheel;
window.onkeydown = input.onkeydown;

var utils = new function() {
	this.distance = function (a, b, c, d) {
		return(Math.pow(Math.pow(a-c, 2) + Math.pow(b-d, 2), 0.5));
	};
	
	this.is_inside = function(x, y, a, b, c, d) {
		if(x > a &&
		   y > b &&
		   x < a+c &&
		   y < b+d) {
			return true;
		} else {
			return false;
		}
	};
}
