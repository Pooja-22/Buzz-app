/**
 * Created by pooja on 10/3/16.
 */

'use strict';

var ComplaintService = require('./complaint.service');

/**
 *Get listing of complaints
 * * @param req
 * @param res
 */

exports.findComplaint = function (req, res) {
  var id = req.query.userId;
  ComplaintService.findComplaint(id, function (err, complaint) {
    if (err) {
      return HandleError(res, err);
    }
    else {
      return res.status(200).json(complaint);
    }
  })
};

/**
 *Save Complaint
 * @param req
 * @param res
 */

exports.createComplaint = function (req, res) {
  var userId = req.user._id;
  ComplaintService.createComplaint(userId, req.body, req.file, function (err, complaint) {
    if (err) {
      return HandleError(res, err);
    }
    else {
      return res.status(201).json(complaint);
    }
  })
};


/**
 *Edit complaint only by creator
 * @param req
 * @param res
 */

exports.editComplaint = function (req, res) {
  var id = req.params.id;
  var userId = req.user._id;
  console.log(req.body)
  ComplaintService.editComplaint(id, userId, req.body, function (err, complaint) {
      if (err) {
        return HandleError(res, err);
      }
      else {
        return res.status(201).json(complaint);
      }
    }
  )
};

/**
 * Error Handler
 * @param res
 * @param err
 * @returns {*}
 * @constructor
 */

function HandleError(res, err) {
  return res.status(500).send(err);
}
