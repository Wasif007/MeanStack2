
function sendingResponse(res,content,status)
{
	res.json(content)
	res.status(status);
}

module.exports.locationsListByDistance=function(req,res){
sendingResponse(res,{"status":"success"},200);
}

module.exports.locationReadOne=function(req,res)
{

}

module.exports.locationCreate=function(req,res){

}

module.exports.locationUpdateOne=function(req,res){

}

module.exports.locationDeleteOne=function(req,res){

}