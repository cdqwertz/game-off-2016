var my_tileset = new tileset();
var level = 1;
//my_tileset.register_tile(new tile(
//	texture : string,
//	update : function(map),
//	allow_place : Array
//));

my_tileset.register_tile(new tile(
	"textures/tiles/air.png",
	null,
	[false, true, false, false]
));

my_tileset.register_tile(new tile(
	"textures/tiles/floor.png"
));

my_tileset.register_tile(new tile(
	"textures/tiles/floor_spawner.png",
	function(m,x,y) {
		this.timer += time.dtime;
		if(this.timer > 1000) {
			if(level == 1) {
				if(Math.random() > 0.9) {
					m.spawn_entity(x,y, 1);
				} else {
					m.spawn_entity(x,y, 0);
				}
			} else if(level == 2) {
				m.spawn_entity(x,y, 1);
			} else if(level == 3) {
				m.spawn_entity(x,y, 2);
			} else if(level == 4) {
				m.spawn_entity(x,y, 3);
			} else if(level == 5) {
				m.spawn_entity(x,y, 4);
			} else if(level == 6) {
				m.spawn_entity(x,y, 5);
			} else {
				m.spawn_entity(x,y, 3);
			}
			this.timer = 0;
		}
	},
	[true, false, false, false]
));

my_tileset.register_tile(new tile(
	"textures/tiles/floor_server.png"
));

//new map() (
//	data : Array,
//	path : Array,
//	tileset : tileset,
//	x : int, y : int,
//	w : int, h : int
//);

var my_map = new map([
	[2, 1, 1, 1, 1, 1, 1, 1],
	[0, 0, 0, 0, 0, 0, 0, 1],
	[1, 1, 1, 1, 1, 1, 1, 1],
	[1, 0, 0, 0, 0, 0, 0, 0],
	[1, 1, 1, 1, 1, 1, 1, 1],
	[0, 0, 0, 0, 0, 0, 0, 1],
	[1, 1, 1, 1, 1, 1, 1, 1],
	[1, 0, 0, 0, 0, 0, 0, 0],
	[1, 1, 1, 1, 1, 1, 1, 3],
], [
	[0,0],
	[7,0],
	[7,2],
	[0,2],
	[0,4],
	[7,4],
	[7,6],
	[0,6],
	[0,8],
	[7,8]
], my_tileset, 64, 12*4, 64, 64);

var enemy_start = function(m) {
	this.i = 0;
	for(var i = 0; i < m.path.length; i++) {
		var a = m.get_pos(m.path[i][0], m.path[i][1]);
		var b = m.get_pos(m.path[this.i][0], m.path[this.i][1]);
		if(utils.distance(this.x, this.y, a[0], a[1]) <
		   utils.distance(this.x, this.y, b[0], b[1])) {
			this.i = i;
		}
	}
	this.destination = m.get_pos(m.path[this.i][0], m.path[this.i][1]);
};

var enemy_update = function (coins) {
	return (function(m) {
		if(utils.distance(this.x, this.y, this.destination[0], this.destination[1]) < 4) {
			this.i++;
			if(this.i < m.path.length) {
				if(m.path[this.i][0] > m.path[this.i-1][0]) {
					this.rotation = -Math.PI/2; // 1
				} else if(m.path[this.i][0] < m.path[this.i-1][0]) {
					this.rotation = -Math.PI/2 * 3; // 3
				} else if(m.path[this.i][1] > m.path[this.i-1][1]) {
					this.rotation = 0; // 0
				} else if(m.path[this.i][1] < m.path[this.i-1][1]) {
					this.rotation = -Math.PI/2 * 2; // 2
				}

				this.destination = m.get_pos(m.path[this.i][0], m.path[this.i][1]);
			} else {
				core.health--;
				m.remove_entity(this);
			}
			this.timer = 0;
		}

		{
			var a = this.destination[0]-this.x;
			var b = this.destination[1]-this.y;

			var c = utils.distance(0,0,a,b);
		
			if((a != 0 || b != 0) && c != 0) {
				this.x += (a/c)/10.0 * time.dtime;
				this.y += (b/c)/10.0 * time.dtime;
			}
		}

		{
			if(this.hp < 0 || this.hp == 0) {
				core.coins += coins;
				console.log(core.coins);
				m.remove_entity(this);
			}
		}
	});
};

//entities.register_entity(new entities.entity_blueprint(
//	texture : string,
//	hp : int,
//	type : int,
//	start : function(map)
//	update : function(map)
//));

