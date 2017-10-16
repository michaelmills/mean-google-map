var mongoose    = require('mongoose');
var User        = require('./model');

// Opens App Routes
module.exports = function(app){
    app.get('/users', function(req, res){
        var query = User.find({});
        query.exec(function(err, users){
            if (err){
                res.send(err);
            }

            res.json(users);
        });
    });

    app.post('/users', function(req, res){
        var newUser = new User(req.body);

        newUser.save(function(err){
            if (err){
                res.send(err);
            }
            console.log("posted user: " + req.body);
            res.json(req.body);
        });
    });
};