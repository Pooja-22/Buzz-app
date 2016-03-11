/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var User = require('../api/user/user.model');

//User.find({role:'admin'}).remove(function() {
//  User.create({
//    provider: 'google',
//    name: 'Pooja Garg',
//    email: 'pooja.garg@tothenew.com',
//    role: 'admin'
//  }, {
//    provider: 'google',
//    role: 'admin',
//    name: 'Prateek',
//    email: 'prateek@tothenew.com'
//  }, function() {
//      console.log('finished populating users');
//    }
//  );
//});
