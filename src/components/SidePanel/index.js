

var React = require("react");
var SignInForm = require("./SignIn");

var SidePanel = React.createClass({

  render: function() {
    return (
      <div className="side-panel">
        <div className="col-md-4">
          <SignInForm />
        </div>
      </div>
    )
  }

})


module.exports = SidePanel;
