var utils = new function() {
	this.distance = function (a, b, c, d) {
		return(Math.pow(Math.pow(a-c, 2) + Math.pow(b-d, 2), 0.5));
	}
}

var my_tileset = new tileset();

my_tileset.register_tile(new tile(
	"textures/tiles/air.png",
	null,
	[false, true, false]
));

my_tileset.register_tile(new tile(
	"textures/tiles/floor.png"
));

my_tileset.register_tile(new tile(
	"textures/tiles/floor_spawner.png",
	function(m,x,y) {
		this.timer += time.dtime;
		if(this.timer > 1000) {
			m.spawn_entity(x,y, 0);
			this.timer = 0;
		}
	},
	[true, false, false]
));

my_tileset.register_tile(new tile(
	"textures/tiles/floor_server.png"
));

building.register_entity(0);

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

var entity_start = function(m) {
	this.i = 0;
	this.destination = m.get_pos(m.path[0][0], m.path[0][1]);
};

var entity_update = function(m) {
	if(utils.distance(this.x, this.y, this.destination[0], this.destination[1]) < 4) {
		this.i++;
		if(this.i < m.path.length) {
			if(m.path[this.i][0] > m.path[this.i-1][0]) {
				this.rotation = 1;
			} else if(m.path[this.i][0] < m.path[this.i-1][0]) {
				this.rotation = 3;
			} else if(m.path[this.i][1] > m.path[this.i-1][1]) {
				this.rotation = 0;
			} else if(m.path[this.i][1] < m.path[this.i-1][1]) {
				this.rotation = 2;
			}

			this.destination = m.get_pos(m.path[this.i][0], m.path[this.i][1]);
		} else {
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
};

entities.register_entity(new entities.entity_blueprint(
	"textures/entities/test",
	1,
	0,
	entity_start,
	entity_update
));

loaded_map = my_map;
