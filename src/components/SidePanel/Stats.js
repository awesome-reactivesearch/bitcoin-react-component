var React = require("react");

var Stats = React.createClass({

  componentDidMount: function(){
    setTimeout(function(){
      odometer.innerHTML = 456767888.789;
    },1000);


  },
  render : function(){

    return (
      <div>
          <div className="bid-center">
            <p className="label-text">BID</p>
            </div>
            <center><div id="odometer" className="odometer odometer-theme-digital">123
            </div></center>

          <div className="col-md-6">
            <p className="label-text">LAST</p>
            <p className="val" id="avg">12363763</p>
          </div>
          <div className="col-md-6">
            <p className="label-text">AVG OF 24 HRS</p>
            <p className="val" id="avg">123</p>
          </div>
          <div className="col-md-6">
            <p className="label-text">TOTAL</p>
            <p className="val" id="avg">123</p>
          </div>
          <div className="col-md-6">
            <p className="label-text">ASK</p>
            <p className="val" id="avg">123</p>
          </div>
      </div>
    )
  }



});


module.exports = Stats;
