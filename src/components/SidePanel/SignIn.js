var React = require('react');

var SignIpForm = React.createClass({

  render : function() {
    return (
      <div className="row max" id="main">
      <br/>
      <form>
      <select id="select_type" className="form-control small">
      <option value="lessthan">Lesser Than</option>
      <option value="greaterthan">Greater Than</option>
      <option value="fixvalue">Fix Value</option>
      </select>
      <input type="text" className="form-control small" placeholder="Enter Value" id="upperprice" required/><br/>
      <input type="email" className="form-control big" placeholder="E-mail" name="email" required/><br/>
      <input type="submit" value="Submit" className="btn btn-primary"/>
      </form>
      </div>
    )
  }
});
module.exports = SignIpForm;
