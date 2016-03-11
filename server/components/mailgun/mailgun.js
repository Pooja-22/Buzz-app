/**
 * Created by pooja on 10/3/16.
 */

var config = require('../../config/environment');

var mailgun = require('mailgun-js')(config.mailgun);


exports.mailgun = function (data) {
  switch (data.status) {

    case 'Open' :
      var mailDetails = {
        from: 'Admin <Pooja@tothenew.mailgun.org>',
        to: data.postedBy.email,
        subject: 'Complaint Registered',
        text: "Open"
      };
      var mailToAdmin = {
        from: 'Admin <Pooja@tothenew.mailgun.org>',
        to:'pooja.garg@tothenew.com',
        subject: 'Complaint Registered',
        text: "Open"
      };
      break;

    case 'In Progess' :
      var mailDetails = {
        from: 'Admin <Pooja@tothenew.mailgun.org>',
        to: data.postedBy.email,
        subject: 'Complaint Registered',
        text: "In Progress"
      };
      var mailToAdmin = {
        from: 'Admin <Pooja@tothenew.mailgun.org>',
        to:data.assignedTo.email,
        subject: 'Complaint Registered',
        text: "In Progress"
      };
      break;

    case 'Cancel' :
      var mailDetails = {
        from: 'Admin <Pooja@tothenew.mailgun.org>',
        to: data.postedBy.email,
        subject: 'Complaint Registered',
        text: "Cancel"
      };
      var mailToAdmin = {
        from: 'Admin <Pooja@tothenew.mailgun.org>',
        to:data.assignedTo.email,
        subject: 'Complaint Registered',
        text: "Cancel"
      };
      break;
    case 'Closed' :
      var mailDetails = {
        from: 'Admin <Pooja@tothenew.mailgun.org>',
        to: data.postedBy.email,
        subject: 'Complaint Registered',
        text: "Closed"
      };
      var mailToAdmin = {
        from: 'Admin <Pooja@tothenew.mailgun.org>',
        to:data.assignedTo.email,
        subject: 'Complaint Registered',
        text: "Closed"
      };
      break;

    case 'Resolved' :
      var mailDetails = {
        from: 'Admin <Pooja@tothenew.mailgun.org>',
        to: data.postedBy.email,
        subject: 'Complaint Registered',
        text: "Resolved"
      };
      var mailToAdmin = {
        from: 'Admin <Pooja@tothenew.mailgun.org>',
        to:data.assignedTo.email,
        subject: 'Complaint Registered',
        text: "Resolved"
      };
      break;

    case 'Re-Open' :
      var mailDetails = {
        from: 'Admin <Pooja@tothenew.mailgun.org>',
        to: data.postedBy.email,
        subject: 'Complaint Registered',
        text: "Re-Open"
      };
      var mailToAdmin = {
        from: 'Admin <Pooja@tothenew.mailgun.org>',
        to:data.assignedTo.email,
        subject: 'Complaint Registered',
        text: "Re-Open"
      };
      break;
  }

  /**
   * Mail to the Admin
   * @type {{from: string, to: *, subject: string}}
   */

  mailgun.messages().send(mailToAdmin, function (error, body) {
    console.log(body);
  });

  /**
   * Mail to the User who filed it
   * @type {{from: string, to: string, subject: string}}
   */

  mailgun.messages().send(mailDetails, function (error, body) {
    console.log(body);
  })
};
