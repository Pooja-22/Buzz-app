/**
 * Created by pooja on 10/3/16.
 */

'use strict';

var express = require('express');
var controller = require('./complaint.controller.js');
var auth = require('../../auth/auth.service.js');
var multer = require('multer');
var upload = multer({dest: 'uploads/complaints/'});
var router = express.Router();


router.get('/', controller.findComplaint);
router.post('/', auth.isAuthenticated(), upload.single('file'), controller.createComplaint);
router.delete('/:id', auth.isAuthenticated(), controller.deleteComplaint);
router.put('/:id', auth.isAuthenticated(), controller.editComplaint);


module.exports = router;


