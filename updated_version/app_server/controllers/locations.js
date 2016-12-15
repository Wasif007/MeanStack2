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
            context: 'is on Loc8r because it has accessible wifi and space to sit down with your laptop and get some work done.',
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
        title: 'Loc8r - find a place to work with wifi',
        pageHeader: {
            title: 'Loc8r',
            strapline: 'Find places to work with wifi near you!'
        },
        sidebar: "Looking for wifi and a seat? Loc8r helps you find places to work when out and about. Perhaps with coffee, cake or a pint? Let Loc8r help you find the place you're looking for.",
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

/* GET 'Add review' page */
module.exports.addReview = function(req, res) {
    res.render('location-review-form', {
        title: 'Review Starcups on Loc8r',
        pageHeader: {
            title: 'Review Starcups'
        }
    });
};