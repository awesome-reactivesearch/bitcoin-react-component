

var React = require("react");
var SignInForm = require("./SignIn");
var Stats = require("./Stats");
var chart = require("./chart");
var SidePanel = React.createClass({

  render: function() {
    return (

        <div className="">

            <div className="row">
              <div className="col-md-6">
                <Stats />
              </div>
            </div>
            <SignInForm />
        </div>
    )
  }

});


module.exports = SidePanel;
