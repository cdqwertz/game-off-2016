var entities = new function() {
	this.registered_entities = [];

	this.register_entity = function(blueprint) {
		this.registered_entities.push(blueprint);
	};

	this.get_blueprint = function(type) {
		return (this.registered_entities[type]);
	}

	//classes
	this.entity_blueprint = function (texture, hp, type, behaviour) {
		this.img = new Image();
		this.img.src = texture;

		this.hp = hp;
		this.type = type;
		this.behaviour = behaviour;
	}

	this.entity = function (x, y, type) {
		this.x = x;
		this.y = y;
		this.type = type;
		this.img = entities.get_blueprint(type).img;
		this.hp = entities.get_blueprint(type).hp;
		this.update = entities.get_blueprint(type).behaviour;
		
		this.timer = 0;

		this.draw = function() {
			ctx.drawImage(this.img, this.x, this.y);
		}
	}

	//
	this.types = new function() {
		this.enemy = 0;
		this.defense = 1;
		this.barrier = 2;
	}();
}();
