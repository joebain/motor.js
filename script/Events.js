define("Events", ["util"], function(util) {
	var Events = function() {
		this.listeners = {};
	};

	Events.prototype.on = function(eventName, func, context) {
		if (!this.listeners[eventName]) {
			this.listeners[eventName] = [];
		}
		this.listeners[eventName].push({func:func, context:context});
	};

	Events.prototype.off = function(eventName, func) {
		for (var l in this.listeners[eventName]) {
			if (func === undefined || this.listeners[eventName][l].func === func) {
				delete this.listeners[eventName][l];
			}
		}
	};

	Events.prototype.trigger = function(eventName, args) {
		if (arguments.length > 2 || !util.isArray(args)) {
			args = Array.prototype.splice.call(arguments, 1, arguments.length-1);
		}
		for (var l in this.listeners[eventName]) {
			this.listeners[eventName][l].func.apply(this.listeners[eventName][l].context, args);
		}
	};

	return Events;
});
