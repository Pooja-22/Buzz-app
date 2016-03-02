'use strict';

var UserService = require('./user.service');
var passport = require('passport');
var config = require('../../config/environment');
var jwt = require('jsonwebtoken');

/**
 * Get my info
 */
exports.me = function (req, res) {
  var userId = req.user._id;
  UserService.find(userId, function (err, user) {
      if (err) return next(err);
      if (!user) return res.status(401).send("Unauthorized");
      res.json(user);
    }
  );
};

