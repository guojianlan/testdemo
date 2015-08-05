var React = require('react');
var Hello = React.createClass({
	getInitialState:function(){
		return {opacity:1.0};
	},
	componentDidMount:function(){
		this.timer = setInterval(function(){
			var opacity = this.state.opacity;
			opacity -= .05;
			if(opacity<0.1){
				opacity=1
			}
			this.setState({opacity:opacity});
		}.bind(this),100);
	},
	render:function(){

		return (<div style={{opacity:this.state.opacity}}>hello,{this.props.name}</div>)
	}
});
React.render(<Hello name='world' />,document.getElementById('contant'))