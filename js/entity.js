var entities = new function() {
	this.registered_entities = [];

	this.register_entity = function(blueprint) {
		this.registered_entities.push(blueprint);
	};

	this.get_blueprint = function(type) {
		return (this.registered_entities[type]);
	}

	//classes
	this.entity_blueprint = function (texture, hp, type, start, behaviour) {
		this.img = [];
		this.img.push(new Image());
		this.img[0].src = texture + ".png";

		this.hp = hp;
		this.type = type;
		this.start = start;
		this.behaviour = behaviour;
	}

	this.entity = function (x, y, type) {
		this.x = x;
		this.y = y;
		this.type = type;
		this.img = entities.get_blueprint(type).img;
		this.hp = entities.get_blueprint(type).hp;
		this.img_id = 0;
		this.timer = 0;
		this.r = 0;
		this.rotation = 0;

		this.start = entities.get_blueprint(type).start;
		this.update = entities.get_blueprint(type).behaviour;

		this.draw = function() {
			var w = this.img[this.img_id].width;
			var h = this.img[this.img_id].height;

			ctx.translate(this.x + w/2, this.y-2*4 + h/2);
			ctx.rotate(this.rotation);
			ctx.drawImage(this.img[this.img_id], -w/2, -h/2);
			ctx.rotate(-this.rotation);
			ctx.translate(-(this.x + w/2), -(this.y-2*4 + h/2));
		}
	}

	//
	this.types = new function() {
		this.enemy = 0;
		this.defense = 1;
		this.barrier = 2;
		this.trap = 3;
	}();
}();
