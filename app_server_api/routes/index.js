var express = require('express');
var router = express.Router();
var ctrl_location_api=require('../controller/locationss');
var ctrl_review_api=require('../controller/reviewss');
/* GET home page. */

//Locations
router.get('/location',ctrl_location_api.locationsListByDistance);
router.get('/location/:locationid',ctrl_location_api.locationsReadOne);
router.post('/location',ctrl_location_api.locationsCreate);
router.put('/location/:locationid',ctrl_location_api.locationsUpdateOne);
router.delete('/location/:locationid',ctrl_location_api.locationsDeleteOne);

//Reviews
router.get('/location/:locationid/reviews/:reviewid',ctrl_review_api.reviewReadOne);
router.post('/location/:locationid/reviews',ctrl_review_api.createOne);
router.put('/location/:locationid/reviews/:reviewid',ctrl_review_api.updateOne);
router.delete('/location/:locationid/reviews/:reviewid',ctrl_review_api.deleteOne);


module.exports = router;
