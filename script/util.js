define("util", [], function() {
	var util = {};

	util.isArray = function(thing) {
		return Object.prototype.toString.call(thing) === "[object Array]";
	};

	util.cloneType = function(parent) {
		var clone = parent.prototype.constructor;
		for (var p in parent.prototype) {
			clone.prototype[p] = parent.prototype[p];
		}
		return clone;
	};

	util.mixin = function(parent, child, override) {
		for (var p in parent.prototype) {
			if (!child.prototype[p] || override) {
				child.prototype[p] = parent.prototype[p];
			}
		}
		var childPrototype = child.prototype;
		var childConstructor = child.prototype.constructor;
		var parentConstructor = parent.prototype.constructor;
		child = function() {
			parentConstructor.apply(this, arguments);
			childConstructor.apply(this, arguments);
		};
		child.prototype = childPrototype;
		child.prototype.constructor = child;
		return child;
	};

	util.isLike = function(instance, idea) {
		for (var p in idea.prototype) {
			if (instance.constructor.prototype[p] === undefined) {
				return false;
			}
		}
		return true;
	};

	util.tidyMobile = function() {
		setTimeout(function() {
		window.scrollTo(0,1);
		}, 500);
	};

	util.printBin = function(i) {
		var out = "";
		while (i) {
			out += i & 1 ? 1 : 0;
			i = i >> 1;
		}
	};

	util.sign = function(x) {
		return x > 0 ? 1 : -1;
	};

	util.cap = function(x, lim) {
		if (Math.abs(x) > lim) {
			return lim * util.sign(x);
		} else {
			return x;
		}
	};

	util.bound = function(x, low, hi) {
		return x < low ? low : x > hi ? hi : x;
	};

	return util;
});
