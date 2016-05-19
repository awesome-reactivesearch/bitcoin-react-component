$ = jQuery = require('jquery');
var React = require('react');
var Navbar = require("./components/Common/NavBar");
var SidePanel = require("./components/SidePanel");


var App = React.createClass({



	render : function() {

		return (
			<div className="Main">

			<Navbar/>
			<div className="container">
				<SidePanel />
				<div className="row">

				</div>
			</div>
		</div>


		)
	}
})



React.render(<App />,
 document.getElementById('app'));
