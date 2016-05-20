var React = require('react');

var SignIpForm = React.createClass({

  render : function() {
    return (
    <div className="row max" id="main">

      <br/>
          <select id="select_type" className="form-control small">
              <option value="lessthan">Lesser Than</option>
              <option value="greaterthan">Greater Than</option>
              <option value="fixvalue">Fix Value</option>
          </select>
          <input type="text" className="form-control small" placeholder="Enter Value" id="upperprice"/><br/>
			    <input className="form-control big" placeholder="E-mail" name="email" type="text"/><br/>
          <input type="submit" value="Submit" className="btn btn-primary"/>
</div>


  )
  },
  componentDidMount: function(){

  }

});



module.exports = SignIpForm;
