var Msg = require('./Msg.js');
var mongodb = require('./mongodb');


exports.Add = function(req,res){
		
		var json = req.body;



		Msg.save(json, function(err){
			if(err){
				res.send({'success':false,'err':err});
			}else{
				res.send({'success':true});
			}
		});
};

exports.messageJSON = function(callback) {
	
	Msg.findall(function(err,obj){
		if(err) {
			console.log(err);
		}	
		callback(obj);
	});
	// Msg.findall(function(err,obj){
		
	// 	res.render('contact',{layout: 'layouts/main.html'} ,{
	// 		obj: obj
		
	// 	});
	// });

};