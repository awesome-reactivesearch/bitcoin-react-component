var React = require('react');

var SignIpForm = React.createClass({

  render : function() {
    return (
    <div className="row max">

      <br/>
          <select id="select_type" className="form-control small">
              <option value="range">Range</option>
              <option value="lessthan">Lesser Than:</option>
              <option value="greaterthan">Greater Than:</option>
              <option value="fixvalue">Fix Value</option>
          </select>
			    <input type="text" className="form-control small" placeholder="Lower Limit" id="lowerprice"/>
          <input type="text" className="form-control small" placeholder="Upper Limit" id="upperprice"/>
			    <input className="form-control small" placeholder="E-mail" name="email" type="text"/>
          <input type="submit" value="Submit" className="btn btn-primary"/>
			    		
      
    </div>
  )
  }
});



module.exports = SignIpForm;
