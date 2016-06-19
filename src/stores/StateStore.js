var C = require('../data/constants.js');
var Creep = require("../classes/Creep.js");

var _waveSize = 10;

class StateStore {
	constructor(game){
		this.creeps = game.add.group();
		this.level = 1;
		this.game = game;

		this.bindActions(this.alt.getActions('StateActions'));
	}

	resetWave(){
		this.creeps.removeAll(true); //destroy all creeps
		var newHealth = 2 * Math.pow(this.level, 1.5);
		for(let i = 0; i < _waveSize; i++){
			let newX = C.rand(8, 10)*C.tileSize;
			let newY = C.rand(-C.tileOffset, -1)*C.tileSize;
			new Creep(this.game, this.creeps, newX, newY, newHealth);
		}
	}

	runWave(){
		this.creeps.forEach(function(creep){
			creep.x = C.rand(8, 10)*C.tileSize;
			creep.y = C.rand(-C.tileOffset, -1)*C.tileSize;
			creep.revive(Infinity); //heal to max health
		});
	}
}

module.exports = StateStore;