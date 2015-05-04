var React = require('react');
var HelloMessage  = React.createClass({
	render:function(){
		return <h1>hello,{this.props.name}</h1>
	}
});
React.render(<HelloMessage name='jhon' />,document.getElementById('contant'))