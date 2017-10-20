const express     = require('express');
const User        = require('../models/user');

const router = express.Router();

// Opens router Routes
router.get('/users', (req, res) => {
  let query = User.find({});
  query.exec((err, users) => {
    if (err){
      res.send(err);
    }

    res.json(users);
  });
});

router.post('/users', (req, res) => {
  let newUser = new User(req.body);

  newUser.save((err) => {
    if (err){
      res.send(err);
    }
    console.log("posted user: " + req.body);
    res.json(req.body);
  });
});

router.post('/query', (req, res) => {
  // Grab all of the query parameters from the body.
  let lat             = req.body.latitude;
  let long            = req.body.longitude;
  let distance        = req.body.distance;
  let male            = req.body.male;
  let female          = req.body.female;
  let other           = req.body.other;
  let minAge          = req.body.minAge;
  let maxAge          = req.body.maxAge;
  let favLang         = req.body.favlang;
  let reqVerified     = req.body.reqVerified;

  let query = User.find({});

  if(distance){
    query = query.where('location').near({ center: {type: 'Point', coordinates: [long, lat]},
      maxDistance: distance * 1609.34, spherical: true}); // converting meters to miles
  }

  if(male || female || other){
    query.or([{'gender': male}, {'gender': female}, {'gender': other}]);
  }

  if(minAge){
    query = query.where('age').gte(minAge);
  }

  if(maxAge){
    query = query.where('age').lte(maxAge);
  }

  if(favLang){
    query = query.where('favlang').equals(favLang);
  }

  if(reqVerified){
    query = query.where('htmlverified').equals("Yep {Thanks for giving us real data!");
  }

  query.exec((err, users) => {
    if(err){
      res.send(err);
    }

    res.json(users);
  });
});

module.exports = router;
