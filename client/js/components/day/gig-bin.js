var React = require('react');
var StaffCard = require('./staff-card');
var ViewActionCreator = require('../../actions/view-action-creator');
var classnames = require('classnames');
var GigBin = React.createClass({

  // information: object full of gig info (like location)
  // staff: object with information about the staffing needs
    // and the approved employees.
  getDefaultProps: function(){
    return {
      information: {},
      staff: [],
      positions: []
    };
  },

  getInitialState: function () {
    return {
      showInformation: false
    };
  },

  _toggleInformation: function () {
    this.setState({ showInformation: !this.state.showInformation });
  },

  _getFreeAgents: function(positionId, positionName) {
    var info = this.props.information;
    ViewActionCreator.getFreeAgents({positionName: positionName, positionId: positionId, startTime: info.startTime, endTime: info.endTime, date: info.date, gigId: info.id});
  },

  sendConfirmationEmails: function () {
    ViewActionCreator.sendConfirmationEmails(this.props.information);
  },

  render: function(){
    console.log('render triggered');
    return (
        <div>
          <div className="bin-actions">
            <button onClick = {this.sendConfirmationEmails} type="submit"><i className="fa fa-paper-plane-o"></i></button>
            <button onClick = {this._toggleInformation}><i className="fa fa-expand"></i></button>
            <button><i className="fa fa-pencil-square-o"></i></button>
          </div>
          <GigInformation information={this.props.information} showInformation={this.state.showInformation} />
          <StaffCard staff={this.props.staff}
            positions={this.props.positions}
            gigId={this.props.information.id}
            getFreeAgents={this._getFreeAgents}
            freeAgentsOpen={this.props.freeAgentsOpen} />
          <button onClick = {this.sendConfirmationEmails} type="submit">Send Confirmation</button>
        </div>
    );
  }

});

var GigInformation = React.createClass({

  getDefaultProps: function(){
    return {
      information: {
        location: {}
      },
      showInformation: false
    };
  },

  render: function(){
    console.log("this.props.showInformation:", this.props.showInformation);
    var information = this.props.information;
    var classes = classnames({
      'gig-information': true,
      open: this.props.showInformation
    });

    return (
      <div className={classes}>
        <br />Title: {information.title}
        <br />Location: {information.Location.name}
        <br />Type: {information.type}
        <br />StartTime: {information.startTime}
        <br />EndTime: {information.endTime}
      </div>
    );
  }

});

module.exports = GigBin;
