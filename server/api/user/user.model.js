'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  name: String, //UserName
  email: {type: String, lowercase: true}, //UserEmail
  role: {
    type: String,
    default: 'user' //Admin or User
  },
  provider: String, //google
  salt: String,
  google: {}
});


module.exports = mongoose.model('User', UserSchema);
