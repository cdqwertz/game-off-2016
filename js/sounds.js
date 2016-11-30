function sound(file) {
	this.path = "sounds/" + file + ".ogg";
	this.audio = new Audio(this.path);
	
	this.play = function() {
		if(!this.audio.ended) {
			this.stop();
		}
		
		this.audio.play();
	}
	
	this.stop = function() {
		this.audio.pause();
		this.audio.currentTime = 0;
	}
}

function sound_manager() {
	this.sounds = [];
	
	this.register_sound = function(s) {
		this.sounds.push(s);
	};
	
	this.play = function(id) {
		this.sounds[id].play();
	};
}
