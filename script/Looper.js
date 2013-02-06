define("Looper", ["util", "log", "Drawable", "Updateable"],
	     function( util ,  log ,  Drawable ,  Updateable )
{
	var Looper = function() {

		var requestAnimationFrame =
			window.requestAnimationFrame || window.mozRequestAnimationFrame ||  
			window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

		this.updateables = [];
		this.drawables = [];

		this.firstTime;
		this.lastTime;
		this.thisTime;
		
		var delta, interval;

		this.frameRate;
		this.targetInterval;
		this.canvas;
		this.context;

		this.lastScheduledTime;

		var that = this;

		var i;

		var loopWork = this._loopWork = function(scheduledTime) {
			if (that.thisTime === undefined) {
				if (scheduledTime !== undefined) {
					that.firstTime = scheduledTime;
					that.thisTime = that.firstTime - that.targetInterval;
				} else if (requestAnimationFrame && that.canvas) {
					requestAnimationFrame(loopWork, that.canvas);
					return;
				}
			}

			that.lastScheduledTime = scheduledTime || that.getTime();

			that.lastTime = that.thisTime;
			that.thisTime = that.getTime();

			delta = that.thisTime-that.lastTime;

			for (i = 0 ; i < that.updateables.length ; i++) {
				that.updateables[i].update(delta, that.thisTime - that.firstTime);
			}

			that.context.clearRect(0,0,that.canvas.width, that.canvas.height);
			for (i = 0 ; i < that.drawables.length ; i++) {
				that.drawables[i].draw(that.context, that.canvas.width, that.canvas.height);
			}

			if (requestAnimationFrame && that.canvas) {
				requestAnimationFrame(loopWork, that.canvas);
			} else {
				interval = that.targetInterval - delta;
				interval = interval < 1 ? 1 : interval;
				setTimeout(loopWork, interval);
			}
		};
	};

	Looper.prototype.loop = function(frameRate, canvas) {
		if (this.frameRate || this.canvas) return; // only one loop

		this.frameRate = frameRate;
		this.targetInterval = 1000 / frameRate;

		this.canvas = canvas;
		this.context = canvas.getContext("2d");

		this._loopWork();
	};

	Looper.prototype.getTime = function() {
		if (this.lastScheduledTime) {
			return this.lastScheduledTime;
		} else {
			return new Date().getTime();
		}
	};

	Looper.prototype.add = function(thing) {
		if (util.isLike(thing, Drawable)) {
			this.drawables.push(thing);
		}
		if (util.isLike(thing, Updateable)) {
			this.updateables.push(thing);
		}
	};

	return Looper;
});
