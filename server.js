var express = require('express')
var path = require('path')
var app = express()
var bodyParser = require('body-parser')
//requirements for server

var index = require('./index');
var jobs = require('./jobs');
//require use of index.js and jobs.js

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
//bodyParser middelware

app.use('/', index);
app.use('/joblist', jobs);
//set up routes for index.js and jobs.js

app.set('view engine', 'ejs');
//set up appropriate template engine
app.use(express.static(__dirname + '/images'));
//static folder for images
app.listen(process.env.PORT || 3000);

console.log("Server started on port 3000");
//listen and start server
