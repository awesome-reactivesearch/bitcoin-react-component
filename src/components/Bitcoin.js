var React = require('react');
var Stats = require("./Stats");
var AlertForm = require("./AlertForm");

var Bitcoin = React.createClass({
    render: function() {
        return (
            <div>
                <Stats />
                <AlertForm />
            </div>
        )
    }
});

module.exports = Bitcoin;

