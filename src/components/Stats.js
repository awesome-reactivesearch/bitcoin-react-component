var React = require("react");
var appbaseRef = require("./appbase").appbaseRef;
var config = require("./appbase").config;

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
    return {
      bid: "0",
      last: "0",
      avg: "0",
      total: "0",
      ask: "0"
    };
  },
  componentDidMount: function(){
    var self = this;
    appbaseRef.searchStream(requestObject).on('data', function(stream) {
      self.setState({bid: stream._source.bid});
      self.setState({last: stream._source.last});
      self.setState({avg: stream._source['24h_avg']});
      self.setState({total: stream._source.total_vol});
      self.setState({ask: stream._source.ask});
      self.props.onPriceChange(stream._source)
    }).on('error', function(error) {
      console.log('Error handling code');
    });
  },
  render: function(){
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="bid-center">
            <p className="label-text">BID</p>
          </div>
          <center>
            <div id="odometer" className="odometer odometer-theme-digital">
              {this.state.bid}
            </div>
          </center>
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
          <h5> <i className="spinner"> </i> Listening</h5>
        </div>
      </div>
    )
  }
});
module.exports = Stats;
