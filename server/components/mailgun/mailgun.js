/**
 * Created by pooja on 10/3/16.
 */

var config = require('../../config/environment/development');

var mailgun = require('mailgun-js')(config.mailgun);

var data = {
  from: 'Admin <Pooja@tothenew.mailgun.org>',
  to: 'pooja.garg@tothenew.com',
  subject: 'Complaint Registered',
  text: 'Hey Pooja Garg your complaint is registered'
};

mailgun.messages().send(data, function (error, body) {
  console.log(body);
});
