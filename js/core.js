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

var core = new function() {
	this.registered_maps = [];
	this.loaded_map = -1;
	this.game_state = 0;
	this.health = 6;

	this.img_start_game = new Image();
	this.img_start_game.src = "textures/menu/start_game.png";

	this.register_map = function(m) {
		this.registered_maps.push(m);
	};

	this.get_map = function() {
		return this.registered_maps[this.loaded_map];
	};

	this.load = function () {
		canvas = document.getElementById("canvas");
		ctx = canvas.getContext("2d");

		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;

		ctx.translate(window.innerWidth/2, window.innerHeight/2);

		window.requestAnimationFrame(core.update);
	};

	this.update = function (t) {
		time.update(t);

		if(core.game_state == 0) {
			ctx.clearRect(-canvas.width/2, -canvas.height/2, canvas.width, canvas.height);
			ctx.drawImage(core.img_start_game, -core.img_start_game.width/2, -core.img_start_game.height/2);
		} else if(core.game_state == 1) {
			ctx.clearRect(-canvas.width/2, -canvas.height/2, canvas.width, canvas.height);
		} else if(core.game_state == 2) {
			if(core.loaded_map != -1) {
				core.registered_maps[core.loaded_map].update();
				building.update(core.registered_maps[core.loaded_map]);
				ctx.clearRect(-canvas.width/2, -canvas.height/2, canvas.width, canvas.height);
				core.registered_maps[core.loaded_map].draw();
				building.draw(core.registered_maps[core.loaded_map]);

				if(this.health == 0 || this.health < 0) {
					this.health = 6;
					this.loaded_map = 0;
					this.game_state = 1;
				}
			} else {
				game_state = 1;
			}
		}

		window.requestAnimationFrame(core.update);
	}
}();
