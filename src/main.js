var React = require('react');
var ReactDOM = require('react-dom');
var Stats = require("./components/Stats");
var AlertForm = require("./components/AlertForm");

var Bitcoin = React.createClass({
	render: function() {
		return (
			<div className="Main">
				<div className="container">
					<Stats />
					<AlertForm />
				</div>
			</div>
		)
	}
});
ReactDOM.render(<Bitcoin />,
	document.getElementById('app'));
