'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var C = require('../data/constants.js');

var _initSpd = 32;

var Creep = (function (_Phaser$Sprite) {
	_inherits(Creep, _Phaser$Sprite);

	function Creep(game, creeps, x, y, health) {
		_classCallCheck(this, Creep);

		_get(Object.getPrototypeOf(Creep.prototype), 'constructor', this).call(this, game, x, y, 'creep');
		this.spd = _initSpd;
		this.health = health;
		this.maxHealth = health;

		creeps.add(this);
	}

	_createClass(Creep, [{
		key: 'move',
		value: function move(pathData) {
			var dist = this.spd * this.game.time.elapsed / 1000;
			var tilex = Math.floor(this.x / C.tileSize + 0.5);
			var tiley = Math.floor(this.y / C.tileSize + 0.5) + C.tileOffset;
			if (tiley == pathData[0].length - 1) this.kill(); //reached bottom
			var target = pathData[tilex][tiley].parent;
			var dx = (target.x + 0.5) * C.tileSize - this.x - this.width / 2;
			var dy = (target.y + 0.5 - C.tileOffset) * C.tileSize - this.y - this.width / 2;
			var normalize = Math.sqrt(dx * dx + dy * dy);
			this.x += dist * dx / normalize;
			this.y += dist * dy / normalize;
		}
	}, {
		key: 'getDistance',
		value: function getDistance(pathData) {
			var tilex = Math.floor(this.x / C.tileSize + 0.5);
			var tiley = Math.floor(this.y / C.tileSize + 0.5) + C.tileOffset;
			return pathData[tilex][tiley].dist;
		}
	}]);

	return Creep;
})(Phaser.Sprite);

module.exports = window.Creep = Creep;