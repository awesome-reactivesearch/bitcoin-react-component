var React = require("react");
var Appbase = require("appbase-js");
var config = {
  "appname": "jsfiddle-demo",
  "username": "7eJWHfD4P",
  "password": "431d9cea-5219-4dfb-b798-f897f3a02665",
  "type": "1463991450935"
};

var appbaseRef = new Appbase({
  url: 'https://scalr.api.appbase.io',
  appname: config.appname,
  username: config.username,
  password: config.password
});
var requestObject = {
  type: config.type,
  body: {
    query: {
      match_all: {}
    }
  }
};


var Stats = React.createClass({

  getInitialState: function(){
    var self = this;

    appbaseRef.searchStream(requestObject).on('data', function(stream) {
      self.setState({bid: stream._source.bid});
      self.setState({last: stream._source.last});
      self.setState({avg: stream._source['24h_avg']});
      self.setState({total: stream._source.total_vol});
      self.setState({ask: stream._source.ask});


      console.log(stream._source.last);

    }).on('error', function(error) {
      console.log('Error handling code');
    });

    return {
      bid: "0",
      last: "0",
      avg: "0",
      total: "0",
      ask: "0"
    };
  },

  componentDidMount: function(){

    setInterval(function(){

    },1000);
  },
  render : function(){

    return (
      <div>
      <div className="bid-center">
      <p className="label-text">BID</p>
      </div>
      <center><div id="odometer" className="odometer odometer-theme-digital">{this.state.bid}
      </div></center>

      <div className="col-md-6">
      <p className="label-text">LAST</p>
      <p className="val" id="avg">{this.state.last}</p>
      </div>
      <div className="col-md-6">
      <p className="label-text">AVG OF 24 HRS</p>
      <p className="val" id="avg">{this.state.avg}</p>
      </div>
      <div className="col-md-6">
      <p className="label-text">TOTAL</p>
      <p className="val" id="avg">{this.state.total}</p>
      </div>
      <div className="col-md-6">
      <p className="label-text">ASK</p>
      <p className="val" id="avg">{this.state.ask}</p>
      </div>
      </div>
    )
  }
});
module.exports = Stats;
