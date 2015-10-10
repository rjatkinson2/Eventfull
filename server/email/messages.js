var moment = require('moment');

exports.sendConfirmationMessage = function(gigInfo, userInfo, locationInfo) {
  //Development 'yes' path
  var yesPath = 'http://localhost:8000/api/email/confirmation/response?' +
    'confirmation=' + encodeURIComponent('Yes') +
    '&gigId=' + encodeURIComponent(gigInfo.id) +
    '&userId=' + encodeURIComponent(userInfo.id);

  //Development 'no' path
  var noPath = 'http://localhost:8000/api/email/confirmation/response?' +
    'confirmation=' + encodeURIComponent('No') +
    '&gigId=' + encodeURIComponent(gigInfo.id) +
    '&userId=' + encodeURIComponent(userInfo.id);

  console.log(userInfo);

  //Will want to change email to actual users email
  var message = {
    'html': "<h3>Event Details</h3>\
    <ul>\
     <li>Hello " + userInfo.name + "</li>\
     <li>" + gigInfo.type + "</li>\
     <li>" + gigInfo.startTime + "</li>\
     <li>" + gigInfo.endTime + "</li>\
     <li>" + gigInfo.date + "</li>\
    </ul>\
    <ul>\
     <li>" + locationInfo.name + "</li>\
     <li>" + locationInfo.addressOne + "</li>\
     <li>" + locationInfo.addressTwo + "</li>\
     <li>" + locationInfo.city + "</li>\
     <li>" + locationInfo.state + "</li>\
     <li>" + locationInfo.zipCode + "</li>\
    </ul>\
    <h3>Confirm Availability</h3>\
    <a href=" + yesPath + "/>Yes</a></p>\
    <a href=" + noPath + "/>No</a></p>",

    'subject': "Catering Event Confirmation",
    'from_email': "cvsats2@gmail.com",
    'from_name': "Eventfull Team",
    'to': [{
            'email': "rjatkinson2@gmail.com",
            'name': "lo",
            'type': "to"
        }],
    'headers': {
        'Reply-To': "cvsats2@gmail.com"
    }
  };

  return message;

};


