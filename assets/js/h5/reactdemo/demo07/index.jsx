var React = require('react');
var MyComponent = React.createClass({
	getInitialState:function(){
		return {liked:false};
	},
	handleClick:function(){
		this.setState({liked:!this.state.liked});
	},
	render:function(){
		//var text = this.state.liked ? 'like' : 'haven\'t liked';
		var text = this.state.liked ? 'like' : 'haven\'t liked';
		return (<p onClick={this.handleClick}>{text}</p>)
	}
});
React.render(<MyComponent />,document.getElementById('contant'))