function map(data, path, t, x, y, w, h) {
	this.map = data;
	this.path = path;
	this.tileset = t;
	this.entities = [];

	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;

	this.update = function () {
		for(var i = 0; i < this.map.length; i++) {
			for(var j = 0; j < this.map[i].length; j++) {
				this.tileset.update(this.map[i][j], this,j, i);
			}
		}
			
		for(var i = 0; i < this.entities.length; i++) {
			this.entities[i].update(this);
		}
	};

	this.draw = function () {
		var offset_x = (this.map[0].length*this.x+this.w)/2;
		var offset_y = (this.map.length*this.y+this.h)/2;

		for(var i = 0; i < this.map.length; i++) {
			for(var j = 0; j < this.map[i].length; j++) {
				this.tileset.draw(this.map[i][j], j*this.x-offset_x, i*this.y-offset_y, this.w, this.h);
			}
		}

		for(var i = 0; i < this.entities.length; i++) {
			this.entities[i].draw();
		}
	};

	this.get_pos = function(x, y) {
		return ([
			x*this.x-(this.map[0].length*this.x+this.w)/2,
			y*this.y-(this.map.length*this.y+this.h)/2
			]);
	};

	this.convert_pos = function(x, y) {
		return ([
			Math.floor((x+(this.map[0].length*this.x+this.w)/2)/this.x + 0.5),
			Math.floor((y+(this.map.length*this.y+this.h)/2)/this.y + 0.5),
			]);
	};

	this.spawn_entity = function(i, j, type) {
		var pos = this.get_pos(i, j);
		var e = new entities.entity(pos[0], pos[1], type);
		this.entities.push(e);
		e.start(this);
	};

	this.remove_entity = function(e) {
		for(var i = 0; i < this.entities.length; i++) {
			if(this.entities[i] == e) {
				this.entities.splice(i,1);
			}
		}
	}
}
