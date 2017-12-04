var express = require('express')
var path = require('path')

var app = express()
var index = require('./index');

app.get('/jobs', function(req, res) {
  res.sendFile(path.join(__dirname + '/jobs.html'));
});

app.use('/', index);

app.listen(3000);

console.log("Server started on port 3000");


