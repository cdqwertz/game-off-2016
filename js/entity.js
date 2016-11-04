var entities = function() {
	this.registered_entities = [];

	this.register_entity = function(blueprint) {
		this.registered_entities.push(blueprint);
	};

	this.get_blueprint = function(type) {
		return (this.registered_entities[type]);
	}

	//classes
	this.entity_blueprint = function (hp, type, behaviour) {
		this.hp = hp;
		this.type = type;
		this.behavior = behaviour;
	}

	this.entity = function (x, y, type) {
		this.x = x;
		this.y = y;
		this.type = type;
		this.hp = entities.get_blueprint(type).hp;
		this.update = entities.get_blueprint(type).behaviour;
	}

	//
	this.types = new function() {
		this.enemy = 0;
		this.defense = 1;
		this.barrier = 2;
	}();
}();
