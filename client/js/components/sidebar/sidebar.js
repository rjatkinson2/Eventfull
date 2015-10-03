var React = require('react');
var Link = require('react-router-component').Link;
var ViewActionCreator = require('../../actions/view-action-creator');

var Sidebar = React.createClass({
  render: function () {
    return (
      <div className="col-xs-1 col-md-2 sidebar">
        <div className="logo-offset">
          <img src="./style/EventfullLogo@lg.png" width="160px" alt="Eventfull" className="visible-lg-block" />
        </div>
        <img src="./style/EventfullLogo@md.png" width="80px" alt="Eventfull" className="logo visible-md-inline-block" />
        <img src="./style/EventfullLogo@sm.png" width="40px" alt="Eventfull" className="logo visible-sm-inline-block visible-xs-inline-block" />
        <ul className="nav nav-sidebar">
          <li className="active"><a href="#">Overview <span className="sr-only">(current)</span></a></li>
          <li><Link href='/day'>Day View</Link></li>
          <li><Link href='/week'>Week View</Link></li>
          <li><Link href='/month'>Month View</Link></li>
        </ul>
        <ul className="nav nav-sidebar">
          <li><a href="#actionbar/add-event">Add Event</a></li>
          <li><a href="#actionbar/add-employee">Add Employee</a></li>
          <li><a href="#actionbar/do-more-stuff">Do More Stuff</a></li>
        </ul>
      </div>
    );
  }
});

module.exports = Sidebar;