define("log", [], function() {
	var log = {};

	var V = 3;
	var I = 2;
	var W = 1;
	var E = 0;
	var S = -1;

	log.level = I;

	log.v = function(message) {
		log.log(V,message);
	};

	log.i = function(message) {
		log.log(I,message);
	};

	log.w = function(message) {
		log.log(W,message);
	};

	log.e = function(message) {
		log.log(E,message);
	};

	log.log = function(level, message) {
		if (log.level >= level) {
			console.log(message);
		}
	};

	return log;
});
