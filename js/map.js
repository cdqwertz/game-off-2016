function map(data, t) {
	this.map = data;
	this.tileset = t;

	function update() {
		
	}

	function draw() {
		for(var i = 0; i < this.map.length; i++) {
			for(var j = 0; j < this.map[i].length; j++) {
				this.tileset.draw_tile(this.map[i][j], i*this.tileset.w, j*this.tileset.h, this.tileset.w, this.tileset.h);
			}
		}
	}
}
