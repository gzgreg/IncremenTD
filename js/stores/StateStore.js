'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var C = require('../data/constants.js');
var Creep = require("../classes/Creep.js");

var _waveSize = 10;

var StateStore = (function () {
	function StateStore(game) {
		_classCallCheck(this, StateStore);

		this.creeps = game.add.group();
		this.level = 1;
		this.game = game;

		this.bindActions(this.alt.getActions('StateActions'));
	}

	_createClass(StateStore, [{
		key: 'resetWave',
		value: function resetWave() {
			this.creeps.removeAll(true); //destroy all creeps
			var newHealth = 2 * Math.pow(this.level, 1.5);
			for (var i = 0; i < _waveSize; i++) {
				var newX = C.rand(8, 10) * C.tileSize;
				var newY = C.rand(-C.tileOffset, -1) * C.tileSize;
				new Creep(this.game, this.creeps, newX, newY, newHealth);
			}
		}
	}, {
		key: 'runWave',
		value: function runWave() {
			this.creeps.forEach(function (creep) {
				creep.x = C.rand(8, 10) * C.tileSize;
				creep.y = C.rand(-C.tileOffset, -1) * C.tileSize;
				creep.revive(Infinity); //heal to max health
			});
		}
	}]);

	return StateStore;
})();

module.exports = StateStore;