var express = require('express')
var path = require('path')
var app = express()
var bodyParser = require('body-parser')

var index = require('./index');
var jobs = require('./jobs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/', index);
app.use('/joblist', jobs);
//app.use(express.static(__dirname + '/images'));

app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(express.static(__dirname + '/images'));
app.listen(process.env.PORT || 3000);

console.log("Server started on port 3000");


