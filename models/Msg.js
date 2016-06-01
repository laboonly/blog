var mongodb = require('./mongodb');

var Schema=mongodb.mongoose.Schema;

var MessageSchema = new Schema({
	message: String,
	name: String,
	imgname: String,
	vMon: Number,
	vDay: Number,
	h: Number,
	m: Number,
	city: String
});

var Message = mongodb.mongoose.model('Message', MessageSchema); 

var MessageDAO = function(){};

MessageDAO.prototype.save = function(obj,callback) {
	var msg = new Message(obj);  
	msg.save(function(err){
		callback(err);
	});
};

MessageDAO.prototype.findall = function(callback){
	return Message.find({}).sort({'_id': -1}).exec(callback);
};

module.exports = new MessageDAO;