var React = require('react');
var CommentBox = require('./reactModule/CommentBox.jsx');

React.render(
		<CommentBox url="demo.json" pollInterval='2000' />, document.getElementById('myDiv')
);

