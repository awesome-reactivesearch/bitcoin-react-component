var React = require('react');

var SignIpForm = React.createClass({




  render : function() {
    return (
    <div className="well well-lg">
    <form accept-charset="UTF-8" role="form">
                    <fieldset>
			    	  	<div className="form-group">
			    		    <input className="form-control" placeholder="E-mail" name="email" type="text" />
			    		  </div>

			    	</fieldset>
		</form>
    </div>
  )
  }

});


module.exports = SignIpForm;
