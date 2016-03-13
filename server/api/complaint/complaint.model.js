/**
 * Created by pooja on 10/3/16.
 */

'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ComplainSchema = new Schema({

  complaintText: {type: String, required: true},  //Complaint Text
  status: {type: String, default: 'Open'},  //Status of Complaint
  department: {type: String},   //Department--IT/Infrastructure/Other
  postedBy: {
    type: mongoose.Schema.Types.ObjectId, //User who filed complaint
    ref: 'User'
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId, //Admin
    ref: 'User'
  },
  image: {
    path: {type: String}
  },
  createdOn: {type: Date, default: Date.now()},
  complaintLog: [{
    status: {type: String, default: 'Open'},
    changedAt: {type: Date},
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId, //Admin
      ref: 'User'
    }
  }]


});


module.exports = mongoose.model('Complain', ComplainSchema);

