"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var C = require("../data/constants.js");
var MapStore = require("../stores/MapStore.js");
var Tower = require("../classes/Tower.js");

var TowerStore = (function () {
	function TowerStore(game) {
		_classCallCheck(this, TowerStore);

		this.towers = game.add.group();
		this.canBuild = 0;
		this.bindActions(this.alt.getActions('TowerActions'));
		this.game = game;
	}

	_createClass(TowerStore, [{
		key: "buy",
		value: function buy() {
			if (this.canBuild <= 0) return;
			this.game.input.onDown.addOnce(function (pointer) {
				var x = Math.floor(this.game.input.x / C.tileSize);
				var yScreen = Math.floor(this.game.input.y / C.tileSize);
				var y = yScreen + C.tileOffset;
				var MapStoreInstance = this.alt.getStore('MapStore');

				var mapData = MapStoreInstance.getState().mapData;
				var pathData = MapStoreInstance.getState().pathData;

				if (MapStore.isOccupied(mapData, x, y)) return;
				mapData[x][y] = 1;
				MapStore.dijkstra(mapData, pathData);
				for (var i = 0; i < mapData.length; i++) {
					if (mapData[i][0] == 2 && pathData[i][0].dist == Infinity) {
						//no possible path: don't build tower
						mapData[x][y] = 2;
						MapStore.dijkstra(mapData, pathData);
						return;
					}
				}
				new Tower(this.game, this.towers, mapData, x * C.tileSize, yScreen * C.tileSize);
				this.canBuild--;
				this.emitChange();
			}, this);
		}
	}, {
		key: "add",
		value: function add() {
			this.canBuild++;
		}
	}]);

	return TowerStore;
})();

module.exports = TowerStore;