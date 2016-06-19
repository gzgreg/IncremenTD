var C = require('../data/constants.js');

var _initSpd = 32;

class Creep extends Phaser.Sprite {
	
	constructor(game, creeps, x, y, health){
		super(game, x, y, 'creep');
		this.spd = _initSpd;
		this.health = health;
		this.maxHealth = health;

		creeps.add(this);
	}

	move(pathData){
		var dist = this.spd * this.game.time.elapsed / 1000;
		var tilex = Math.floor(this.x / C.tileSize + 0.5);
		var tiley = Math.floor(this.y / C.tileSize + 0.5) + C.tileOffset;
		if(tiley == pathData[0].length - 1) this.kill(); //reached bottom
		var target = pathData[tilex][tiley].parent;
		var dx = (target.x + 0.5)*C.tileSize - this.x - this.width/2;
		var dy = (target.y + 0.5 - C.tileOffset)*C.tileSize - this.y - this.width/2;
		var normalize = Math.sqrt(dx*dx + dy*dy);
		this.x += dist*dx/normalize;
		this.y += dist*dy/normalize;
	}

	getDistance(pathData){
		var tilex = Math.floor(this.x / C.tileSize + 0.5);
		var tiley = Math.floor(this.y / C.tileSize + 0.5) + C.tileOffset;
		return pathData[tilex][tiley].dist;
	}
}

module.exports = window.Creep = Creep;