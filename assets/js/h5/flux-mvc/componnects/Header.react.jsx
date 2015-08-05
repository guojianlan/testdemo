var React = require('react');
var TodoTextInput = require('./TodoTextInput.react');
var TodoActions = require('../actions/TodoActions');
module.exports = React.createClass({
	render:function(){
		return (
				<header id='header'>
					<h1>todomvc</h1>
					<TodoTextInput id="new-todo" placeholder="What needs to be done?" onSave = {this._onSave} />
				</header>
			);
	},
	_onSave:function(text){
		if(text.trim()){
			TodoActions.create(text);
		}
	}
});