var express = require('express')
var path = require('path')
var router = express.Router();
var pwhash = require('password-hash')
var mongojs = require('mongojs')
var db = mongojs('mongodb://hannah:hannah@ds044587.mlab.com:44587/jobsdb', ['users'])


router.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

router.post('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

router.post('/login', function(req, res) {
   db.collection('users').findOne({username: req.body.username}, function(err, user) {
  if (err)
     res.send(err);
  if (!user) {
    res.sendFile(path.join(__dirname + '/invalid.html'));  
}
  else {
     var pw = pwhash.verify(req.body.password, user.password);
     if (pw) 
       res.redirect('/joblist/' + req.body.username + '/jobs');
     else
       res.sendFile(path.join(__dirname + '/invalid.html'));
     
  }
  });
});

router.post('/register', function(req, res) {
   res.sendFile(path.join(__dirname + '/register.html')); 
});

router.post('/signup', function(req, res) {
   var user = req.body;
   var hashed = pwhash.generate(req.body.password);
   db.collection('users').save({email: req.body.email, username: req.body.username, password: hashed}, function(err, user) {
   if (err)
      res.send(err);
   else
      res.redirect('/joblist/' + req.body.username + '/jobs');
});
});

module.exports = router;
