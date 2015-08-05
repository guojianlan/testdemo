var React = require('react');
var Input = React.createClass({
	getInitialState:function(){
		return {Value:'hello!'};
	},
	handleChange:function(event){
		this.setState({Value:event.target.value});
	},
	render:function(){
		value = this.state.Value;
		return (<div>
					<input type='text' value={value} onChange={this.handleChange} />
					<p>{value}</p>
				</div>)
	}
});
React.render(<Input />,document.getElementById('contant'))