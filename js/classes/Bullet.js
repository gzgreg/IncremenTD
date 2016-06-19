'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var C = require('../data/constants.js');

var Bullet = (function (_Phaser$Sprite) {
	_inherits(Bullet, _Phaser$Sprite);

	function Bullet(game, bullets, x, y, target, dmg, spd) {
		_classCallCheck(this, Bullet);

		_get(Object.getPrototypeOf(Bullet.prototype), 'constructor', this).call(this, game, x, y, 'bullet');
		this.target = target;

		this.dir = { x: target.x - this.x, y: target.y - this.y };
		var normalize = Math.sqrt(this.dir.x * this.dir.x + this.dir.y * this.dir.y);
		this.dir.x /= normalize;this.dir.y /= normalize;

		this.dmg = dmg;
		this.spd = spd;
		bullets.add(this);
	}

	_createClass(Bullet, [{
		key: 'move',
		value: function move(map) {
			var dist = this.spd * this.game.time.elapsed / 1000;
			this.x += dist * this.dir.x;
			this.y += dist * this.dir.y;
			if (this.x < 0 || this.x > map.widthInPixels || this.y < -C.pixelOffset || this.y > map.heightInPixels - C.pixelOffset) {
				this.destroy();
			}
		}
	}, {
		key: 'hit',
		value: function hit(creep) {
			creep.damage(this.dmg);
			this.destroy();
		}
	}]);

	return Bullet;
})(Phaser.Sprite);

module.exports = Bullet;