var React = require('react');
var appbaseRef = require("./appbase").appbaseRef;
var config = require("./appbase").config;

var AlertForm = React.createClass({
  getInitialState: function(){
    return {
      price: '0',
      email: '',
      selectValue: 'lte'
    }
  },
  setWebhook: function(){
    var lteParam;
    var gteParam;
    var price = this.state.price
    var selectValue = this.state.selectValue
    var email = this.state.email
    if (selectValue == 'lte') {
      gteParam = 0
      lteParam = price
    }
    else if (selectValue == 'gte') {
      lteParam = 1000
      gteParam =price
    }
    else {
      gteParam = price
      lteParam = price
    }
    var data = {
      gteParam: gteParam,
      lteParam: lteParam,
      email: email
    }
    $.ajax({
      type: "POST",
      url: 'http://localhost:5001/alert',
      data: data,
      success: function(){
        console.log('yo')
      }
    });
  },
  handlePriceChange: function(event){
    this.setState({
      price: event.target.value,
    });
  },
  handleEmailChange: function(event){
    this.setState({
      email: event.target.value,
    });
  },
  handleSelectChange: function(event){
    this.setState({
      selectValue: event.target.value
    });
  },
  render : function() {
    return (
      <div className="row max" id="main">
        <br/>
        <select ref="conditionSelect" className="form-control small" value={this.state.selectValue} onChange={this.handleSelectChange}>
          <option value="lte">Lesser Than</option>
          <option value="gte">Greater Than</option>
          <option value="fixvalue">Fix Value</option>
        </select>
        <input type="text" className="form-control small" placeholder="Enter price" value={this.state.price} onChange={this.handlePriceChange} required/><br/>
        <input type="email" className="form-control big" placeholder="Enter email address" value={this.state.email} onChange={this.handleEmailChange} required/><br/>
        <input type="submit" className="btn btn-primary" onClick={this.setWebhook}/><br/>
      </div>
    )
  }
});
module.exports = AlertForm;
