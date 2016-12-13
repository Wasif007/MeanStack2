var mongoose = require('mongoose');
var location=mongoose.model('Location');
var sendingResponse = function(res, status, content) {
res.status(status);
res.json(content);
};

module.exports.locationsListByDistance=function(req,res){
sendingResponse(res,200,{"status":"success"});
}

module.exports.locationReadOne=function(req,res)
{
	if(req.params && req.params.locationid)
	{
	location.findById(req.params.locationid).exec(function(err,locationfound){
if(!locationfound)
{
sendingResponse(res,404,{"status":"no object of such id exists"});
return;	
}
else if(err)
{

sendingResponse(res,404,err);
return;	
}
sendingResponse(res,200,locationfound);
	});	
	}
	else{
		sendingResponse(res,{"status":"Parameter not found"},404);
	}
	

}

module.exports.locationCreate=function(req,res){
sendingResponse(res,200,{"status":"success"});
}

module.exports.locationUpdateOne=function(req,res){
sendingResponse(res,200,{"status":"success"});
}

module.exports.locationDeleteOne=function(req,res){
sendingResponse(res,200,{"status":"success"});
}