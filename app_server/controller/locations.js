module.exports.homeindex=function(req,res)
{
  res.render('list-location', { title: 'Home Page' });

}
module.exports.locationinformation=function(req,res)
{
  res.render('locations', { title: 'Loaction Information Page' });

}
module.exports.reviews=function(req,res)
{
  res.render('review-page', { title: 'Reviews Page' });

}
