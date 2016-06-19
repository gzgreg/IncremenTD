'use strict';

var React = require('react');
var UI = require('./UI.js');
var AltContainer = require('alt-container');

module.exports = React.createClass({
	displayName: 'exports',

	render: function render() {
		return React.createElement(
			AltContainer,
			{ flux: this.props.flux },
			React.createElement(UI, null)
		);
	}
});