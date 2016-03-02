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
 *Find user and update it, called by passport.js
 * @param id
 * @param data
 * @param callback
 */
exports.createAndUpdate = function (id, data, callback) {
  User.findOneAndUpdate({'google.id': id}, data, {upsert: true}, function (err, user) {
    callback(err, user);
  });
};



