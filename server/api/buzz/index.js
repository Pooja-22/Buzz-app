/**
 * Created by pooja on 29/2/16.
 */
'use strict';

var express = require('express');
var controller = require('./buzz.controller');
var auth = require('../../auth/auth.service');
var router = express.Router();

router.get('/', controller.find);
router.post('/', auth.isAuthenticated(), controller.createBuzz);
router.delete('/:id', auth.isAuthenticated(), controller.deleteBuzz);
router.put('/:id', auth.isAuthenticated(), controller.editBuzz);

module.exports = router;



