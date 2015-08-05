var React = require('react');
var CommentList = require('./CommentList.jsx');
var CommentForm = require('./CommentForm.jsx');
var $ =require('jquery');
module.exports = React.createClass({
		loadCommentsFromServer:function(){
			$.ajax({
			  url: this.props.url,
			  dataType: 'json',
			  success: function(dataresp) {
			    //called when successful
			    this.setState({data:dataresp});
			  }.bind(this),
			  error: function(xhr, status, err) {
			     console.error(this.props.url, status, err.toString());
			  }.bind(this)
			});
		},
		getInitialState:function(){
			return {data:[]};
		},
		handleCommentSubmit:function(comment){
			/*$.ajax({
			  url: this.props.url,
			  type:'POST',
			  dataType: 'json',
			  data:comment,
			  success: function(dataresp) {
			    //called when successful
			    this.setState({data:dataresp});
			  }.bind(this),
			  error: function(xhr, status, err) {
			     console.error(this.props.url, status, err.toString());
			  }.bind(this)
			});*/
    	var comments = this.state.data;
    	var newComments = comments.concat([comment]);
   	    this.setState({data: newComments});
			
		},
		componentDidMount:function(){
			this.loadCommentsFromServer();
			//setInterval(this.loadCommentsFromServer, this.props.pollInterval)
		},
		render: function() {
			return (
				<div className="commentBox">
					<h1>comments</h1>

					<CommentList data={this.state.data} />
					<CommentForm onCommentSubmit={this.handleCommentSubmit} />
				</div>
    );
  }
});