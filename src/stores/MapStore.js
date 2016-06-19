var C = require('../data/constants.js');

class MapStore {
	constructor(map){
		var layer = map.layers[0];

		this.mapData = new Array(map.width);
		this.pathData = new Array(map.width);
		//mapData holds 1s for occupied cells, 2s for clear cells
		//pathData holds objects of form
		//{parent: {x: int, y: int}, dist: int} from dijkstra
		for(let i = 0; i < map.width; i++){
			this.mapData[i] = new Array(map.height);
			this.pathData[i] = new Array(map.height);
		}
		//get all tiles for dijkstra purposes
		for(let i = 0; i < layer.height; i++){
			for(var j = 0; j < layer.width; j++){
				let tile = layer.data[i][j];
				this.mapData[tile.x][tile.y] = tile.index;
			}
		}
		window.pathData = this.pathData;
		MapStore.dijkstra(this.mapData, this.pathData);
	}

	static isOccupied(mapData, x, y){
		return mapData[x][y+C.tileOffset] == 1 || y === 0 || 
				y == map.height - C.tileOffset - 1 ||
				y == map.height - C.tileOffset - 2;
	}

	static dijkstra(mapData, pathData){
		var pq = [];
		pq.enqueue = function(obj){
			pq.push(obj);
			pq.sort(function(a, b){
				return pathData[a.x][a.y].dist - pathData[b.x][b.y].dist;
			});
		};
		var height = mapData[0].length;
		var width = mapData.length;
		for(let i = 0; i < width; i++){
			//set distance to infinity
			for(let j = 0; j < height; j++){
				pathData[i][j] = {parent: null, dist: Infinity};
			}
			//add initial nodes
			if(mapData[i][height - 1] == 2){
				pq.enqueue({x: i, y: height - 1});
				pathData[i][height - 1] = {
					dist: 0,
					parent: {x: i, y: height}
				};
			}
		}

		//work backwards
		while(pq.length !== 0){
			var curr = pq.shift();
			var cases = [{x: curr.x, y: curr.y-1}, {x: curr.x, y: curr.y+1},
						 {x: curr.x-1, y: curr.y}, {x: curr.x+1, y: curr.y}];
			for(let i in cases){
				let x = cases[i].x, y = cases[i].y;
				if(x < 0 || y < 0 || 
					x >= width || 
					y >= height ||
					mapData[x][y] == 1) continue;
				if(pathData[x][y].dist > pathData[curr.x][curr.y].dist + 1){
					pathData[x][y].dist = pathData[curr.x][curr.y].dist + 1;
					pathData[x][y].parent = {x: curr.x, y: curr.y};

					pq.enqueue({x: x, y: y});
				}
			}
		}
	}
}


module.exports = MapStore;