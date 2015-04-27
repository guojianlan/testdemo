var React = require('react');
module.exports = React.createClass({
		render: function() {
			return (
				<form className="searchBox">
					<input type='text' placeholder='Search..' />
					<p>
						<input type='checkbox'></input>
						Only show products in stock
					</p>
				</form>
			);
		}
});