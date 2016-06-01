var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();
var message = require('./models/message');
var upimg = require('./models/upimg');
var hbs = require('hbs');
var multer = require('multer');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/img/')
  },
  filename: function (req, file, cb) {
  	
    cb(null, file.originalname);
  }
})
var upload = multer({ storage: storage });

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//指定模板的后缀名为html
app.set('view engine', 'html');
app.set("views", path.join(__dirname + "/views"));

//运行hbs模块
app.engine('html', hbs.__express);

hbs.registerPartials(__dirname + '/views/partials');

app.set('port',process.env.PORT||3000);

app.use(express.static(__dirname + '/public'));


app.get('/', function(req, res){
	res.render('index', {layout: 'layouts/layout.html'});
});

app.get('/blogl.html', function(req, res){
	res.render('blogl', {layout: 'layouts/layout.html'});
});

app.get('/about.html', function(req, res){
	res.render('about', {layout: 'layouts/main.html'});
});

app.get('/contact.html', function(req, res) {
	message.messageJSON(function(obj) {
		var datajson = [];
		for (var i = 0; i < 4; i++) {
			datajson[i] = [];
		};
		for (var i = 0; i  < obj.length; i = i+4) {
			datajson[0].push(obj[i]);
			datajson[1].push(obj[i+1]);
			datajson[2].push(obj[i+2]);
			datajson[3].push(obj[i+3]);	
		}
		console.log(datajson);                                                   
		res.render('contact',{
			layout: 'layouts/main.html',
			data: obj,
			datajson: datajson
		});
	})
});

app.get('/resume.html', function(req, res){
	res.render('index', {layout: 'layouts/main.html'});
});

app.get('/blogedit.html', function(req, res){
	res.render('blogedit', {layout: 'layouts/main.html'});
});

app.post('/models/message',message.Add);//增加留言

//获取文章
app.get('/post/:title', function(req, res) {
	console.log(req.params.title)//cardtitle
	

});

//增加文章
app.post('/blogAdd', function(req, res){
	console.log(req.body);
});

app.post('/uploadimg', upload.single('file'),function(req, res, next){
	res.json({
		success: true
	})
});

app.listen(app.get('port'),function(){
	console.log('Express started on http://localhost:'+app.get('port')+';press Ctrl-c to terminate.');
});


