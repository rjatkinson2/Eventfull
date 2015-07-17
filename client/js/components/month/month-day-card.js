/** @jsx React.DOM */
var React = require('react');
var Link = require('react-router-component').Link;

var MonthDayCard = React.createClass({
  render:function () {
    var currentDate = this.props.dayData.date;
    var dayPath = '/day/' + currentDate;

    var eventCircles = [];
    for(var i=0; i<this.props.dayData.numEvents; i++) {
      //temporary way to make different colored circles
      // var status = Math.floor(Math.random() *5) +1;
      eventCircles.push(<div className= "dot-health"></div>);
    }
    return (
      <div className="gig-card">
        <Link href={dayPath}><h2>{ this.props.dayData.weekNumber * 7 + this.props.dayData.dayNumber }</h2></Link>
        <div className="dot-list">{ eventCircles }</div>
      </div>
    );
  }
});

module.exports = MonthDayCard;