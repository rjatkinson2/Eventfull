var AppDispatcher = require('../dispatcher/dispatcher');
var ServerActionCreator = require('./server-action-creator');
var ApiUtils = require('../utils/api-utils');
var AppConstants = require('../constants/constants');
var moment = require('moment');

var ViewActionCreator = {

  addGig: function (gig) {
    // AppDispatcher.dispatch({
    //   actionType: AppConstants.ViewActionTypes.ADD_GIG
    // });
    ApiUtils.addGig(gig, ServerActionCreator.gigAdded);
  },

  getDayData: function(date){
    AppDispatcher.dispatch({
      actionType: AppConstants.ViewActionTypes.GET_DAY_DATA
    });

    ApiUtils.getDayData(date, ServerActionCreator.receiveDayData);
  },

  getWeekData: function (date) {
    AppDispatcher.dispatch({
      actionType: AppConstants.ViewActionTypes.GET_WEEK_DATA
    });

    var weekStart = date.startOf('isoWeek').format('YYYY-MM-DD');
    var weekEnd = date.endOf('isoWeek').format('YYYY-MM-DD');

    ApiUtils.getWeekData(weekStart, weekEnd, ServerActionCreator.receiveWeekData);
  },

  getMonthData: function (date) {
    AppDispatcher.dispatch({
      actionType: AppConstants.ViewActionTypes.GET_MONTH_DATA
    });

    var startDate = moment(date);
    var endDate = moment(date);
    startDate.startOf('month');
    endDate.endOf('month');
    ApiUtils.getMonthData(startDate, endDate, ServerActionCreator.receiveMonthData);
  },

  addFreeAgentToGig: function (info, date) {
    ApiUtils.addEmployeeToGig(info.employeeId, info.gigId, info.positionId).then(function () {
      ViewActionCreator.getDayData(date);
      ViewActionCreator.getFreeAgents({ date: date.format('YYYY-MM-DD'), gigId: info.gigId, positionId: info.positionId });
    });
  },

  moveStaff: function(info, date){
    AppDispatcher.dispatch({
      actionType: AppConstants.ViewActionTypes.STAFF_MOVED,
      info: info
    });

    ApiUtils.moveStaff(info).then(ViewActionCreator.getDayData.bind(null, date));
  },

  getAvailableEmployees: function(date){
    ApiUtils.getAvailableEmployees(date, ServerActionCreator.receiveAvailableEmployees);
  },

  sendConfirmationEmails: function (gigInfo) {
    ApiUtils.sendConfirmationEmails(gigInfo);
  },

  getFreeAgents: function (positionDetails) {
    positionDetails.date = moment(positionDetails.date);

    AppDispatcher.dispatch({
      actionType: AppConstants.ViewActionTypes.GET_FREE_AGENTS,
      gigId: positionDetails.gigId,
      positionId: positionDetails.positionId
    });
    ApiUtils.getFreeAgents(positionDetails, ServerActionCreator.receiveFreeAgents);
  }

};

module.exports = ViewActionCreator;
