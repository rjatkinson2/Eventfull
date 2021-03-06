/** @jsx React.DOM */
var React = require('react');
var WeekGig = require('./week-gig');
var _ = require('underscore');

var WeekDayBin = React.createClass({
  render: function () {
    var weekGigs = _.map(this.props.day, function (gig, key) {
      return <WeekGig key={ key } gig={ gig } />;
    });
    return (
      <div className="bin-wrapper">
        <h3>{ this.props.date }</h3>
        <div className="bin">
          { weekGigs }
        </div>
      </div>
    );
  }
});

module.exports = WeekDayBin;
