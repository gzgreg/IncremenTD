var C = require('../data/constants.js');

class Bullet extends Phaser.Sprite{
	
	constructor(game, bullets, x, y, target, dmg, spd){
		super(game, x, y, 'bullet');
		this.target = target;

		this.dir = {x: target.x - this.x, y: target.y - this.y};
		var normalize = Math.sqrt(this.dir.x*this.dir.x + this.dir.y*this.dir.y);
		this.dir.x /= normalize; this.dir.y /= normalize;

		this.dmg = dmg;
		this.spd = spd;
		bullets.add(this);
	}

	move(map){
		var dist = this.spd * this.game.time.elapsed / 1000;
		this.x += dist * this.dir.x;
		this.y += dist * this.dir.y;
		if(this.x < 0 || this.x > map.widthInPixels || 
			this.y < -C.pixelOffset || this.y > map.heightInPixels - C.pixelOffset){
			this.destroy();
		}
	}

	hit(creep){
		creep.damage(this.dmg);
		this.destroy();
	}

}

module.exports = Bullet;