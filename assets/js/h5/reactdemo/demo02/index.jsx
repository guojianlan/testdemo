var React = require('react');
var names = [1,2,3];
React.render(
	<div>{
		names.map(function(name){
			return <div>hello,{name}</div>
	    })
	}</div>,document.getElementById('contant'))