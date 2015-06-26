/** @jsx React.DOM */

var React = require('react');
var Router = require('react-router-component');
var DragDropContext = require('react-dnd').DragDropContext;
var HTML5Backend = require('react-dnd/modules/backends/HTML5');
var Template = require('./components/app-template.js');
var Month = require('./components/month/month.js');
var Day = require('./components/day/day.js');
var Week = require('./components/week/week.js');
var Actionbar = require('./components/actionbar/action-bar.js');
var Sidebar = require('./components/sidebar/sidebar.js');
var classNames = require('classNames');

var Locations = Router.Locations;
var Location = Router.Location;
var NotFound = Router.NotFound;

var ActionBarView = React.createClass({
  getInitialState: function () {
    return {
      actionBarIsOpen: false
    };
  },
  toggleActionBar: function () {
    var currentRouteName = this.context;
    console.log(currentRouteName);
    this.setState({actionBarIsOpen: !this.state.actionBarIsOpen});
  },
  render: function () {
    var classes = classNames({
      'action-bar-default': true,
      'action-bar-open': this.state.actionBarIsOpen
    });
    console.log(classes);
    return (
      <Locations className={classes} id="action-bar" onNavigation={this.toggleActionBar}>
        <Location path='*/actionbar'  handler={Actionbar} />
        <NotFound                     handler={Actionbar} />
      </Locations>
    );
  }
});

var ScheduleView = React.createClass({
  render: function () {
    return (
      <Locations className="col-sm-9 col-sm-offset-3 col-md-8 col-md-offset-2 schedule-default schedule-push-right main" id="schedule">
        <Location path='/'            handler={Week}  />
        <Location path='/day'         handler={Day}  />
        <Location path='/week'        handler={Week}  />
        <Location path='/week/:date'  handler={Week}  />
        <Location path='/month'       handler={Month} />
        <NotFound                     handler={Week} />
      </Locations>
    );
  }
});

var App = React.createClass({
  render: function () {
    return (
      <div>
        <Sidebar />
        <ActionBarView />
        <ScheduleView />
      </div>
    );
  }
});

App = DragDropContext(HTML5Backend)(App);
React.render(<App/>, document.getElementById('content'));