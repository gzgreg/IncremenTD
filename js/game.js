'use strict';

global.PIXI = require('../node_modules/phaser/dist/pixi.js');

global.Phaser = require('../node_modules/phaser/dist/phaser.js');

Phaser.Group.prototype.serialize = function () {
	var serialized = [];
	//returns array of serialized children
	this.forEach(function (child) {
		var serialize = child.serialize ? child.serialize() : child;
		serialized.push(serialize);
	});
	return serialized;
};

Phaser.Game.prototype.serialize = function () {
	return {};
};

var React = require('react');
var ReactDOM = require('react-dom');
var gameAlt = require('./alt.js');
var Root = require('./components/Root.js');
var C = require('./data/constants.js');

var game = new Phaser.Game(800, 800, Phaser.AUTO, 'gameContainer', { preload: preload, create: create, update: update });

function preload() {
	game.load.image('tower', 'assets/Tower.png');
	game.load.image('creep', 'assets/Creep.png');
	game.load.image('bullet', 'assets/Bullet.png');

	game.load.tilemap('map', "assets/map.json", null, Phaser.Tilemap.TILED_JSON);
	game.load.image('tiles', 'assets/tileset.jpg');
}

var alt = {};
var creeps, bullets;

window.Creep = require("./classes/Creep.js");

function create() {
	game.physics.startSystem(Phaser.Physics.ARCADE);

	var map = game.add.tilemap('map');
	global.map = map;
	map.addTilesetImage('tileset', 'tiles');
	var layer = map.createLayer('Tile Layer 1');
	game.scale.setGameSize(map.widthInPixels, map.heightInPixels - C.pixelOffset - C.tileSize); //extra shrink for bottom row

	//reposition tilemap
	layer.fixedToCamera = false;
	layer.position.set(0, -C.pixelOffset);

	layer.inputEnabled = true;

	alt = new gameAlt({
		serialize: function serialize(state) {
			//use serialize function on all object properties if available
			return JSON.stringify(Object.keys(state).map(function (key) {
				return state[key].serialize ? state[key].serialize() : state[key];
			}));
		}
	}, game, map);

	bullets = game.add.group();

	ReactDOM.render(React.createElement(Root, { flux: alt }), document.getElementById('ui'));
}

function update() {
	var creeps = alt.getStore('StateStore').getState().creeps;
	var towers = alt.getStore('TowerStore').getState().towers;
	var pathData = alt.getStore("MapStore").getState().pathData;
	towers.forEach(function (tower) {
		tower.fire(creeps, bullets, pathData);
	});
	bullets.forEach(function (bullet) {
		bullet.move(map);
	});
	creeps.forEachAlive(function (creep) {
		creep.move(pathData);
		bullets.forEach(function (bullet) {
			if (C.checkOverlap(creep, bullet)) {
				bullet.hit(creep);
			}
		});
	});
}

window.game = game;