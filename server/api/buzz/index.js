/**
 * Created by pooja on 29/2/16.
 */

'use strict';

var express = require('express');
var controller = require('./buzz.controller');
var auth = require('../../auth/auth.service');
var multer = require('multer');
var upload = multer({dest: 'uploads/'});
var router = express.Router();

router.get('/', controller.findBuzz);
router.post('/', auth.isAuthenticated(), upload.single('file'), controller.createBuzz);
router.delete('/:id', auth.isAuthenticated(), controller.deleteBuzz);
router.delete('/:id/:commentId', auth.isAuthenticated(), controller.deleteBuzz);
router.put('/:id', auth.isAuthenticated(), controller.editBuzz);
router.put('/:id/:commentId', auth.isAuthenticated(), controller.editBuzz);


module.exports = router;



