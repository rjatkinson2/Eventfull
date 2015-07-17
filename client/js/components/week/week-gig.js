/** @jsx React.DOM */
var React = require('react');
var _ = require('underscore');

var WeekGig = React.createClass({
  getInitialState: function () {
    return { showCardDetails: false };
  },
  toggleDetails: function () {
    this.setState({ showCardDetails: !this.state.showCardDetails });
  },
  render: function () {
    var cardDetailsDisplay = { display: this.state.showCardDetails ? 'block' : 'none' };
    var gig = this.props.gig;

    return (
      <div className="gig-card">
        <h2>{ gig.title }</h2>
        <h5>{ gig.startTime }</h5>
        <h5>to</h5>
        <h5>{ gig.endTime }</h5>
        <div className="health" onClick={ this.toggleDetails }></div>
        <div style={ cardDetailsDisplay }>
          <h5>{ gig.type }</h5>
        </div>
      </div>
    );
  }
});

module.exports = WeekGig;