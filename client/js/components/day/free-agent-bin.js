var React = require('react');
var Employee = require('./employee');
var _ = require('underscore');

var FreeAgentBin = React.createClass({

  // information: object full of gig info (like location)
  // staff: object with information about the staffing needs
    // and the approved employees.
  getDefaultProps: function(){
    return {
      freeAgents: [{name:'ryanakafasdfas'}]
    };
  },

  render: function(){
    console.log('test');
    console.log("this.props.freeAgents:", this.props.freeAgents);
    var freeAgents = _.map(this.props.freeAgents, function(freeAgent, idx) {
      console.log("freeAgent:", freeAgent);
      return <Employee name={freeAgent.name} rating='5' />
    });

    return (
      <div>
        {freeAgents}
      </div>
    );
  }

});

module.exports = FreeAgentBin;
