'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var C = require('../data/constants.js');

var MapStore = (function () {
	function MapStore(map) {
		_classCallCheck(this, MapStore);

		var layer = map.layers[0];

		this.mapData = new Array(map.width);
		this.pathData = new Array(map.width);
		//mapData holds 1s for occupied cells, 2s for clear cells
		//pathData holds objects of form
		//{parent: {x: int, y: int}, dist: int} from dijkstra
		for (var i = 0; i < map.width; i++) {
			this.mapData[i] = new Array(map.height);
			this.pathData[i] = new Array(map.height);
		}
		//get all tiles for dijkstra purposes
		for (var i = 0; i < layer.height; i++) {
			for (var j = 0; j < layer.width; j++) {
				var tile = layer.data[i][j];
				this.mapData[tile.x][tile.y] = tile.index;
			}
		}
		window.pathData = this.pathData;
		MapStore.dijkstra(this.mapData, this.pathData);
	}

	_createClass(MapStore, null, [{
		key: 'isOccupied',
		value: function isOccupied(mapData, x, y) {
			//TODO: add check for creeps
			return mapData[x][y] === 1 || y <= C.tileOffset || y >= map.height - 2;
		}
	}, {
		key: 'dijkstra',
		value: function dijkstra(mapData, pathData) {
			var pq = [];
			pq.enqueue = function (obj) {
				pq.push(obj);
				pq.sort(function (a, b) {
					return pathData[a.x][a.y].dist - pathData[b.x][b.y].dist;
				});
			};
			var height = mapData[0].length;
			var width = mapData.length;
			for (var i = 0; i < width; i++) {
				//set distance to infinity
				for (var j = 0; j < height; j++) {
					pathData[i][j] = { parent: null, dist: Infinity };
				}
				//add initial nodes
				if (mapData[i][height - 1] == 2) {
					pq.enqueue({ x: i, y: height - 1 });
					pathData[i][height - 1] = {
						dist: 0,
						parent: { x: i, y: height }
					};
				}
			}

			//work backwards
			while (pq.length !== 0) {
				var curr = pq.shift();
				var cases = [{ x: curr.x, y: curr.y - 1 }, { x: curr.x, y: curr.y + 1 }, { x: curr.x - 1, y: curr.y }, { x: curr.x + 1, y: curr.y }];
				for (var i in cases) {
					var x = cases[i].x,
					    y = cases[i].y;
					if (x < 0 || y < 0 || x >= width || y >= height || mapData[x][y] == 1) continue;
					if (pathData[x][y].dist > pathData[curr.x][curr.y].dist + 1) {
						pathData[x][y].dist = pathData[curr.x][curr.y].dist + 1;
						pathData[x][y].parent = { x: curr.x, y: curr.y };

						pq.enqueue({ x: x, y: y });
					}
				}
			}
		}
	}]);

	return MapStore;
})();

module.exports = MapStore;