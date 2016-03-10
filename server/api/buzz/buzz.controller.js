/**
 * Created by pooja on 29/2/16.
 */

'use strict';

var BuzzService = require('./buzz.service');

/**
 *Get listing of Buzz
 * @param req
 * @param res
 */

exports.findBuzz = function (req, res) {
  var page = req.query.page;
  var perPage = req.query.perPage;
  var criteria = req.query.category;
  BuzzService.find(page, perPage, criteria, function (err, buzz) {
    if (err) {
      return HandleError(res, err);
    }
    else {
      return res.status(200).json(buzz);
    }
  })
};

/**
 *Save Buzz
 * @param req
 * @param res
 */

exports.createBuzz = function (req, res) {
  var userId = req.user._id;
  BuzzService.createBuzz(userId, req.body, req.file, function (err, buzz) {
    if (err) {
      return HandleError(res, err);
    }
    else {
      return res.status(201).json(buzz);
    }
  })
};

/**
 *Delete buzz only by creator of Buzz
 * @param req
 * @param res
 */

exports.deleteBuzz = function (req, res) {
  var id = req.params.id;
  var commentId = req.params.commentId;
  BuzzService.deleteBuzz(id, commentId, function (err, buzz) {
    if (err) {
      return HandleError(res, err);
    }
    else {
      return res.status(201).json(buzz);
    }
  })
};

/**
 *Edit buzz only by creator
 * @param req
 * @param res
 */

exports.editBuzz = function (req, res) {
  var id = req.params.id;
  var commentId = req.params.commentId;
  BuzzService.editBuzz(id, commentId, req.body, function (err, buzz) {
    if (err) {
      return HandleError(res, err);
    }
    else {
      return res.status(201).json(buzz);
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
