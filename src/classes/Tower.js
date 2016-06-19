var Bullet = require('./Bullet.js');

var _initDelay = 1000;
var _initDmg = 1;
var _initSpd = 50;
var _initRange = 96;

class Tower extends Phaser.Sprite {
	
	constructor(game, towers, mapData, x, y){
		super(game, x, y, 'tower');
		this.delay = _initDelay;
		this.nextFireTime =  game.time.now + _initDelay;
		this.dmg = _initDmg;
		this.spd = _initSpd;
		this.range = _initRange;
		towers.add(this);
	}

	fire(creeps, bullets, pathData){
		if(this.game.time.now < this.nextFireTime) return;
		this.nextFireTime = this.game.time.now + this.delay;
		var target;
		creeps.forEachAlive((function(creep){
			if(this.game.physics.arcade.distanceBetween(this, creep) < this.range){
				if(!target || creep.getDistance(pathData) < target.getDistance(pathData)) target = creep;
			}
		}).bind(this));
		if(target) new Bullet(this.game, bullets, this.x, this.y, target, this.dmg, this.spd);
	}

	serialize(){
		var fields = [
			'delay',
			'dmg',
			'spd',
			'range'
		];
		var toSerialize = {};
		for(var field in fields){
			toSerialize[field] = this[field];
		}
		return toSerialize;
	}

}

module.exports = Tower;