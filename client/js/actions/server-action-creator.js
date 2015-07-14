var AppDispatcher = require('../dispatcher/dispatcher');
var AppConstants = require('../constants/constants');

var ServerActionCreator = {
  gigAdded: function (gig) {
    AppDispatcher.dispatch({
      actionType: AppConstants.ServerActionTypes.GIG_ADDED,
      gig: gig
    });
  },
  recieveDayData: function(dayData){
    AppDispatcher.dispatch({
      actionType: AppConstants.ServerActionTypes.DAY_DATA_RECIEVED,
      dayData: dayData
    });
  },
  receiveWeekData: function (weekData) {
    AppDispatcher.dispatch({
      actionType: AppConstants.ServerActionTypes.WEEK_DATA_RECEIVED,
      weekData: weekData
    });
  },
  fetchedMonthData: function (monthData) {
    AppDispatcher.dispatch({
      actionType: AppConstants.ServerActionTypes.FETCHED_MONTH_DATA,
      monthData: monthData
    });
  }
};

module.exports = ServerActionCreator;