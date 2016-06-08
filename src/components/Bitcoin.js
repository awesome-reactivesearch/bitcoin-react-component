var React = require('react');
var Stats = require("./Stats");
var BitcoinChart = require("./BitcoinChart");

var Bitcoin = React.createClass({
    handlePriceChange: function(priceObject){
        // Logic for handling the price change goes here
    },
    render: function() {
        return (
            <div>
                <Stats onPriceChange={this.handlePriceChange} />
                <BitcoinChart />
            </div>
        )
    }
});

module.exports = Bitcoin;

