var mongoose = require('mongoose');
var locations=mongoose.model('Location');
var sendJsonResponse = function(res, status, content) {
res.status(status);
res.json(content);
};
function objToString (obj) {
    var str = '';
    for (var p in obj) {
        if (obj.hasOwnProperty(p)) {
            str += p + '::' + obj[p] + '\n';
        }
    }
    return str;
}
module.exports.reviewReadOne = function(req, res) {
    console.log('locationid = ' + req.params.locationid);
    console.log('reviewid = ' + req.params.reviewid);
    if (req.params && req.params.locationid && req.params.reviewid) {
        locations
            .findById(req.params.locationid)
            .select('name reviews')
            .exec (
                function(err, location) {
                    var response, review;
                    if (!location) {
                        sendJsonResponse(res, 404, {
                            "message" : "locationid not found"
                        });
                        return;
                    } else if (err) {
                        sendJsonResponse(res, 400, err);
                        return;
                    }
                    console.log('reviews = ' + location.reviews);
  // Note the rating here...
                    console.log('#0.rating = ', location.reviews[0].rating);
  // Note the id here...
                    console.log('#0.id = ', location.reviews[0].id);
                    if (location.reviews && location.reviews.length > 0) {
                        review = location.reviews.id(req.params.reviewid);
                        console.log('returned review = ' + review);
                        if (!review) {
                            sendJsonResponse(res, 404, {
                                "message" : "reviewid not found"
                            });
                        } else {
                            response = {
                                location: {
                                    name : location.name,
                                    id : req.params.locationid
                                },
                                review : review
                            };
                            sendJsonResponse(res, 200, response);
                        }
                    } else {
                        sendJsonResponse(res, 404, {
                            "message" : "No reviews found"
                        });
                    }
                }
            );
    } else {
        sendJsonResponse(res, 404, {
            "message" : "Not found, locationid and reviewid are both required"});       
    }
};

module.exports.createOne=function(req,res){
sendJsonResponse(res,200,{"status":"success"});
}

module.exports.updateOne=function(req,res){
sendJsonResponse(res,200,{"status":"success"});
}

module.exports.deleteOne=function(req,res){
sendJsonResponse(res,200,{"status":"success"});
}