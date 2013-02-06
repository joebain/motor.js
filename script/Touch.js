define("Touch", ["log"], function(log) {
	var Touch = function(el, lel, rel) {
		this.el = el;
		this.lel = lel;
		this.rel = rel;

		this.id = -1;
		this.x = 0;
		this.y = 0;
		this.oldx = 0;
		this.oldy = 0;
		this.vx = 0;
		this.vy = 0;
		this.startX = undefined;
		this.startY = undefined;
		this.elStartX = undefined;
		this.elStartY = undefined;
		this.lelStartX = undefined;
		this.lelStartY = undefined;
		this.relStartX = undefined;
		this.relStartY = undefined;

		this.on = false;
	};

	Touch.prototype.touch_start = function(touch) {
		this.on = true;
		this.id = touch.identifier;
		this.x = touch.clientX;
		this.y = touch.clientY;
		this.startX = this.x;
		this.startY = this.y;
		this.elStartX = this.el.offsetLeft;
		this.elStartY = this.el.offsetTop;
		if (this.rel && this.lel) {
			this.relStartX = this.rel.offsetLeft;
			this.relStartY = this.rel.offsetTop;
			this.lelStartX = this.lel.offsetLeft;
			this.lelStartY = this.lel.offsetTop;
		}
		log.v("touch start x,y : " + this.startX + "," + this.startY);
		log.v("touch elStart x,y : " + this.elStartX + "," + this.elStartY);
	};

	Touch.prototype.touch_update = function(touch, d) {
		this.move(touch.clientX, touch.clientY, d);
	};

	Touch.prototype.move = function(x,y,d) {
		this.on = true;

		this.oldx = this.x;
		this.oldy = this.y;

		this.x = x;
		this.y = y;
		
		if (d !== undefined) {
			this.vx = (this.vx - this.oldx) / d;
			this.vy = (this.vy - this.oldy) / d;
		}
	};

	Touch.prototype.end = function() {
		this.on = false;
		this.x = 0;
		this.y = 0;
		this.startX = undefined;
		this.startX = undefined;
		this.elStartX = undefined;
		this.elStartY = undefined;
		this.lelStartX = undefined;
		this.lelStartY = undefined;
		this.relStartX = undefined;
		this.relStartY = undefined;
		this.id = -1;
	};

	return Touch;
});
