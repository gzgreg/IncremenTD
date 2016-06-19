var React = require('react');

class UI extends React.Component {

	constructor(props){
		super(props);
		this._onChange = this._onChange.bind(this);
		this.state = this.props.flux.getStore('TowerStore').getState();
	}

	componentDidMount(){
		this.props.flux.getStore('TowerStore').listen(this._onChange);
	}

	componentWillUnmount(){
		this.props.flux.getStore('TowerStore').unlisten(this._onChange);
	}

	render(){
		var TowerActions = this.props.flux.getActions('TowerActions');
		var StateActions = this.props.flux.getActions('StateActions');
		var TowerStore = this.props.flux.getStore('TowerStore');
		return ( 
		<div className = "ui-container">
			<button onClick={TowerActions.add.bind(this)}>Add Tower</button>
			<button onClick={TowerActions.buy.bind(this)}>Buy Tower ({this.state.canBuild})</button>
			<button onClick={StateActions.resetWave.bind(this)}>Send Wave</button>
		</div>
		);
	}

	_onChange(){
		this.setState(this.props.flux.getStore('TowerStore').getState());
	}
}

module.exports = UI;
