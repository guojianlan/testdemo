var React = require('react');
var Header = require('./Header.react');
var Footer = require('./Footer.react');
var TodoStore = require('../stores/TodoStore');
module.exports = React.createClass({
	render:function(){
		return(
			<div>
				<Header />
				<Footer />
			</div>
			);
	}
});