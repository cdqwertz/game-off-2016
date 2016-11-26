var canavs;
var ctx;

var time = new function() {
	this.last_time = 0;
	this.time = 0;
	this.dtime = 0;
	this.time_scale = 2;
	
	this.update = function(time) {
		this.dtime = time - this.last_time;
		this.dtime *= this.time_scale;
		this.last_time = time;
	}
}();

var core = new function() {
	this.registered_maps = [];
	this.loaded_map = -1;
	this.game_state = 0;
	this.health = 6;
	this.coins = 500;
	this.reset = function(){};
	this.time_state = 1;
	this.timer = 1000 * 60;
	this.timer_max = 1000 * 60;

	//Buttons
	this.img_start_game = new Image();
	this.img_start_game.src = "textures/menu/start_game.png";

	this.register_map = function(m) {
		this.registered_maps.push(m);
	};

	this.get_map = function() {
		return this.registered_maps[this.loaded_map];
	};
	
	this.reset_timer = function(s) {
		this.timer_max =  1000 * (s || 60);
		this.timer = 1000 * (s || 60);
	};

	this.load = function () {
		canvas = document.getElementById("canvas");
		ctx = canvas.getContext("2d");

		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;

		ctx.translate(window.innerWidth/2, window.innerHeight/2);

		ctx.imageSmoothingEnabled = false;
		ctx.mozImageSmoothingEnabled = false;
		ctx.webkitImageSmoothingEnabled = false;
		ctx.msImageSmoothingEnabled = false;

		window.requestAnimationFrame(core.update);
	};

	this.update = function (t) {
		time.update(t);

		if(core.game_state == 0) {
			//Main Menu
			ctx.clearRect(-canvas.width/2, -canvas.height/2, canvas.width, canvas.height);
			ctx.drawImage(core.img_start_game, -core.img_start_game.width/2, -core.img_start_game.height/2);
		} else if(core.game_state == 1) {
			//Select Level
			ctx.clearRect(-canvas.width/2, -canvas.height/2, canvas.width, canvas.height);
			core.game_state = 0;
		} else if(core.game_state == 2) {
			//Game
			if(core.loaded_map != -1) {
				core.timer -= time.dtime;
				
				core.registered_maps[core.loaded_map].update();
				building.update(core.registered_maps[core.loaded_map]);
				
				if(core.timer < 0) {
					core.health--;
					core.reset_timer();
				}
				
				ctx.clearRect(-canvas.width/2, -canvas.height/2, canvas.width, canvas.height);
				core.registered_maps[core.loaded_map].draw();
				building.draw(core.registered_maps[core.loaded_map]);

				if(core.health == 0 || core.health < 0) {
					core.reset();
					building.reset();
					core.reset_timer();
					core.registered_maps[core.loaded_map].reset()
					core.health = 6;
					core.coins = 500;
					core.loaded_map = 0;
					core.game_state = 1;
				}
			} else {
				core.game_state = 1;
			}
		}

		window.requestAnimationFrame(core.update);
	};

	this.onkeydown = function(e) {
		if(e.keyCode == 32) {
			if(this.time_state == 1) {
				time.time_scale = 1;
				this.time_state = 0;
			} else if(this.time_state == 0) {
				time.time_scale = 2;
				this.time_state = 1;
			} 
		} else if(e.keyCode == 87) {
			building.change_selected(-1);
		} else if(e.keyCode == 83) {
			building.change_selected(1);
		} else {
			console.log(e.keyCode);
		}
	}
}();
