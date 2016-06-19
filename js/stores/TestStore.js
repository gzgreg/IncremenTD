"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var alt = require("../alt.js");

var TestStore = function TestStore() {
	_classCallCheck(this, TestStore);

	this.asdf = "asdf";
};

module.exports = alt.createStore(TestStore, "TestStore");