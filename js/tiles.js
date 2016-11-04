function tileset(src, w, h) {
	this.src = src;
	this.img = new Image();
	this.img.src = this.src;

	this.w = w;
	this.h = h;

	function draw_tile(id, tile_x, tile_y, tile_w, tile_h) {
		ctx.drawImage(this.img, this.w*id, 0, this.w, this.h, tile_x, tile_y, tile_w, tile_h);
	}
}
