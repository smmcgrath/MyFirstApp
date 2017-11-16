var express = require('express');
var router = express.Router();
var Comment = require('../models/comments');

/* GET home page. */
    router.get('/', function(req, res, next) {
      res.render('index', { user_name: 'Express' });
    });


/* module.exports = router; */

/*
 * Adds messages to our database
 */
    router.post('/addComment', function(req, res, next) {
      //extract the request body which contains the messages
        comment = new Comment(req.body);
        comment.save(function (err, savedComment){
          if (err)
            throw err;

          res.json({
              "id": savedComment.id,
              "comment": savedComment.comment
          });
        });
    });

/*
 * Returns all comments from our database
 */
    router.get('/getComment', function(req, res, next){
        Comment.find({}, function (err, comments){
            if (err)
                res.send(err);

            res.json(comments);

            //setTimeout('/getComment',10000);

        }).sort({"date_created": -1})
    });

    router.get('/getComment/:id', function(req, res, next){
        var id = parseInt(req.params.id)
        Comment.findOne({_id: req.params.id}, function(err, comments){
            res.json(comments);
        });
    });

    router.delete('/delete/:id', function(req, res, next){

        Comment.remove({_id: req.params._id}, function(err){
            res.json({result: err ? 'error' : 'ok'});
        });
    });




    router.post('/delete/:id', function(req, res){
       Comment.findOne({_id: req.params.id}, function(err, comments){
           var user = comments;
           user.user_name = req.body.user_name;
           user.comment = req.body.comment;
           user.date_created = req.body.date_created;
           user.up_votes = req.body.up_votes;
           user.down_votes = req.body.down_votes;

           Comment.save(function(err, comments){
               if(err)
                   throw err;
               res.json(comments);
           });
       });
    });


module.exports = router;




