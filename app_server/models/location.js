var mongoose=require('mongoose');

var openingHoursSchema=new mongoose.Schema({
days:{type:String,required:true},
opening:String,
closing:String,
closed:{type:Boolean,required:true}
});

var reviewsSchema=new mongoose.Schema({
author:String,
rating:{type:Number,"default":0,min:0,max:5,
reviewText:String,
timestamp:{type:Date,"default":Date.now()}}
});

var locationSchema=new mongoose.Schema({
	name:{type:String,required:true},
	address:String,
	rating:{type:Number,"default":0,min:0,max:5},
	facilites:[String],
	coord:{type:[Number],index:"2dsphere"},
	reviews:[reviewsSchema],
	openingHours:[openingHoursSchema]

});

mongoose.model('Location',locationSchema);