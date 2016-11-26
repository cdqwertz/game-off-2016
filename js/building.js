var building = new function() {
	this.entities = [];
	this.events = [];
	this.selected = 0;

	this.register_entity = function(e, c) {
		this.entities.push([e, c, 0]);
	};

	this.register_event = function(entity, count, event) {
		this.events.push([entity, count, event])
	};

	this.update = function(m) {
		
	};

	this.draw = function(m) {
		{
			var img = entities.registered_entities[this.entities[this.selected][0]].img[0];
			if(core.coins > this.entities[this.selected][1] - 1) {
				ctx.drawImage(img, input.mouseX + 5, input.mouseY + 10, m.w/2, m.h/2);
			} else {
				ctx.drawImage(img, input.mouseX + 5, input.mouseY + 10, m.w/3, m.h/3);
			}
		}
		
		ctx.fillStyle = "#404040";
		ctx.fillRect(-(canvas.width/2), -(canvas.height/2), m.w/2 + 20, canvas.height);

		for(var i = 0; i < this.entities.length; i++) {
			var img = entities.registered_entities[this.entities[i][0]].img[0];
			if(i == this.selected) {
				ctx.strokeStyle = "#f0f0f0";
				ctx.strokeRect(-(canvas.width/2) + 10, -(canvas.height/2) + i*(m.h/2 + 5) + 10, m.w/2, m.h/2);

				ctx.fillStyle = "#dadada";
				ctx.fillRect(-(canvas.width/2) + 10, -(canvas.height/2) + i*(m.h/2 + 5) + 10, m.w/2, m.h/2);
			}

	
			if(core.coins > this.entities[i][1] - 1) {
				ctx.fillStyle = "#99cc99";
				ctx.fillRect(-(canvas.width/2), -(canvas.height/2) + i*(m.h/2 + 5), 3, m.h/2 + 10);
			}

			ctx.drawImage(img, -(canvas.width/2) + 10, -(canvas.height/2) + i*(m.h/2 + 5) + 10, m.w/2, m.h/2);
		}
		
		ctx.fillStyle = "#a04040";
		ctx.fillRect(-(canvas.width/2), (canvas.height/2)-(core.health*25), (m.w/2 + 20)/2, core.health*25);
		ctx.fillStyle = "#40a040";
		ctx.fillRect(-(canvas.width/2) + (m.w/2 + 20)/2, (canvas.height/2)-((core.timer)/(core.timer_max) * 25 * 6), (m.w/2 + 20)/2, (core.timer)/(core.timer_max) * 25 * 6);
	};

	this.onmousedown = function(e, m) {
		if(utils.is_inside(input.mouseX, input.mouseY, -(canvas.width/2), -(canvas.height/2), m.w/2 + 20, canvas.height)) {
			for(var i = 0; i < this.entities.length; i++) {
				if(utils.is_inside(input.mouseX, input.mouseY, -(canvas.width/2) + 10, -(canvas.height/2) + i*(m.h/2 + 5) + 10, m.w/2, m.h/2)) {
					this.selected = i;
				}
			}
		} else {
			if(core.coins > this.entities[this.selected][1] - 1) {
				var p = m.convert_pos(input.mouseX - m.w/2, input.mouseY - m.h/2);
				if(m.tileset.tiles[m.map[p[1]][p[0]]].allow_build[entities.registered_entities[this.entities[this.selected][0]].type] == true &&
				   m.get_entities_near_tile(p[0], p[1], 32).length == 0) {
					m.spawn_entity(p[0], p[1], this.entities[this.selected][0]);
					core.coins -= this.entities[this.selected][1];
					this.entities[this.selected][2]++;

					for(var i = 0; i < this.events.length; i++) {
						if(this.events[i][0] == this.selected &&
						   this.events[i][1] == this.entities[this.selected][2]) {
							this.events[i][2](m);
						}
					}
				}
			}
		}
	};

	this.onwheel = function(e) {
		if(e.deltaY > 0) {
			dir = 1;
		} else {
			dir = -1;
		}

		this.selected += dir;

		if(this.selected < 0) {
			this.selected = 0;
		}

		if(this.selected > this.entities.length-2) {
			this.selected = this.entities.length-1;
		}
	};

	this.change_selected = function(x) {
		this.selected += x;

		if(this.selected < 0) {
			this.selected = 0;
		}

		if(this.selected > this.entities.length-2) {
			this.selected = this.entities.length-1;
		}
	};

	this.reset = function() {
		for(var i = 0; i < this.entities.length; i++) {
			this.entities[i][2] = 0;
		}
	};
}();
