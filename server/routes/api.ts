import * as express from 'express';
import User from '../models/user';

const router = express.Router();

// Opens router Routes
router.get('/users', (req, res) => {
  console.log(`Received GET '/users' request: ${JSON.stringify(req.body)}`);

  const query = User.find({});
  query.exec((err, users) => {
    if (err) {
      res.send(err);
    }

    res.json(users);
  });
});

router.post('/users', (req, res) => {
  console.log(`Received POST '/users' request: ${JSON.stringify(req.body)}`);

  const newUser = new User(req.body);

  newUser.save((err) => {
    if (err) {
      res.send(err);
    }

    console.log(`Stored user: ${JSON.stringify(req.body)}`);

    res.json(req.body);
  });
});

router.post('/query', (req, res) => {
  console.log(`Received POST '/query' request: ${JSON.stringify(req.body)}`);

  // Grab all of the query parameters from the body.
  const lat             = req.body.latitude;
  const long            = req.body.longitude;
  const distance        = req.body.distance;
  const male            = req.body.male;
  const female          = req.body.female;
  const other           = req.body.other;
  const minAge          = req.body.minAge;
  const maxAge          = req.body.maxAge;
  const favLang         = req.body.favlang;
  const reqVerified     = req.body.reqVerified;

  let query = User.find({});

  if (distance) {
    query = query.where('location').near({ center: {type: 'Point', coordinates: [long, lat]},
      maxDistance: distance * 1609.34, spherical: true}); // converting meters to miles
  }

  if (male || female || other) {
    query.or([{'gender': male}, {'gender': female}, {'gender': other}]);
  }

  if (minAge) {
    query = query.where('age').gte(minAge);
  }

  if (maxAge) {
    query = query.where('age').lte(maxAge);
  }

  if (favLang) {
    query = query.where('favlang').equals(favLang);
  }

  if (reqVerified) {
    query = query.where('htmlverified').equals('Yep {Thanks for giving us real data!');
  }

  query.exec((err, users) => {
    if (err) {
      res.send(err);
    }

    res.json(users);
  });
});

export default router;
