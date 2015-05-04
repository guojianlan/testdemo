var React = require('react');
var SearchBox = require('./searchBoxModule.jsx');
var ProductTable = require('./ProductTable.jsx');
var PRODUCTS = [
  {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
  {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
  {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
  {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
  {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
  {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
];
module.exports = React.createClass({
	getInitialState:function(){
		return {
			filterText: '',
			inStockOnly: false
		}
	},
	handleUserInput:function(filterText,inStockOnly){
		this.setState({filterText:filterText,inStockOnly:inStockOnly});
	},
	render:function(){
		return (
				<div>
					<SearchBox filterText={this.state.filterText} inStockOnly={this.state.inStockOnly} onUserInput={this.handleUserInput} />
					<ProductTable products={PRODUCTS} filterText={this.state.filterText} inStockOnly={this.state.inStockOnly} />
				</div>
			);
	}
});