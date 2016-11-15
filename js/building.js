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
		var img = entities.registered_entities[this.entities[this.selected][0]].img[0];
		ctx.drawImage(img, input.mouseX + 5, input.mouseY + 10, m.w/2, m.h/2);
	};

	this.onmousedown = function(e, m) {
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

	this.reset = function() {
		for(var i = 0; i < this.entities.length; i++) {
			this.entities[this.selected][2] = 0;
		}
	};
}();
