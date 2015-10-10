var emailService = require('./email-service');
var _ = require('underscore');
var url = require('url');

module.exports = function(app, io){
  var models = app.get('models');
  var Gigs = models.Gig;
  var UserGigs = models.UserGigs;
  var Users = models.User;
  var Locations = models.Location;

  var emailController = {

    sendEmails: function (req, res) {
      var gigId = req.body.gigId;
      var gig;
      var location;
      var user;

      Gigs.getGigInfo(gigId).then(function (gigInfo) {
        gig = gigInfo;
        return Locations.getLocationInfo(gigInfo.LocationId);
      }).then(function (locationInfo) {
        location = locationInfo;
        return UserGigs.getUserGigs(gigId);
      }).then(function (userIds) {
        return models.sequelize.Promise.map(userIds, function (userId) {
          if(!userId.adminAccepted) {
            UserGigs.updateEmployeeStatus({ userId: userId.UserId, gigId: gigId }, { adminAccepted: true, employeeAccepted: false });
            return Users.getEmployeeEmail(userId.UserId);
          }
          return null;
        });
      }).then(function (userInfos) {
          var sent = false;
          _.each(userInfos, function (user) {
            if (user) {
              emailService.sendEmployeeConfirmationMessage(gig.toJSON(), user.toJSON(), location.toJSON());
              sent = true;
            }
          });
          return sent ? res.status(200).send('All email notifications have been sent') : res.sendStatus(304);
      }).catch(function (err) {
        console.log(err);
        res.sendStatus(400);
      });
    },

    handleResponse: function (req, res) {
      var url_parts = url.parse(req.url, true);
      var query = url_parts.query;
      var gigId = parseInt(query.gigId, 10);
      //userId has a / after it, haven't figured out why yet
      var userId = parseInt(query.userId.slice(0,-1), 10);
      var workerAccepted = query.confirmation === 'Yes';

      console.log(workerAccepted, userId, gigId);

      UserGigs.updateEmployeeStatus(
        {
          gigId: gigId,
          userId: userId
        },
        {
          workerAccepted: workerAccepted
        }
      ).then(function (result) {
        console.log('Successfuly updated employee acceptance response!');
        io.sockets.emit('email');
        res.redirect('confirmation.html');
      }).catch(function (err) {
        console.log('Error updating worker accepted response');
        res.sendStatus(404);
      });
    }
  };

  return emailController;

};
