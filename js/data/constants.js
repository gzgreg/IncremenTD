"use strict";

module.exports = {
	tileSize: 32, //pixels
	tileOffset: 7, //offset of tilemap from top
	pixelOffset: 32 * 7, //tileSize * tileOffset

	rand: function rand(min, max) {
		return Math.random() * (max - min) + min;
	},

	checkOverlap: function checkOverlap(sprite1, sprite2) {
		return Phaser.Rectangle.intersects(sprite1.getBounds(), sprite2.getBounds());
	}
};