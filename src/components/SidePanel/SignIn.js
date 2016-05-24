var React = require('react');
var stat = require('./Stats.js');
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


var SignIpForm = React.createClass({
  getInitialState: function(){
    return {
      price: '0',
      opt: 'lessthan',
      greaterprice: '',
      lessprice: ''
    }
  },
  handleClick: function(){
    var self = this;
    if (self.state.opt == 'lessthan') {
      self.setState({greaterprice: 0});
      self.setState({lessprice: self.state.price})
    }
    else if (self.state.opt == 'greaterthan') {
      self.setState({greaterprice: self.state.price});
      self.setState({lessprice: 1000})
    }
    else {
      self.setState({greaterprice: self.state.price});
      self.setState({lessprice: self.state.price})
    }
      appbaseRef.searchStreamToURL({
        type: config.type,
        body:{
          "query":{
            "range" : {
              "last" : {
                "gte" : '{self.state.greaterprice}',
                "lte" : '{self.state.lessprice}'
              }
            }
          }
        }
      },{
        'method': 'POST',
        'url': 'http://requestb.in/rmqj4rrm',
        "count":1
      }).on('data', function(response) {
          console.log("Webhook has been configured : ", response);
          console.log("hey",self.state.price);
      }).on('error', function(error) {
          console.log("searchStreamToURL() failed with: ", error)
      });
  },
  handleChange: function(){
    this.setState({
      price: event.target.price,
      opt: event.target.opt
    });
  },
  render : function() {
    return (
      <div className="row max" id="main">
      <br/>
      <select id="select_type" className="form-control small" value={this.state.opt} onChange={this.handleChange}>
      <option value="lessthan">Lesser Than</option>
      <option value="greaterthan">Greater Than</option>
      <option value="fixvalue">Fix Value</option>
      </select>
      <input type="text" className="form-control small" placeholder="Enter Value" id="upperprice" value={this.state.price} onChange={this.handleChange} required/><br/>
      <input type="email" className="form-control big" placeholder="E-mail" name="email" required/><br/>
      <input type="submit" value="Submit" id="submit" className="btn btn-primary" onClick={this.handleClick}/>
      </div>
    )
  }
});
module.exports = SignIpForm;
