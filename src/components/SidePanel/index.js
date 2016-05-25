var React = require("react");
var AlertForm = require("./AlertForm");
var Stats = require("./Stats");
var SidePanel = React.createClass({

  render: function() {
    return (
      <div className="">
        <div className="row">
          <div className="col-md-6">
            <Stats />
          </div>
        </div>
        <AlertForm />
      </div>
    )
  }
});
module.exports = SidePanel;
