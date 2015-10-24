var React = require('react');
var Employee = require('./employee');
var _ = require('underscore');

var FreeAgentBin = React.createClass({

  // information: object full of gig info (like location)
  // staff: object with information about the staffing needs
    // and the approved employees.

  getDefaultProps: function () {
    return {
      freeAgents: []
    };
  },

  render: function(){
    var gigId = this.props.gigId, positionId = this.props.positionId, positionName = this.props.positionName;

    var freeAgents;
    if (this.props.freeAgents.length > 0) {
      freeAgents = _.map(this.props.freeAgents, function(freeAgent, idx) {
        return <Employee name={freeAgent.name} rating={freeAgent.score} employeeId={freeAgent.UserId} freeAgentBin={true} gigId={gigId} positionId={positionId} positionName={positionName} />
      });
    } else {
      return <h4>Shucks, nobody else is available for this spot</h4>;
    }

    return (
      <div>
        {freeAgents}
      </div>
    );
  }

});

module.exports = FreeAgentBin;
