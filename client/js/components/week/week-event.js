/** @jsx React.DOM */
var React = require('react');
var _ = require('underscore');

var WeekEvent = React.createClass({
  render: function () {
    return (
      <div className="event-card">
        <h2>{ this.props.event.title }</h2>
        <h5>{ this.props.event.startTime }</h5>
        <p>{ this.props.event.endTime }{ this.props.event.date }{ this.props.event.health }</p>
        <div className="health">healthy :)</div>
      </div>
    );
  }
});

module.exports = WeekEvent;