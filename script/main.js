require.config({
	baseUrl: "script"
});
require(["Game", "util"], function(Game, util) {
	var game = new Game;
	game.init();
	game.run();
});
