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
  ComplaintService.findComplaint(function (err, complaint) {
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
  ComplaintService.createComplaint(function (err, complaint) {
    if (err) {
      return HandleError(res, err);
    }
    else {
      return res.status(201).json(complaint);
    }
  })
};

/**
 *Delete Complaint only by creator of Complaint
 * @param req
 * @param res
 */

exports.deleteComplaint = function (req, res) {
  ComplaintService.deleteComplaint(function (err, complaint) {
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
  ComplaintService.editComplaint(function (err, complaint) {
    if (err) {
      return HandleError(res, err);
    }
    else {
      return res.status(201).json(complaint);
    }
  })
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
