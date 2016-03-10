/**
 * Created by pooja on 10/3/16.
 */


var Complaint = require('./complaint.model');
var Cloudinary = require('../../components/cloudinary/cloudinary');
var fs = require('fs');


/**
 *Get list of all complaints
 * @param callback
 */

exports.findComplaint = function (callback) {
  Complaint.find({}), (function (err, complaint) {
    callback(err, complaint);
  });

};

/**
 *Create Complaint
 * @param data
 * @param callback
 */

exports.createComplaint = function (callback) {
  Complaint.create(function (err, complaint) {
    callback(err, complaint);
  })
}

/**
 *Delete Complaint
 * @param id
 * @param callback
 */

exports.deleteComplaint = function (callback) {
  Complaint.findById(id, function (err, complaint) {
    if (err) {
      callback(err);
    }
    else {
      Complaint.remove(complaint, function (err, complaint) {
        callback(err, complaint);
      })

    }
  })
};

/**
 * Update Complaint --
 * @param callback
 */

exports.editComplaint = function (callback) {
  Complaint.findById(function (err, complaint) {
    if (err) {
      callback(err);
    }
    else {
      complaint.save(function (err, complaint) {
        callback(err, complaint)
      })
    }
  });
};






