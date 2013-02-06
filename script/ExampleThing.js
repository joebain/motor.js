define("ExampleThing", ["util", "Updateable", "Drawable"],
	   		   function( util ,  Updateable ,  Drawable )
{
	var ExampleThing = function() {
		this.x = Math.random();
		this.y = Math.random();

		this.vx = 0;
		this.vy = 0;

		this.acceleration = 0.000001;
		this.maxSpeed = 0.0001;
	};

	ExampleThing = util.mixin(ExampleThing, Updateable);
	ExampleThing = util.mixin(ExampleThing, Drawable);

	ExampleThing.prototype.update = function(d, t) {
		this.vx += (Math.random()-0.5)*d*this.acceleration;
		this.vy += (Math.random()-0.5)*d*this.acceleration;

		this.vx = util.cap(this.vx, this.maxSpeed);
		this.vy = util.cap(this.vy, this.maxSpeed);

		this.x += this.vx*d;
		this.y += this.vy*d;

		if ((this.x > 1 && this.vx > 0)
		 || (this.x < 0 && this.vx < 0)) this.vx *= -1;
		if ((this.y > 1 && this.vy > 0)
		 || (this.y < 0 && this.vy < 0)) this.vy *= -1;

		this.x = util.bound(this.x, 0, 1);
		this.y = util.bound(this.y, 0, 1);
	};

	ExampleThing.prototype.draw = function(c,w,h) {
		c.fillStyle = "#000";
		c.beginPath();
		c.arc(this.x*w, this.y*h, 4, 0, Math.PI*2);
		c.fill();
	};

	return ExampleThing;
});
