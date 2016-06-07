var React = require("react");
var appbaseRef = require("./appbase").appbaseRef;
var config = require("./appbase").config;
var ReactHighstock = require("react-highcharts/bundle/ReactHighstock");

var data = []
var chartConfig = {
  rangeSelector: {
    buttons: [{
      count: 1,
      type: 'minute',
      text: '1M'
    }, {
      count: 5,
      type: 'minute',
      text: '5M'
    }, {
      type: 'all',
      text: 'All'
    }],
    inputEnabled: false,
    selected: 0
  },

  title: {
    text: 'Live Bitcoin Price'
  },

  xAxis: {
    minRange: 60 * 1000 // one minute
  },
  exporting: {
    enabled: false
  },

  series: [{
    name: 'Bitcoin Price',
    data: data
  }]
}

var requestObject = {
  type: config.type,
  body: {
    sort : [
        { timestamp : "desc" }
    ],
    query: {
      match_all: {}
    }
  }
};

var BitcoinChart = React.createClass({

  componentDidMount: function() {
    var self = this;
    appbaseRef.search(requestObject).on('data', function(res) {
      var hits = []
      console.log(res.hits.hits)
      var chart = self.refs.stockchart.getChart();
      res.hits.hits.map(function(hit) {
        var x = (new Date(hit._source.timestamp)).getTime(), // current time
          y = hit._source.last
        hits.push([x, y])
      })

      // Highchart expects data to be sorted
      hits = hits.sort()
      chart.series[0].setData(hits)
      appbaseRef.searchStream(requestObject).on('data', function(stream) {
        var x = (new Date()).getTime(), // current time
          y = stream._source.last

        hits.push([x, y])
        chart.series[0].setData(hits)
      }).on('error', function(error) {
        console.log("<br>Query error: ", JSON.stringify(error))
      });
    }).on('error', function(error) {
      console.log("<br>Query error: ", JSON.stringify(error))
    });
  },
  render: function() {
    return <ReactHighstock ref = "stockchart"
    config = {chartConfig}
    />
  }
});
module.exports = BitcoinChart;
