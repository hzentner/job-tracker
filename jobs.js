var express = require('express')
var path = require('path')
var router = express.Router(); 
var mongojs = require('mongojs')
var db = mongojs('mongodb://hannah:hannah@ds044587.mlab.com:44587/jobsdb', ['jobs'])

router.get('/:user/jobs', function(req, res) {
  db.collection('jobs').find({username: req.params.user}).toArray(function(err, items){
    if(err) {
       res.send(err);
    }
    else {
      res.render('jobs.ejs', {jobs: items, username: req.params.user});
     }
  });
});

router.post('/:user/newjob', function(req, res) {
 var job = req.body;
 db.collection('jobs').save(job, function(err, job) {
   if (err)
      res.send(err);
    else {
       res.redirect('/joblist/' + req.params.user + '/jobs');
   }
});

});

router.post('/:user/delete/:id', function(req, res) {
  db.collection('jobs').remove({_id: mongojs.ObjectId(req.params.id)}, function(err, job){
     if (err)
       res.send(err);
     else {
       res.redirect('/joblist/' + req.params.user + '/jobs');
     }
   });
});

router.get('/:user/edit/:id', function(req, res) {
   db.collection('jobs').findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, item){
     if (err)
       res.send(err);
     else {
        res.render('singlejob.ejs', {job:item, username: req.params.user});
     }
   });
});

router.post('/:user/edit/:id', function(req, res) {
  db.collection('jobs').update({_id: mongojs.ObjectId(req.params.id)}, {username: req.body.username, company: req.body.company, jobtitle: req.body.jobtitle, appdate: req.body.appdate, contact: req.body.contact, stat: req.body.stat, notes: req.body.notes}, {}, function(err, job) {
   if (err)
      res.send(err);
   else {
     res.redirect('/joblist/' + req.params.user + '/jobs');
   }
});
});

router.get('/logout', function(req, res) {
   res.redirect('/');
});
 
 module.exports = router;
