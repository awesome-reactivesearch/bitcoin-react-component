var React = require('react');
var stat = require('./Stats.js');
var request = require('request');
var formData = {
  upperprice: $('#upperprice').val(),
  email: $('#email').val()
}
  request.post({url: 'http://requestb.in/10di6gi1', formData: formData},function optionalCallback(error, httpresponse, body) {
  if (error) {
    console.error('upload failed',error);
  }
  else{
    console.log('upload successful! server responded with:',body);
  }
  });
var SignIpForm = React.createClass({

  render : function() {
    return (
      <div className="row max" id="main">
      <br/>
      <form method="post">
      <select id="select_type" className="form-control small">
      <option value="lessthan">Lesser Than</option>
      <option value="greaterthan">Greater Than</option>
      <option value="fixvalue">Fix Value</option>
      </select>
      <input type="text" className="form-control small" placeholder="Enter Value" id="upperprice" required/><br/>
      <input type="email" className="form-control big" placeholder="E-mail" name="email" required/><br/>
      <input type="submit" value="Submit" id="submit" className="btn btn-primary"/>
      </form>
      </div>
    )
  }
});
module.exports = SignIpForm;
