

var React = require("react");
var SignInForm = require("./SignIn");

var SidePanel = React.createClass({

  render: function() {
    return (
      <div className="side-panel">
        <div className="col-md-12">
          <SignInForm />
        </div>
      </div>
    )
  }

})


module.exports = SidePanel;
