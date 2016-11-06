var building = new function() {
	this.entities = [];
	this.selected = 0;

	this.register_entity = function(e) {
		this.entities.push(e);
	};

	this.update = function(m) {
		
	};

	this.draw = function(m) {
		var img = entities.registered_entities[this.entities[this.selected]].img[0];
		ctx.drawImage(img, input.mouseX + 5, input.mouseY + 10, m.w/2, m.h/2);
	};

	this.onmousedown = function(e, m) {
		var p = m.convert_pos(input.mouseX - m.w/2, input.mouseY - m.h/2);
		if(m.tileset.tiles[m.map[p[1]][p[0]]].allow_build[entities.registered_entities[this.entities[this.selected]].type] == true) {
			m.spawn_entity(p[0], p[1], this.entities[this.selected]);
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
}();
