module.exports.abouts=function(req,res)
{
  res.render('about-page', { title: 'About page' ,
pageHeader:{
	title:"About Page",
	content:" Loc8r was created to help people find places to sit down and get a bit of work done.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sed lorem ac nisi dignissim accumsan."
	
}
});

}