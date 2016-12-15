var requests = require('request');
var apiOptions = {
server : "http://localhost:3000"
};

var renderingDetailPage=function(req,res,responseBodys)
{
    res.render('location-info', {
        title: responseBodys.name,
        pageHeader: {
            title: responseBodys.name
        },
        sidebar: {
            context: 'is on Nearby Location because it has accessible wifi and space to sit down with your laptop and get some work done.',
            callToAction: 'If you\'ve been and you like it - or if you don\'t - please leave a review to help other people just like you.'
        },
        location:responseBodys
    }); 
}
var renderingHomePage=function(req,res,responseBody)
{
    var message;
    if(!(responseBody instanceof Array)){
        responseBody=[];
        message="Api issue";
    }
    else if(!responseBody.length)
    {
        message="No content to display";
    }
    res.render('locations-list', {
        title: 'Nearby Location - find a place to work with wifi',
        pageHeader: {
            title: 'Nearby Location',
            strapline: 'Find places to work with wifi near you!'
        },
        sidebar: "Looking for wifi and a seat? Nearby Location helps you find places to work when out and about. Perhaps with coffee, cake or a pint? Let Nearby Location help you find the place you're looking for.",
        locations: responseBody,
        message:message
    });
}
/* GET 'home' page */
module.exports.homelist = function(req, res) {
    var requestOptions,specific_url;
    specific_url="/api/locations";
    requestOptions={
url : apiOptions.server + specific_url,
method : "GET",
json : {},
qs : {
lng : -0.7992599,
lat : 51.378091,
maxDistance : 20
}
    };

requests(requestOptions,function(err,response,body){
    var data;
    data=body;
if(response.statusCode===200 && data.length)
{
    for(var i=0;i<data.length;i++)
    {
        data[i].distance=_formatDistance(data[i].distance);
    }
 }
    renderingHomePage(req,res,data);

});
    

};

var _formatDistance=function(distance_toFormat)
{
    var updated,units;
    if(distance_toFormat>1)
    {
        updated=parseFloat(distance_toFormat).toFixed(1);
        units=" Km";
    }
    else{
        updated=parseFloat(distance_toFormat*1000,10);
        units=" m";
    }
return updated+units;

}

var _sendDetailError=function(res,req,responseq)
{
    var title, content;
if (responseq === 404) {
title = "404, page not found";
content = "Oh dear. Looks like we can't find this page. Sorry.";
} else {
title = responseq + ", something's gone wrong";
content = "Something, somewhere, has gone just a little bit wrong.";
}
res.status(responseq);
res.render('generic-text', {
title : title,
content : content
});
};


/* GET 'Location info' page */
module.exports.locationInfo = function(req, res) {
  var requestOptions,specific_url;
    specific_url="/api/locations/"+req.params.locationid;
    requestOptions={
url : apiOptions.server + specific_url,
method : "GET",
json : {}
    };

requests(requestOptions,function(err,response,body){
    if(response.statusCode===200){
    var data;
    data=body;
    data.coord={
        lng:body.coord[0],
lat:body.coord[1]
    }
   renderingDetailPage(req,res,data);
   }
   else{
    _sendDetailError(res,req,response.statusCode);
   }
});
}

var renderingReviewPage=function(req,res,bodys)
{
    res.render('location-review-form', {
        title: 'Review ' +bodys.name+' on Nearby Location',
        pageHeader: {
            title: 'Review'+bodys.name
        },
        error: req.query.err
    });
}
/* GET 'Add review' page */
module.exports.addReview = function(req, res) {
      var requestOptions,specific_url;
    specific_url="/api/locations/"+req.params.locationid;
    requestOptions={
url : apiOptions.server + specific_url,
method : "GET",
json : {}
    };

requests(requestOptions,function(err,response,body){
    if(response.statusCode===200){
    var data;
    data=body;
    data.coord={
        lng:body.coord[0],
lat:body.coord[1]
    }
    renderingReviewPage(req,res,data);
   }
   else{
    _sendDetailError(res,req,response.statusCode);
   }
});
   
};

module.exports.updateReview=function(req,res)
{  var requestOptions, path, locationid, postdata;
  locationid = req.params.locationid;
  path = "/api/locations/" + locationid + '/reviews';
  postdata = {
    author: req.body.name,
    rating: parseInt(req.body.rating, 10),
    reviewText: req.body.review
  };
  requestOptions = {
    url : apiOptions.server + path,
    method : "POST",
    json : postdata
  };
  if (!postdata.author || !postdata.rating || !postdata.reviewText) {
    res.redirect('/location/' + locationid + '/reviews/new?err=val');
  } else {
    requests(
      requestOptions,
      function(err, response, body) {
        if (response.statusCode === 201) {
          res.redirect('/location/' + locationid);
        } else if (response.statusCode === 404 && body.name && body.name === "ValidationError" ) {
          res.redirect('/location/' + locationid + '/reviews/new?err=val');
        } else {
          console.log(body);
          _showError(req, res, response.statusCode);
        }
      }
    );
  }
}