function tileset() {
	this.tiles = [];

	this.register_tile = function(tile) {
		this.tiles.push(tile)
	};

	this.update = function(id, m, x, y) {
		this.tiles[id].update(m, x, y);
	};

	this.draw = function(id, x, y, w, h) {
		this.tiles[id].draw(x, y, w, h);
	};
}

function tile(img, behaviour, allow_build) {
	this.img = new Image();
	this.img.src = img;

	this.update = behaviour || function(m, x, y) {};
	this.allow_build = allow_build || [true, false, true, true];

	this.timer = 0;

	this.draw = function(pos_x, pos_y, tile_w, tile_h) {
		ctx.drawImage(this.img,pos_x, pos_y, tile_w, tile_h);
	}
}
