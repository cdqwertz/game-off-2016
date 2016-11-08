var input = new function() {
	this.mouseX = 0;
	this.mouseY = 0;

	this.onmousemove = function(e) {
		input.mouseX = e.pageX - canvas.width/2;
		input.mouseY = e.pageY - canvas.height/2;
	};

	this.onmousedown = function(e) {
		if(core.game_state == 0) {
			core.game_state = 2;
		} else if (core.game_state == 1) {
			
		} else {
			building.onmousedown(e, core.get_map());
		}
	};

	this.onwheel = function(e) {
		building.onwheel(e);
	};
}();

window.onmousemove = input.onmousemove;
window.onmousedown = input.onmousedown;
window.onwheel = input.onwheel;
