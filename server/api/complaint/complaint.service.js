/**
 * Created by pooja on 10/3/16.
 */

var Complaint = require('./complaint.model');
var Cloudinary = require('../../components/cloudinary/cloudinary');
var Mailgun = require('../../components/mailgun/mailgun');
var fs = require('fs');

/**
 *Get list of all complaints
 * @param callback
 */

exports.findComplaint = function (id, callback) {
  var query = {};
  if (id) {
    query = {postedBy: id};
  }
  Complaint.find(query).sort({createdOn: -1}).populate("postedBy").populate('assignedTo').exec(function (err, complaint) {
    callback(err, complaint);
  });

};

/**
 *Create Complaint
 * @param data
 * @param callback
 */

exports.createComplaint = function (id, data, fileDetail, callback) {
  if (!fileDetail) {
    data.postedBy = id;
    delete data.file;
    Complaint.create(data, function (err, complaint) {
      if (err) {
        helper.error(err)
      } else {
        Complaint.findById(complaint._id).populate('postedBy').exec(function (err, complaintPopulated) {
          callback(err, complaintPopulated);
          Mailgun.mailgun(complaintPopulated)
        })
      }
    })
  }
  else {
    Cloudinary.cloudinary(fileDetail, function (cloudData) {
      data.postedBy = id;
      data.image = {};
      data.image.path = cloudData.url;
      Complaint.create(data, function (err, complaint) {
        if (err) {
          helper.error(err)
        }
        else {
          Complaint.findById(complaint._id).populate('postedBy').exec(function (err, complaintPopulated) {
            fs.unlink(fileDetail.path);
            callback(err, complaintPopulated);
            Mailgun.mailgun(complaintPopulated)
          })
        }
      })
    });
  }
};

/**
 * Update Complaint --
 * @param callback
 */

exports.editComplaint = function (complaintId, userId, data, callback) {
  if(data.id){
    userId = data.id;
  }
  Complaint.findById(complaintId, function (err, complaint) {
    if (err) {
      callback(err);
    }
    else {
      complaint.status = data.status;
      complaint.assignedTo = userId;
      complaint.save(function (err, complaint) {
        Complaint.findById(complaint._id).populate('assignedTo').populate('postedBy').exec(function (err, complaintPopulated) {
          callback(err, complaintPopulated);
          Mailgun.mailgun(complaintPopulated);
        });
      })
    }
  });
};






