var React = require('react');
module.exports = React.createClass({
		render: function() {
			return (
				<form className="searchBox">
					<input type='text' placeholder='Search..' value={this.props.filterText} />
					<p>
						<input type='checkbox' checked={this.props.inStockOnly}></input>
						Only show products in stock
					</p>
				</form>
			);
		}
});