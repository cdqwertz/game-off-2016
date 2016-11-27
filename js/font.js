function font(file, layout, w, h) {
	this.file = file;
	this.img = new Image();
	this.img.src = file + ".png"
	this.layout = layout || [];
	
	this.w = w || 20;
	this.h = h || 28;
	
	this.draw = function(text, x, y) {
		for(var i = 0; i < text.length; i++) {
			var a = this.layout.findIndex(function(e) {
				if(e == text.charAt(i)) {
					return true
				}
			});
			ctx.drawImage(this.img, a * this.w, 0, this.w, this.h, x + i*(this.w + 5), y , this.w, this.h);
		}
	};
	
	this.get_width = function(text) {
		return text.length * (this.w + 5)
	};
}