entities.register_entity(new entities.entity_blueprint(
	"textures/entities/test",
	2,
	0,
	enemy_start,
	enemy_update(20)
));

entities.register_entity(new entities.entity_blueprint(
	"textures/entities/virus_2",
	4,
	0,
	enemy_start,
	enemy_update(30)
));

entities.register_entity(new entities.entity_blueprint(
	"textures/entities/virus_3",
	8,
	0,
	enemy_start,
	enemy_update(45)
));

entities.register_entity(new entities.entity_blueprint(
	"textures/entities/virus_4",
	16,
	0,
	enemy_start,
	enemy_update(55)
));

entities.register_entity(new entities.entity_blueprint(
	"textures/entities/virus_5",
	34,
	0,
	enemy_start,
	enemy_update(70)
));

entities.register_entity(new entities.entity_blueprint(
	"textures/entities/virus_6",
	48,
	0,
	enemy_start,
	enemy_update(80)
));

entities.register_entity(new entities.entity_blueprint(
	"textures/entities/trap",
	1,
	3,
	function(m) {
	},
	function(m) {
		this.timer += time.dtime;
		if(this.timer > 100) {
			var e = m.get_enemies_near(this.x, this.y, 32);
			if(e.length) {
				for(var i = 0; i < e.length; i++) {
					e[i].hp -= 1;
				}
				m.remove_entity(this);
			}
			this.timer = 0;
		}
	}
));

entities.register_entity(new entities.entity_blueprint(
	"textures/entities/virus_defence_1",
	1,
	1,
	function(m) {
	},
	function(m) {
		this.timer += time.dtime;
		if(this.timer > 500) {
			var e = m.get_enemies_near(this.x, this.y, 64);
			if(e.length) {
				var a = 0;
				for(var i = 0; i < e.length; i++) {
					if(e[i].hp < e[a].hp) {
						a = i;
					}
				}

				var dy = (e[a].y - this.y);
				var dx = (e[a].x - this.x);
				this.rotation = Math.atan(dy / dx) - Math.PI/2;
				if(e[a].x > this.x) {
					this.rotation += Math.PI;
				}
				e[a].hp -= 1;
			}
			this.timer = 0;
		}
	}
));

entities.register_entity(new entities.entity_blueprint(
	"textures/entities/virus_defence_2",
	1,
	1,
	function(m) {
	},
	function(m) {
		this.timer += time.dtime;
		if(this.timer > 500) {
			var e = m.get_enemies_near(this.x, this.y, 64+16);
			if(e.length) {
				var a = 0;
				for(var i = 0; i < e.length; i++) {
					if(e[i].hp < e[a].hp) {
						a = i;
					}
				}

				var dy = (e[a].y - this.y);
				var dx = (e[a].x - this.x);
				this.rotation = Math.atan(dy / dx) - Math.PI/2;
				if(e[a].x > this.x) {
					this.rotation += Math.PI;
				}
				e[a].hp -= 2;
			}
			this.timer = 0;
		}
	}
));

entities.register_entity(new entities.entity_blueprint(
	"textures/entities/scanner",
	40,
	3,
	function(m) {
	},
	function(m) {
		this.timer += time.dtime;

		if(this.timer > 100) {
			var e = m.get_enemies_near(this.x, this.y, 32);
			if(e.length) {
				for(var i = 0; i < e.length; i++) {
					e[i].x = m.get_pos(m.path[e[i].i-1][0], m.path[e[i].i-1][1])[0];
					e[i].y = m.get_pos(m.path[e[i].i-1][0], m.path[e[i].i-1][1])[1];
					this.hp--;
				}
				if(this.hp < 0 || this.hp == 0) {
					m.remove_entity(this);
				}
			}
			this.timer = 0;
		}
	}
));

//building.register_entity(id : int, cost : int)
var enemy_count = 6;

building.register_entity(0+enemy_count, 100);
building.register_entity(1+enemy_count, 400);
building.register_entity(2+enemy_count, 1000);
building.register_entity(3+enemy_count, 1500);

building.register_event(1, 2, function(m) {
	if(level < 2) {
		level = 2;
	}
})

building.register_event(2, 1, function(m) {
	if(level < 3) {
		level = 3;
	}
})

building.register_event(2, 2, function(m) {
	if(level < 4) {
		level = 4;
	}
})

building.register_event(2, 4, function(m) {
	if(level < 5) {
		level = 5;
	}
})

building.register_event(3, 1, function(m) {
	if(level < 6) {
		level = 6;
	}
})

core.reset = function() {
	level = 1;
};

//core.register_map(map : map);
core.register_map(my_map);
core.loaded_map = 0;
