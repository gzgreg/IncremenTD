'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Bullet = require('./Bullet.js');

var _initDelay = 1000;
var _initDmg = 1;
var _initSpd = 50;
var _initRange = 96;

var Tower = (function (_Phaser$Sprite) {
	_inherits(Tower, _Phaser$Sprite);

	function Tower(game, towers, mapData, x, y) {
		_classCallCheck(this, Tower);

		_get(Object.getPrototypeOf(Tower.prototype), 'constructor', this).call(this, game, x, y, 'tower');
		this.delay = _initDelay;
		this.nextFireTime = game.time.now + _initDelay;
		this.dmg = _initDmg;
		this.spd = _initSpd;
		this.range = _initRange;
		towers.add(this);
	}

	_createClass(Tower, [{
		key: 'fire',
		value: function fire(creeps, bullets, pathData) {
			if (this.game.time.now < this.nextFireTime) return;
			this.nextFireTime = this.game.time.now + this.delay;
			var target;
			creeps.forEachAlive((function (creep) {
				if (this.game.physics.arcade.distanceBetween(this, creep) < this.range) {
					if (!target || creep.getDistance(pathData) < target.getDistance(pathData)) target = creep;
				}
			}).bind(this));
			if (target) new Bullet(this.game, bullets, this.x, this.y, target, this.dmg, this.spd);
		}
	}, {
		key: 'serialize',
		value: function serialize() {
			var fields = ['delay', 'dmg', 'spd', 'range'];
			var toSerialize = {};
			for (var field in fields) {
				toSerialize[field] = this[field];
			}
			return toSerialize;
		}
	}]);

	return Tower;
})(Phaser.Sprite);

module.exports = Tower;