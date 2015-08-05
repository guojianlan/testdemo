var React =require('react');
var Comment = require('./Comment.jsx');
module.exports =React.createClass({
	render:function(){
			
		return (
				<div className='commentlist'>
					<Comment data= {this.props.data} />
				</div>
			);
	}
});