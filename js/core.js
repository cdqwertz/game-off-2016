var canavs;
var ctx;

var time = new function() {
	this.last_time = 0;
	this.time = 0;
	this.dtime = 0;
	this.time_scale = 2;
	
	this.update = function(time) {
		this.dtime = time - this.last_time;
		
		if(this.dtime > 900) {
			console.log(this.dtime);
			this.dtime = 0;
		}
		
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
	this.on_timer = function() {
		if(core.game_state == 2) {
			core.health--;
			core.reset_timer();
		}
	};
	this.infotext = "";

	//Buttons
	this.img_start_game = new Image();
	this.img_start_game.src = "textures/menu/start_game.png";
	
	//Font
	this.font_1 = new font("textures/font/font_1", ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "."]);
	this.font_2 = new font("textures/font/font_2", ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", 
							"P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", ".", "-", "+", "*",
							":", "|", "_", "!", "\"", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0",
							".", " "],
							15, 21);

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
		core.timer -= time.dtime;
		
		if(core.timer < 0) {
			core.on_timer();
		}

		if(core.game_state == 0) {
			//Main Menu
			ctx.clearRect(-canvas.width/2, -canvas.height/2, canvas.width, canvas.height);
			ctx.drawImage(core.img_start_game, -core.img_start_game.width/2, -core.img_start_game.height/2);
		} else if(core.game_state == 1) {
			//Select Level
			ctx.clearRect(-canvas.width/2, -canvas.height/2, canvas.width, canvas.height);
			ctx.fillStyle = "#5c5c5c";
			ctx.fillRect(-110, -15*core.registered_maps.length - 20, 220, core.registered_maps.length*30 + 40);
			
			for(var i = 0; i < core.registered_maps.length; i++) {
				var str = "MAP " + (i+1);
				
				if(i == core.loaded_map) {
					str = "- " + str + " -"
				}
				
				core.font_2.draw(str, -core.font_2.get_width(str)/2, (i)*30 - 15*core.registered_maps.length);
			}
		} else if(core.game_state == 2) {
			//Game
			if(core.loaded_map != -1) {
				core.registered_maps[core.loaded_map].update();
				building.update(core.registered_maps[core.loaded_map]);
				
				ctx.clearRect(-canvas.width/2, -canvas.height/2, canvas.width, canvas.height);
				core.registered_maps[core.loaded_map].draw();
				building.draw(core.registered_maps[core.loaded_map]);
				
				core.font_1.draw("" + core.coins, canvas.width/2 - core.font_1.get_width("" + core.coins) - 10, -canvas.height/2 + 10);
				core.font_2.draw(core.infotext, canvas.width/2 - core.font_2.get_width(core.infotext) - 10, canvas.height/2 - 31);				
				
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
		} else if(core.game_state == 3) {
			ctx.clearRect(-canvas.width/2, -canvas.height/2, canvas.width, canvas.height);
			var str = "DONE!";
			var str2 = "-----"
			core.font_2.draw(str, -core.font_2.get_width(str)/2, 0);
			core.font_2.draw(str2, -core.font_2.get_width(str2)/2, 30);
		}

		window.requestAnimationFrame(core.update);
	};
	
	this.onmousedown = function(e) {
		if(this.game_state == 1) {
			if(utils.is_inside(input.mouseX, input.mouseY, 
					   -110, -15*this.registered_maps.length - 20, 220, 
					   this.registered_maps.length*30 + 40)) {
					   
				for(var i = 0; i < this.registered_maps.length; i++) {
					if(utils.is_inside(input.mouseX, input.mouseY, -110, (i)*30 - 15*this.registered_maps.length, 220, 30)) {
						this.loaded_map = i;
						break;
					}
				}
		
				this.reset();
				building.reset();
				this.reset_timer();
				this.registered_maps[this.loaded_map].reset()
				this.health = 6;
				this.coins = 500;
	
				this.game_state = 2;
			}
		} else if(this.game_state == 0) {
			if(utils.is_inside(input.mouseX, input.mouseY, 
					   -this.img_start_game.width/2, -this.img_start_game.height/2, 
					   this.img_start_game.width, this.img_start_game.height)) {
				
				this.game_state = 1;
			}
		}
	};

	this.onkeydown = function(e) {
		if(this.game_state == 2) {
			if(e.keyCode == 32) {
				if(this.time_state == 1) {
					time.time_scale = 1;
					this.time_state = 0;
				} else if(this.time_state == 0) {
					time.time_scale = 2;
					this.time_state = 1;
				} 
			} else if(e.keyCode == 87 || e.keyCode == 38) {
				building.change_selected(-1);
			} else if(e.keyCode == 83 || e.keyCode == 40) {
				building.change_selected(1);
			} else if(e.keyCode == 27) {
				core.reset();
				building.reset();
				core.reset_timer();
				core.registered_maps[core.loaded_map].reset()
				core.health = 6;
				core.coins = 500;
				
				this.game_state = 1;
			} else {
				console.log(e.keyCode);
			}
		} else if(this.game_state == 1) {
			if(e.keyCode == 32 || e.keyCode == 13) {
				core.reset();
				building.reset();
				core.reset_timer();
				core.registered_maps[core.loaded_map].reset()
				core.health = 6;
				core.coins = 500;
				
				this.game_state = 2;
			} else if(e.keyCode == 87 || e.keyCode == 38) {
				this.loaded_map -= 1;
				
				if(this.loaded_map < 0) {
					this.loaded_map = 0;
				}
				
				if(this.loaded_map > this.registered_maps.length-1) {
					this.loaded_map = this.registered_maps.length-1;
				}
			} else if(e.keyCode == 83 || e.keyCode == 40) {
				this.loaded_map += 1;
				
				if(this.loaded_map < 0) {
					this.loaded_map = 0;
				}
				
				if(this.loaded_map > this.registered_maps.length-1) {
					this.loaded_map = this.registered_maps.length-1;
				}
			} else if(e.keyCode == 27) {
				core.game_state = 0;
			} else {
				console.log(e.keyCode);
			}
		} else if(this.game_state == 3) {
			if(e.keyCode == 32 || e.keyCode == 13) {
				core.reset_timer();
				this.game_state = 1;
			}
		}
	}
}();
