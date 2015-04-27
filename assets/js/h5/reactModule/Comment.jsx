var React = require('react');
module.exports = React.createClass({
	render:function(){
		var commentNode = this.props.data.map(function(comment){
			
			return (
					<div className='comment' author={comment.author}>{comment.text}</div>
				);
		});
		return(
				<div>
					{commentNode}
				</div>
			);
	}
});