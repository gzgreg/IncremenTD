var Phaser = require('../../node_modules/phaser/dist/phaser.js');
var game = require('../gameCreate.js');
var C = require("../data/constants.js");

class MainState extends Phaser.State {
	constructor(){
		super();
	}

	preload(){
		game.load.image('tower', 'assets/tower.png');
		game.load.image('creep', 'assets/creep.png');
		game.load.image('bullet', 'assets/bullet.png');

		game.load.tilemap('map', "assets/map.json", null, Phaser.Tilemap.TILED_JSON);
		game.load.image('tiles', 'assets/tileset.jpg');
	}

	create(){
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

	update(){
		TowerStore.getState().towers.forEach(function(tower){
			tower.fire(creeps, bullets);
		});
		bullets.forEach(function(bullet){
			bullet.move(map);
		});
		creeps.forEachAlive(function(creep){
			creep.move();
			bullets.forEach(function(bullet){
				if(C.checkOverlap(creep, bullet)){
					bullet.hit(creep);
				}
			});
		});
	}
}