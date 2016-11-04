function map(data, t) {
	this.map = data;
	this.tileset = t;

	function update() {
	}

	function draw() {
		for(var i = 0; i < this.map.length; i++) {
			for(var j = 0; j < this.map.length; j++) {
				this.tileset.draw_tile();
			}
		}
	}
}
