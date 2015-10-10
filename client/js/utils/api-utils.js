var axios = require('axios');
var server = 'http://localhost:8000';

var ApiUtils = {

  addGig: function (gig, callback) {
    var path = server + '/api/organizations/1/gigs/';
    axios.post(path, {
      gig: gig
    }).then(function (res) {
      return res.data;
    }).then(callback);
  },

  getDayData: function(date, callback){
    var path = server + '/api/organizations/1/gigs/';
    // get day data and pass it to callback
    axios.get(path, {
      params: {
        startDate: date.format('YYYY-MM-DD'),
        endDate: date.format('YYYY-MM-DD'),
      }
    }).then(function(res){
      return {
        date: date,
        gigs: res.data.gigs
      };
    }).then(callback);
  },

  getWeekData: function (startDate, endDate, callback) {
    var path = server + '/api/organizations/1/gigs/';

    axios.get(path, {
      params: {
        startDate: startDate,
        endDate: endDate
      }
    }).then(function (res) {
      return {
        startDate: startDate,
        endDate: endDate,
        gigs: res.data.gigs
      };
    }).then(callback);
  },

  getMonthData: function (startDate, endDate, callback) {
    var path = server + '/api/organizations/1/gigs';
    axios.get(path, {
      params: {
        startDate: startDate.format('YYYY-MM-DD'),
        endDate: endDate.format('YYYY-MM-DD')
      }
    }).then(function (res) {
      return {
        startDate: startDate,
        endDate: endDate,
        gigs: res.data.gigs
      };
    }).then(callback);
  },

  addEmployeeToGig: function(employeeId, gigId, positionId){
    var gigsPath = server + '/api/organizations/1/gigs';
    var pathAdd = gigsPath + '/' + gigId + '/staff/';

    return axios.post(pathAdd, {
        employeeId: employeeId,
        positionId: positionId,
        adminAccepted: false,
        workerAccepted: false,
    });
  },

  removeEmployeeFromGig: function(employeeId, gigId){
    var gigsPath = server + '/api/organizations/1/gigs';
    var pathDelete = gigsPath + '/' + gigId + '/staff/' + employeeId + '/';
    return axios.delete(pathDelete);
  },


  moveStaff: function(info){
    return ApiUtils.removeEmployeeFromGig(info.employeeId, info.fromGigId).then(function(res){
      return ApiUtils.addEmployeeToGig(info.employeeId, info.toGigId, info.toGroupId);
    });
  },

  getAvailableEmployees: function(date, callback){
    var path = server + '/api/organizations/1/employees';
    axios.get(path, {
      params: {
        date: date.format('YYYY-MM-DD')
      }
    }).then(function(res){
      return res.data;
    }).then(callback);
  },

  sendConfirmationEmails: function (gigInfo, callback) {
    var path = server + '/api/email/confirmation';

    axios.post(path, {
      gigId: gigInfo.id,
      organizationId: gigInfo.OrganizationId
    }).then(function (res) {
      // short-circuits if no emails are sent (response = 304)
      console.log("res:", res);
    }).then(callback);
  },

  getFreeAgents: function (positionDetails, callback) {
    var path = server + '/api/organizations/1/employees';
    axios.get(path, {
      params: {
        positionId: positionDetails.positionId,
        startTime: positionDetails.startTime,
        endTime: positionDetails.endTime,
        date: positionDetails.date.utcOffset(0).format('YYYY-MM-DD')
      }
    }).then(function (res) {
      return res.data;
    }).then(callback);
  }

};

module.exports = ApiUtils;
