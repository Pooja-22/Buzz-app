/**
 * Created by pooja on 10/3/16.
 */

var config = require('../../config/environment');

var mailgun = require('mailgun-js')(config.mailgun);
var request = require('request');


exports.mailgun = function (data) {
  if (data.image.path) {
    var file = request(data.image.path);

  }

  switch (data.status) {

    case 'Open' :
      var mailDetails = {
        from: 'Admin <Pooja@tothenew.mailgun.org>',
        to: data.postedBy.email,
        subject: 'Complaint Registered',
        text: 'Hi' + " " + data.postedBy.name + "," +
        "\n\n" + "We have received your complaint about" + " " + "for" + " " + data.department + " " + "department" + "."  +"\n\n"
        + "Thank you for letting us know of your concern, you will hear from us again no later than 2 days." + "\n\n"
        + "Regards," + "\n" + "Admin",
        attachment: file
      };
      var mailToAdmin = {
        from: 'Admin <Pooja@tothenew.mailgun.org>',
        to: 'pooja.garg@tothenew.com',
        subject: 'Complaint Registered',
        text: data.postedBy.name +" " + "(" + data.postedBy.email + ")" + " " + "filed a complaint for" + " " + data.department + " " + "Department" +  "\n\n" + "Complaint:" + " " + data.complaintText,
        attachment: file
      };
      break;

    case 'In Progress' :
      var mailDetails = {
        from: 'Admin <Pooja@tothenew.mailgun.org>',
        to: data.postedBy.email,
        subject: 'Complaint In Progress',
        text:'Hi' + " " + data.postedBy.name + "," +
        "\n\n" + "The complaint you registered on " + " " + data.createdOn + " " + "is now assigned to" + " " + data.assignedTo.name + "." + "\n\n"
        + "Your complaint will be resolved in 3 days." + "\n\n" + "Regards," + "\n" + "Admin"
      };
      var mailToAdmin = {
        from: 'Admin <Pooja@tothenew.mailgun.org>',
        to: data.assignedTo.email,
        subject: 'Complaint In Progress',
        text: data.postedBy.name + " " + "(" + data.postedBy.email + ")" + " " + "filed a complaint for" + " " + data.department + " " +"Department" + " " + "is now assigned to you."+
        "\n\n" + "Complaint:" + " " + data.complaintText + "\n\n" + "Regards \n Admin",
        attachment : file
      };
      break;

    case 'Cancel' :
      var mailDetails = {
        from: 'Admin <Pooja@tothenew.mailgun.org>',
        to: data.postedBy.email,
        subject: 'Complaint Cancelled',
        text:'Hi' + " " + data.postedBy.name + "," +
        "\n\n" + "The complaint you registered is now cancelled." + "\n\n" + "Regards," + "\n" + "Admin"
      };
      if(data.assignedTo){
        var mailToAdmin = {
          from: 'Admin <Pooja@tothenew.mailgun.org>',
          to: data.assignedTo.email,
          subject: 'Complaint Cancelled',
          text: data.postedBy.name + " " + "(" + data.postedBy.email + ")" + " " + "(" + data.postedBy.email + ")" + " " + "cancelled the complaint."
        };
      }
      else{
        var mailToAdmin = {
          from: 'Admin <Pooja@tothenew.mailgun.org>',
          to: "pooja.garg@tothenew.com",
          subject: 'Complaint Cancelled',
          text: data.postedBy.name + " " + "cancelled the complaint."
        };
      }

      break;
    case 'Closed' :
      var mailDetails = {
        from: 'Admin <Pooja@tothenew.mailgun.org>',
        to: data.postedBy.email,
        subject: 'Complaint Closed',
        text:'Hi' + " " + data.postedBy.name + "," +
        "\n\n" + "Your complaint is now close, hope your are isues are resolved now.\n" + "If you get issues in future again, feel free to Re-Open the complaint"
        + "\n\n"
        + "Regards," + "\n" + "Admin"      };
      var mailToAdmin = {
        from: 'Admin <Pooja@tothenew.mailgun.org>',
        to:'pooja.garg@tothenew.com',
        subject: 'Complaint Closed',
        text: data.postedBy.name + " " + "(" + data.postedBy.email + ")" +" closed the complaint."
      };
      break;

    case 'Resolved' :
      var mailDetails = {
        from: 'Admin <Pooja@tothenew.mailgun.org>',
        to: data.postedBy.email,
        subject: 'Complaint Resolved',
        text:'Hi' + " " + data.postedBy.name + "," +
        "\n\n" + "The complaint you registered on " + " " + data.createdOn + " " + "is now resolved.\n\nKindly look into it and close it if you are satisfied." + "\n\n" + "Regards," + "\n" + "Admin"
      };
      var mailToAdmin = {
        from: 'Admin <Pooja@tothenew.mailgun.org>',
        to: data.assignedTo.email,
        subject: 'Complaint Resolved',
        text: "The complaint registered by " + data.postedBy.name + " " + "(" + data.postedBy.email + ")" + " is now resolved."
      };
      break;

    case 'Re-Open' :
      var mailDetails = {
        from: 'Admin <Pooja@tothenew.mailgun.org>',
        to: data.postedBy.email,
        subject: 'Complaint Re-open',
        text: 'Hi' + " " + data.postedBy.name + "," +
        "\n\n" + "You have Re-Opened your complaint, we will look into this issue again.\n\nWe will get back to you in 2 days and sorry for the inconvenience."
        + "\n\n" + "Regards," + "\n" + "Admin"
      };
      var mailToAdmin = {
        from: 'Admin <Pooja@tothenew.mailgun.org>',
        to: 'pooja.garg@tothenew.com',
        subject: 'Complaint Re-open',
        text: data.postedBy.name + " " + "(" + data.postedBy.email + ")" + " Re-open the complaint"
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
