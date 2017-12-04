var express = require('express')
var path = require('path')
var router = express.Router(); 
var mongojs = require('mongojs')
var db = mongojs('mongodb://hannah:hannah@ds044587.mlab.com:44587/jobsdb', ['jobs'])

router.get('/jobs', function(req, res) {
  db.collection('jobs').find().toArray(function(err, items){
    if(err) {
       res.send(err);
    }
    else {
      res.render('jobs.ejs', {jobs: items});
     }
  });
});

router.post('/newjob', function(req, res) {
 var job = req.body;
 db.collection('jobs').save(job, function(err, job) {
   if (err)
      res.send(err);
    else {
       res.redirect('/joblist/jobs');
   }
});

});

router.post('/delete/:id', function(req, res) {
   db.collection('jobs').remove({_id: mongojs.ObjectId(req.params.id)}, function(err, job){
     if (err)
       res.send(err);
     else {
       res.redirect('/joblist/jobs');
     }
   });
});
 
 module.exports = router;
