var express = require('express')
var path = require('path')
var router = express.Router();
var mongojs = require('mongojs')
var db = mongojs('mongodb://hannah:hannah@ds044587.mlab.com:44587/jobsdb', ['users'])

router.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

router.post('/login', function(req, res) {
   db.collection('users').findOne({username: req.body.username, password: req.body.password}, function(err, user) {
  if (err)
     res.send(err);
  if (user) {
    res.redirect('/joblist/jobs');
  }
  else {
     res.sendFile(path.join(__dirname + '/invalid.html'));
   }
});
});

module.exports = router;
