var React = require('react');
var ViewActionCreator = require('../../actions/view-action-creator');
var moment = require('moment');
var DatePicker = require('react-date-picker');
var _ = require('underscore');

var AddEvent = React.createClass({
  getInitialState: function () {
    return {
      value: null,
      dateValue: '',
      calendarView: {
        display: 'none'
      }
    };
  },

  addGig: function (e) {
    e.preventDefault();

    var gig = _.mapObject(this.refs, function (constructor) {
      if (React.findDOMNode(constructor).value.trim() === "") {
        return null;
      }
      return _.escape(React.findDOMNode(constructor).value.trim());
    });

    gig.locationId = '1';
    gig.attireId = '1';
    ViewActionCreator.addGig(gig);
  },

  toggleCalendar: function () {
    this.setState({ calendarView: { display: 'block' }});
  },

  handleDateSelection: function (date, moment, e) {
    this.setState({ dateValue: date });
  },

  render: function () {
    return (
      <div>
        <h2>Add Event</h2>
        <form onSubmit={this.addGig}>
          <div className="form-group">
            <div className="col-xs-12">
              <input type="text" placeholder="event title" ref="title"></input>
            </div>
          </div>
          <div className="form-group">
            <div className="col-xs-12">
              <input type="text" placeholder="event date" ref="date" value={ this.state.dateValue } onClick={ this.toggleCalendar }readOnly></input>
              <DatePicker onChange={ this.handleDateSelection } style={ this.state.calendarView } />
            </div>
          </div>
          <div className="form-group">
            <div className="col-xs-6">
              <input type="text" placeholder="start time" ref="startTime"></input>
            </div>
            <div className="col-xs-6">
              <input type="text" placeholder="end time" ref="endTime"></input>
            </div>
          </div>
          <div className="form-group">
            <div className="col-xs-12">
              <input type="text" placeholder="event address" ref="addressOne"></input>
            </div>
          </div>
          <div className="form-group">
            <div className="col-xs-12">
              <input type="text" placeholder="address two" ref="addressTwo"></input>
            </div>
          </div>
          <div className="form-group">
            <div className="col-xs-6">
              <input type="text" placeholder="city" ref="city"></input>
            </div>
            <div className="col-xs-3">
              <input type="text" placeholder="state" ref="state"></input>
            </div>
            <div className="col-xs-3">
              <input type="text" placeholder="zip" ref="zip"></input>
            </div>
          </div>
          <div className="form-group">
            <div className="col-xs-6">
              <input type="text" placeholder="type" ref="type"></input>
            </div>
            <div className="col-xs-6">
              <input type="text" placeholder="complexity" ref="complexity"></input>
            </div>
          </div>
          <div className="form-group">
            <div className="col-xs-12">
              <input type="text" placeholder="attire" ref="attire"></input>
            </div>
          </div>
          <div className="form-group">
            <div className="col-xs-12">
              <input type="submit"></input>
            </div>
          </div>
        </form>
      </div>
    );
  }
});

module.exports = AddEvent;