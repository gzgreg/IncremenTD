'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Phaser = require('../../node_modules/phaser/dist/phaser.js');
var game = require('../gameCreate.js');
var C = require("../data/constants.js");

var MainState = (function (_Phaser$State) {
	_inherits(MainState, _Phaser$State);

	function MainState() {
		_classCallCheck(this, MainState);

		_get(Object.getPrototypeOf(MainState.prototype), 'constructor', this).call(this);
	}

	_createClass(MainState, [{
		key: 'preload',
		value: function preload() {
			game.load.image('tower', 'assets/tower.png');
			game.load.image('creep', 'assets/creep.png');
			game.load.image('bullet', 'assets/bullet.png');

			game.load.tilemap('map', "assets/map.json", null, Phaser.Tilemap.TILED_JSON);
			game.load.image('tiles', 'assets/tileset.jpg');
		}
	}, {
		key: 'create',
		value: function create() {
			game.physics.startSystem(Phaser.Physics.ARCADE);

			var map = game.add.tilemap('map');
			map.addTilesetImage('tileset', 'tiles');
			var layer = map.createLayer('Tile Layer 1');
			game.scale.setGameSize(map.widthInPixels, map.heightInPixels - C.pixelOffset - C.tileSize); //extra shrink for bottom row

			//reposition tilemap
			layer.fixedToCamera = false;
			layer.position.set(0, -C.pixelOffset);

			layer.inputEnabled = true;

			creeps = game.add.group();
			window.creeps = creeps;

			bullets = game.add.group();
		}
	}, {
		key: 'update',
		value: function update() {
			TowerStore.getState().towers.forEach(function (tower) {
				tower.fire(creeps, bullets);
			});
			bullets.forEach(function (bullet) {
				bullet.move(map);
			});
			creeps.forEachAlive(function (creep) {
				creep.move();
				bullets.forEach(function (bullet) {
					if (C.checkOverlap(creep, bullet)) {
						bullet.hit(creep);
					}
				});
			});
		}
	}]);

	return MainState;
})(Phaser.State);