var React = require('react');
var UI = require('./UI.js');
var AltContainer = require('alt-container');

module.exports = React.createClass({
	render: function(){
		return ( 
			<AltContainer flux={this.props.flux}>
				<UI />
			</AltContainer>
		);
	}
});