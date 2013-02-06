define("Game",
	        ["ExampleThing", "Looper", "d", "log"],
	function( ExampleThing ,  Looper ,  d ,  log )
{
	var Game = function() {
		this.frameRate = 60;
	};

	Game.prototype.init = function() {
		log.i("game init");

		this.egs = [];
		for (var i = 0 ; i < 1000 ; i++) {
			this.egs[i] = new ExampleThing;
		}

		this.rootDom = d.g("body");
		this.canvas = d.m("canvas");
		d.a(this.rootDom, this.canvas);
		this.canvas.width = this.rootDom.clientWidth;
		this.canvas.height = this.rootDom.clientHeight;
	};

	Game.prototype.run = function() {
		var that = this;

		this.looper = new Looper;
		this.looper.loop(this.frameRate, this.canvas);

		for (var i in this.egs) {
			this.looper.add(this.egs[i]);
		}
	};

	Game.prototype.update = function(d,t) {
	};

	return Game;
});
