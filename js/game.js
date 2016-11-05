var my_tileset = new tileset();
my_tileset.register_tile(new tile("textures/tiles/air.png"))
my_tileset.register_tile(new tile("textures/tiles/floor.png"))
my_tileset.register_tile(new tile("textures/tiles/floor_spawner.png"))
my_tileset.register_tile(new tile("textures/tiles/floor_server.png"))

var my_map = new map([
	[2, 1, 1, 1, 1],
	[1, 1, 1, 1, 1],
	[1, 1, 1, 1, 1],
	[1, 1, 1, 1, 1],
	[1, 1, 1, 1, 1],
	[1, 1, 1, 1, 1],
	[1, 3, 1, 1, 1]
], my_tileset, 64, 12*4, 64, 64);

entities.register_entity(new entities.entity_blueprint(
	"textures/entities/test.png",
	10,
	0,
	function(self, m) {
		this.timer += time.dtime;
		if(this.timer > 1000) {
			//self.y += 12*4;
			this.timer = 0;
		}
	}
));

my_map.spawn_enitity(0, 0, 0);

loaded_map = my_map;
