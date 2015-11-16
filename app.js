var express = require('express');
var fs = require('fs');
var path = require('path');
var app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
	res.send(fs.readFileSync(path.join(__dirname, 'public/index.html')).toString());
});

app.get('/view', function (req, res) {
	res.send(fs.readFileSync(path.join(__dirname, 'public/view.html')).toString());
});

var number = 1;

app.get('/getNumber', function(req, res) {
	res.send(number.toString());
});

app.get('/next', function(req, res) {
	res.send('OK - ' + ++number);
});

app.get('/setNumber/:num', function(req, res) {
	var check = Number(req.params.num);
	if(check === undefined || Number.isNaN(check))
	{
		return res.status(400).send('Error - Bad Request');
	}
	number = check;
	res.send('OK - ' + number);
});

app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.send(err.status + ' - ' + err.message);
});

var server = app.listen(3000, function () {
	var host = server.address().address;
	var port = server.address().port;

	console.log('Take a Number listening on port %s', port);
});