var Alt = require('Alt');

var TowerActions = require('./actions/TowerActions.js');
var StateActions = require('./actions/StateActions.js');
var MapStore = require('./stores/MapStore.js');
var TowerStore = require('./stores/TowerStore.js');
var StateStore = require('./stores/StateStore.js');

class gameAlt extends Alt {
	constructor(config, game, map){
		super(config);

		this.addActions('TowerActions', TowerActions);
		this.addActions('StateActions', StateActions);
		this.addStore('TowerStore', TowerStore, game);
		this.addStore('StateStore', StateStore, game);
		this.addStore('MapStore', MapStore, map);

	}
}

module.exports = gameAlt;