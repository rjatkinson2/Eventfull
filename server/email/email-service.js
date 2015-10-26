var mandrillAPI;

if (!process.env.MANDRILL_CLIENT) {
  mandrillAPI  = require('./config');
} else {
  mandrillAPI = process.env.MANDRILL_CLIENT;
}

var messages = require('./messages');

exports.sendEmployeeConfirmationMessage = function(gigInfo, userInfo, locationInfo) {
  var async = false;
  var message = messages.sendConfirmationMessage(gigInfo, userInfo, locationInfo);
  mandrillAPI.mandrill_client.messages.send({
    'message': message,
    'async': async
  }, function(result) {
       console.log('Email successfully sent!', result);
  }, function(error) {
       console.log('Mandrill email error occured!', error.name);
  });
};
