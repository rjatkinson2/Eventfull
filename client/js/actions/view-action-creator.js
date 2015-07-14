var AppDispatcher = require('../dispatcher/dispatcher');
var ServerActionCreator = require('./server-action-creator');
var ApiUtils = require('../utils/api-utils');
var AppConstants = require('../constants/constants');
var moment = require('moment');

var ViewActionCreator = {

  addGig: function (gig) {
    AppDispatcher.dispatch({
      actionType: AppConstants.ViewActionTypes.ADD_GIG
    });
    ApiUtils.addGig(gig, ServerActionCreator.gigAdded);
  },

  getDayData: function(date){
    AppDispatcher.dispatch({
      actionType: AppConstants.ViewActionTypes.GET_DAY_DATA
    });
    
    // hardcoded for now, will change.
    ApiUtils.getDayData(new Date('Jun 21 2015'), ServerActionCreator.recieveDayData);
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

    ApiUtils.getMonthData(date, ServerActionCreator.fetchedMonthData);
  },

  moveStaff: function(info){
    AppDispatcher.dispatch({
      actionType: AppConstants.ViewActionTypes.STAFF_MOVED,
      info: info
    });

    ApiUtils.moveStaff(info).then(ViewActionCreator.getDayData);
  }

};

module.exports = ViewActionCreator;