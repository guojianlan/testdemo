var React = require('react');
var NotesList = React.createClass({
	render:function(){
		return <ul>{
			this.props.children.map(function(child){
				return <li>{child}</li>
			})
		}</ul>
	}
});
React.render(<NotesList><span>111</span><span>222</span></NotesList>,document.getElementById('contant'))