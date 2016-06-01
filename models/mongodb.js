//链接mongodb
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/blogmsg');

exports.mongoose = mongoose;