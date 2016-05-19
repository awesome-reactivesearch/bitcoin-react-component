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
  },
  componentDidMount: function(){
    $('#select_type').on('change',function(){
        $('#lowerprice').removeAttr("readonly");
        $('#upperprice').removeAttr("readonly");
        $("#upperprice").val("");
        $("#lowerprice").val("");
        
        switch($('#select_type').val()){
          case "range": break;
          case "lessthan" : $("#lowerprice").val("0");
                            $("#lowerprice").prop("readonly", true);
                            break;
          case "greaterthan" : $("#upperprice").val("1000");
                               $("#upperprice").prop("readonly", true);
                               break;
          case "fixvalue" : $('#lowerprice').val($('#upperprce').val());
                            $("#lowerprice").prop("readonly", true);
        }
    });
  }

});



module.exports = SignIpForm;
