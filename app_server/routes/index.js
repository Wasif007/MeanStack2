var express = require('express');
var router = express.Router();
var ctrl_app=require('../controller/app');
/* GET home page. */
router.get('/', ctrl_app.index);

module.exports = router;
