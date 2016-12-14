var mongoose = require('mongoose');
var Loc = mongoose.model('Location');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

var theEarth = (function() {
  var earthRadius = 6371; // km, miles is 3959

  var getDistanceFromRads = function(rads) {
    return parseFloat(rads * earthRadius);
  };

  var getRadsFromDistance = function(distance) {
    return parseFloat(distance / earthRadius);
  };

  return {
    getDistanceFromRads: getDistanceFromRads,
    getRadsFromDistance: getRadsFromDistance
  };
})();

/* GET list of locations */
module.exports.locationsListByDistance = function(req, res) {
  var lng = parseFloat(req.query.lng);
  var lat = parseFloat(req.query.lat);
  var maxDistance = parseFloat(req.query.maxDistance);
  var point = {
    type: "Point",
    coordinates: [lng, lat]
  };
  var geoOptions = {
    spherical: true,
    maxDistance: theEarth.getRadsFromDistance(maxDistance),
    num: 10
  };
  if(!lng || !lat || !maxDistance)
  {
    sendJSONresponse(res,404,{"message":"missing parameters :Required lng lat and maxDistance"});
    return;
  }
  Loc.geoNear(point, geoOptions, function(err, results, stats) {
    if(err){
      sendJSONresponse(res,404,err);
      return;
    }
    var locations=[];
    results.forEach(function(object){
      console.log(object.obj);
      locations.push({
        distance:theEarth.getDistanceFromRads(object.dis),
        name:object.obj.name,
        address:object.obj.address,
        ratings:object.obj.rating,
        facilities:object.obj.facilities,
        _id:object.obj._id
      })
    });
    sendJSONresponse(res,200,locations);    
});

}
/* GET a location by the id */
module.exports.locationsReadOne = function(req, res) {
  console.log('Finding location details', req.params);
  if (req.params && req.params.locationid) {
    Loc
      .findById(req.params.locationid)
      .exec(function(err, location) {
        if (!location) {
          sendJSONresponse(res, 404, {
            "message": "locationid not found"
          });
          return;
        } else if (err) {
          console.log(err);
          sendJSONresponse(res, 404, err);
          return;
        }
        console.log(location);
        sendJSONresponse(res, 200, location);
      });
  } else {
    console.log('No locationid specified');
    sendJSONresponse(res, 404, {
      "message": "No locationid in request"
    });
  }
};

/* POST a new location */
/* /api/locations */
module.exports.locationsCreate = function(req, res) {
  console.log(req.body);
Loc.create({
name:req.body.name,
address:req.body.address,
coords:[parseFloat(req.body.lng),parseFloat(req.body.lat)],
openingTimes:[{
  opening:req.body.opening1,
  closing:req.body.closing1,
  days:req.body.days1,
  closed:req.body.closed1
}],
facilities: req.body.facilities.split(",")
},function(err,locationCreated){
  if(err){
sendJSONresponse(res,404,err);
return;
  }
  else{
sendJSONresponse(res,200,locationCreated);
  }
});
};

/* PUT /api/locations/:locationid */
module.exports.locationsUpdateOne = function(req, res) {
 
};

/* DELETE /api/locations/:locationid */
module.exports.locationsDeleteOne = function(req, res) {
 
};
