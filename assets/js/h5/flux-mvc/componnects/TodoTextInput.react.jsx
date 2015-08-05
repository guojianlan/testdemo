var React = require('react');
var ReactPropTypes = React.PropTypes;
var ENTER_KEY_CODE = 13;
module.exports = React.createClass({
	propTypes:{
		className: ReactPropTypes.string,
		id: ReactPropTypes.string,
		placeholder: ReactPropTypes.string,
		value: ReactPropTypes.string,
		onSave: ReactPropTypes.func.isRequired
	},
	getInitialState : function(){
		return {
			value : this.props.value || ''
		};
	},
	_change:function(event){
		this.setState({
			value:event.target.value
		});
	},
	_save:function(){
		this.props.onSave(this.state.value);
		this.setState({
			value:''
		});
	},
	render:function(){
		return (
				<input type='text'
				 	className = {this.props.className}
				 	id={this.props.id} 
				 	placeholder={this.props.placeholder} 
				 	value={this.state.value}
				 	onChange={this._change}
				 	onBlur={this._save}
				 	autoFocus={true}
				/>
			);
	}
});