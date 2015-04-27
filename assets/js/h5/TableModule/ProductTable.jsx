var React = require('react');
var ProductCategoryRow = require('./ProductCategoryRow.jsx');
var ProductRow = require('./ProductRow.jsx');
module.exports=React.createClass({
	render:function(){
		var rows=[];
		var lastCategory = null;
		this.props.products.map(function(product){
			if(product.category !== lastCategory){
				rows.push(<ProductCategoryRow category={product.category} key={product.category} />);
			}
			rows.push(<ProductRow product={product} key={product.name} />);
            lastCategory = product.category;
		});
		return (
				<table>
					<thead>
						<tr>
							<th>Name</th>
							<th>Price</th>
						</tr>
					</thead>
					<tbody>
						{rows}
					</tbody>
				</table>
			);
	}
});