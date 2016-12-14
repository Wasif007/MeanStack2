var mongoose = require('mongoose');
var Loc = mongoose.model('Location');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};


var doAddReview=function(res,req,response){
  if(response){
response.reviews.push({
author: req.body.author,
rating: req.body.rating,
reviewText: req.body.reviewText
});

response.save(function(err,locationdocument){
if(err){
  sendJSONresponse(res,404,err);
  return;
}
else{
  var reviewToShow;
  reviewToShow=response.reviews[response.reviews.length-1];
  changeRating(response._id);
  sendJSONresponse(res,201,reviewToShow);
}
});
  }
else{
  sendJSONresponse(res,404,{"message":"not found location"});

}
};

var changeRating=function(locationFounds){
Loc.findById(locationFounds).select('rating reviews').exec(function(err,response){
if(!err)
{
  doAverageRating(response);
}
});  

};

var doAverageRating=function(locationzDocument){
var ratingTotal=0;
var currentRating,i;
var ratingAvg=0;

if(locationzDocument.reviews && locationzDocument.reviews.length>0){
for(var j=0;j<locationzDocument.reviews.length;j++)
{
  ratingTotal=ratingTotal+locationzDocument.reviews[j].rating;
  console.log(ratingTotal);
}
ratingAvg=parseInt(ratingTotal/locationzDocument.reviews.length,10);
locationzDocument.reviews.rating=ratingAvg;

locationzDocument.save(function(err,res){
  if(!err)
  {
    console.log("Average rating updated to", ratingAvg);
  }
  else{
    console.log(err);
  }
})
}
};

/* POST a new review, providing a locationid */
/* /api/locations/:locationid/reviews */
module.exports.reviewsCreate = function(req, res) {
 var location_req=req.params.locationid;
 if(location_req)
 {
Loc.findById(location_req).select("reviews").exec(function(err,response){
if(err){
  sendJSONresponse(res,404,err);
  return;
}
else{
  doAddReview(res,req,response);
}
});
 }
 else{
  sendJSONresponse(res,404,"message:location id was not correct");
 }
};



module.exports.reviewsUpdateOne = function(req, res) {
  
};

module.exports.reviewsReadOne = function(req, res) {
  console.log("Getting single review");
  if (req.params && req.params.locationid && req.params.reviewid) {
    Loc
      .findById(req.params.locationid)
      .select('name reviews')
      .exec(
        function(err, location) {
          console.log(location);
          var response, review;
          if (!location) {
            sendJSONresponse(res, 404, {
              "message": "locationid not found"
            });
            return;
          } else if (err) {
            sendJSONresponse(res, 400, err);
            return;
          }
          if (location.reviews && location.reviews.length > 0) {
            review = location.reviews.id(req.params.reviewid);
            if (!review) {
              sendJSONresponse(res, 404, {
                "message": "reviewid not found"
              });
            } else {
              response = {
                location: {
                  name: location.name,
                  id: req.params.locationid
                },
                review: review
              };
              sendJSONresponse(res, 200, response);
            }
          } else {
            sendJSONresponse(res, 404, {
              "message": "No reviews found"
            });
          }
        }
    );
  } else {
    sendJSONresponse(res, 404, {
      "message": "Not found, locationid and reviewid are both required"
    });
  }
};

// app.delete('/api/locations/:locationid/reviews/:reviewid'
module.exports.reviewsDeleteOne = function(req, res) {

};
