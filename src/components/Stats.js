var React = require("react");
var appbaseRef = require("./appbase").appbaseRef;
var config = require("./appbase").config;

// Request object for fetching the last record
var requestObject = {
  type: config.type,
  body: {
    size: 1,
    sort : [
        { timestamp : "desc" }
    ],
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
    appbaseRef.search(requestObject).on('data', function(res) {
      self.updatePrice(res.hits.hits[0]._source)
      appbaseRef.searchStream(requestObject).on('data', function(stream) {
        self.updatePrice(stream._source)
      }).on('error', function(error) {
        console.log('Error handling code');
      });
    })
  },
  updatePrice: function(data){
    this.setState({bid: data.bid});
    this.setState({last: data.last});
    this.setState({avg: data['24h_avg']});
    this.setState({total: data.total_vol});
    this.setState({ask: data.ask});
    this.props.onPriceChange(data)
  },
  render: function(){
    return (
      <div className="row text-center">
        <div className="col-md-12">
            <p className="label-text">BID</p>
            <div id="odometer" className="odometer odometer-theme-digital">
              {this.state.bid}
            </div>
            <br /><br />
        </div>
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
    )
  }
});
module.exports = Stats;
