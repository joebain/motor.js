define("d", [], function() {
	var d = {};

	d.get = d.g = function(selector) {
		var type = selector.charAt(0);
		var name = selector.substr(1,selector.length)
		if (type === "#") {
			return document.getElementById(name);
		}
		else if (type === ".") {
			var els = document.getElementsByClassName(name);
			return els.length > 1 ? els : els[0];
		}
		else {
			var els = document.getElementsByTagName(selector);
			return els.length > 1 ? els : els[0];
		}
	};

	d.make = d.m = function(tag, options) {
		var el = document.createElement(tag);
		if (options) {
			if (options.class) {
				el.setAttribute("class", options.class);
			}
			if (options.id) {
				el.setAttribute("id", options.id);
			}
		}
		return el;
	};

	d.addClass = d.ac = function(el, cla) {
		el.setAttribute("class", el.getAttribute("class") + " " + cla);
	};

	d.append = d.a = function(existingEl, newEl) {
		existingEl.appendChild(newEl);
	};

	d.remove = d.r = function(element) {
		element.parentNode.removeChild(element);
	};

	d.on = function(element, event, func, context) {
		if (context) {
			var f = function() {
				func.apply(context, arguments);
			};
			element.addEventListener(event, f);

			if (element.listeners === undefined) {
				element.listeners = {};
			}
			if (element.listeners[event] === undefined) {
				element.listeners[event] = {};
			}
			element.listeners[event][func] = f;
		} else {
			element.addEventListener(event, func);
		}
	};

	d.off = function(element, event, func) {
		var f = func;
		if (element.listeners && element.listeners[event] && element.listeners[event][func]) {
			f = element.listeners[event][func];
			delete element.listeners[event][func];
		}
		element.removeEventListener(event, f);
	};

	return d;
});
