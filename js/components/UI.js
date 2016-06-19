'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');

var UI = (function (_React$Component) {
	_inherits(UI, _React$Component);

	function UI(props) {
		_classCallCheck(this, UI);

		_get(Object.getPrototypeOf(UI.prototype), 'constructor', this).call(this, props);
		this._onChange = this._onChange.bind(this);
		this.state = this.props.flux.getStore('TowerStore').getState();
	}

	_createClass(UI, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			this.props.flux.getStore('TowerStore').listen(this._onChange);
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			this.props.flux.getStore('TowerStore').unlisten(this._onChange);
		}
	}, {
		key: 'render',
		value: function render() {
			var TowerActions = this.props.flux.getActions('TowerActions');
			var StateActions = this.props.flux.getActions('StateActions');
			var TowerStore = this.props.flux.getStore('TowerStore');
			return React.createElement(
				'div',
				{ className: 'ui-container' },
				React.createElement(
					'button',
					{ onClick: TowerActions.add.bind(this) },
					'Add Tower'
				),
				React.createElement(
					'button',
					{ onClick: TowerActions.buy.bind(this) },
					'Buy Tower (',
					this.state.canBuild,
					')'
				),
				React.createElement(
					'button',
					{ onClick: StateActions.resetWave.bind(this) },
					'Send Wave'
				)
			);
		}
	}, {
		key: '_onChange',
		value: function _onChange() {
			this.setState(this.props.flux.getStore('TowerStore').getState());
		}
	}]);

	return UI;
})(React.Component);

module.exports = UI;