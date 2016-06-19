var C = require("../data/constants.js");
var MapStore = require("../stores/MapStore.js");
var Tower = require("../classes/Tower.js");

class TowerStore {
	constructor(game){
		this.towers = game.add.group();
		this.canBuild = 0;
		this.bindActions(this.alt.getActions('TowerActions'));
		this.game = game;
	}
	
	buy(){
		if(this.canBuild <= 0) return;
		this.game.input.onDown.addOnce(function(pointer){
			var x = Math.floor(this.game.input.x / C.tileSize);
			var yScreen = Math.floor(this.game.input.y / C.tileSize);
			var y = yScreen + C.tileOffset;
			var MapStoreInstance = this.alt.getStore('MapStore');

			var mapData = MapStoreInstance.getState().mapData;
			var pathData = MapStoreInstance.getState().pathData;

			if(MapStore.isOccupied(mapData, x, y)) return;
			mapData[x][y] = 1;
			MapStore.dijkstra(mapData, pathData);
			for(let i = 0; i < mapData.length; i++){
				if(mapData[i][0] == 2 && pathData[i][0].dist == Infinity){
					//no possible path: don't build tower
					mapData[x][y] = 2;
					MapStore.dijkstra(mapData, pathData);
					return;
				}
			}
			new Tower(this.game, this.towers, mapData, x*C.tileSize, yScreen*C.tileSize);
			this.canBuild--;
			this.emitChange();
		}, this);
	}

	add(){
		this.canBuild++;
	}
}


module.exports = TowerStore;