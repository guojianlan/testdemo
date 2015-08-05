var React = require('react');
var MyComponent = React.createClass({
	handleClick:function(){
		React.findDOMNode(this.refs.mytext).focus();
	},
	render:function(){
		return (<div>
					<input ref='mytext' type='text' />
					<input type='button' value='focus the text input' onClick={this.handleClick} />
				</div>)
	}
});
React.render(<MyComponent />,document.getElementById('contant'))