var express = require('express');
var router = express.Router();
var ctrl_location=require('../controller/locations');
var ctrl_about=require('../controller/abouts');
/* GET home page. */

router.get('/', ctrl_location.homeindex);
router.get('/location',ctrl_location.locationinformation);
router.get('/location/review/new',ctrl_location.reviews);

router.get('/about',ctrl_about.abouts);

module.exports = router;
