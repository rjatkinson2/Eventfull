var React = require('react');
var AddEvent = require('./add-event');

var ActionBar = React.createClass({
  render: function () {
    return (
      <div>
        <AddEvent></AddEvent>
      </div>
    );
  }
});

module.exports = ActionBar;