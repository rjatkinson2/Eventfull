var React = require('react');
var DragSource = require('react-dnd').DragSource;
var ViewActionCreator = require('../../actions/view-action-creator');
var DayStore = require('../../stores/day-store');
var classnames = require('classnames');

var Employee = React.createClass({
  _draftFreeAgent: function () {
    if(this.props.freeAgentBin) {
      ViewActionCreator.addFreeAgentToGig({
        employeeId: this.props.employeeId,
        gigId: this.props.gigId,
        positionId: this.props.positionId,
        positionName: this.props.positionName
      }, DayStore.getDate());
    }
  },

  _removeEmployeeFromGig: function () {
    ViewActionCreator.removeEmployeeFromGig(this.props.employeeId, this.props.gigId, DayStore.getDate());
    if(this.props.freeAgentsOpen) {
      ViewActionCreator.getFreeAgents({
        date: DayStore.getDate().format('YYYY-MM-DD'),
        gigId: this.props.gigId,
        positionName: this.props.positionName,
        positionId: this.props.positionId
      });
    }
  },

  getDefaultProps: function(){
    // name: name of employee as string
    // rating: rating of employee as number
    return {
      name: '',
      rating: 10,
      gigId: Infinity,
      employeeId: Infinity,
      adminAccepted: false,
      workerAccepted: false
    };
  },

  // connectDragSource added to props by DragSource
  render: function(){
    // ratings are from 0 - 5 based on example data structure and correlate directly with ratings array indices.
    // a rating of 0 represents no ratings or the lowest rating. a rating of 5 represents the highest rating.
    var ratings = ["#F26350", "#F26350", "#F98F46", "#6BCFFF", "#6BCFFF", "#A8E5A7"];
    var ratingColor = ratings[Math.ceil(this.props.rating / 2)] || ratings[0];
    var styles = {
      backgroundColor: ratingColor,
      borderColor: ratingColor,
    };

    var classes = classnames({
      'employee': true,
      'admin-accepted': this.props.adminAccepted,
      'worker-accepted': this.props.workerAccepted,
      // ===false prevents the class from being added in null case
      'worker-declined': this.props.workerAccepted === false
    });

    // do not show the close button for free agents
    var displayClose = { display: this.props.freeAgentBin ? 'none' : 'inherit' };

    return this.props.connectDragSource(
      <div className={classes} onClick={this._draftFreeAgent} >
        <div className="close" style={displayClose} onClick={this._removeEmployeeFromGig}>&times;</div>
        <h4>{this.props.name}</h4>
        <div className="employee-rating" style={styles}></div>
      </div>
    );
  }

});

// see docs http://gaearon.github.io/react-dnd/docs-drag-source.html

var type = 'employee';

var spec = {

  beginDrag: function(props, monitor, component){
    // return a plain JavaScript object describing the data being dragged
    return {
      name: props.name,
      rating: props.rating,
      gigId: props.gigId,
      employeeId: props.employeeId
    };
  },

  endDrag: function(props, monitor, component){
    if (monitor.didDrop()){
       // the drop target specified a drop result by
       // returning a plain object from its drop() method,
       // it will be available as monitor.getDropResult()
      var toGig = monitor.getDropResult();

      ViewActionCreator.moveStaff({
        employeeId: props.employeeId,
        fromGigId: props.gigId,
        toGigId: toGig.gigId,
        toGroupId: toGig.positionId,
      }, DayStore.getDate());
    }
  },

  canDrag: function (props) {
    // You can disallow drag based on props
    // for now we will just return true.
    return true;
  }

};

var collect = function(connect, monitor){
  return {connectDragSource: connect.dragSource()};
};

module.exports = DragSource(type, spec, collect)(Employee);