var React = require('react');
var ReactDOM = require('react-dom');

var SidePanel = require("./components/SidePanel");


var App = React.createClass({
	render : function() {
		return (
			<div className="Main">
				<div className="container">
					<SidePanel />
				</div>
			</div>
		)
	}
});
ReactDOM.render(<App />,
	document.getElementById('app'));
