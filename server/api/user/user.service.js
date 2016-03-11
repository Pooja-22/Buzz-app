/**
 * Created by pooja on 29/2/16.
 */

var User = require('./user.model');

/**
 *Get the user
 * @param query
 * @param callback
 */

exports.find = function (query, callback) {
  User.findOne(query, function (err, user) {
    callback(err, user);
  });
};

/**
 * Get list of users
 */

exports.getUsers = function (callback) {
  User.find({role:'admin'}, 'name email', function (err, users) {
    callback(err, users);
  });
};

/**
 *Find user and update it, used by passport.js
 * @param id
 * @param data
 * @param callback
 */

exports.createAndUpdate = function (id, data, callback) {
  User.findOneAndUpdate({'google.id': id}, data, {upsert: true}, function (err, user) {
    callback(err, user);
  });
};
