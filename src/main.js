$ = jQuery = require('jquery');
var React = require('react');
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



React.render(<App />,
 document.getElementById('app'));
