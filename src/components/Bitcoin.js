var React = require('react');
var Stats = require("./Stats");
var AlertForm = require("./AlertForm");

var Bitcoin = React.createClass({
    handlePriceChange: function(priceObject){
        // console.log(priceObject)
        // Logic for handling the price change goes here
    },
    render: function() {
        return (
            <div>
                <Stats onPriceChange={this.handlePriceChange} />
                <AlertForm />
            </div>
        )
    }
});

module.exports = Bitcoin;

