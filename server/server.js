const express         = require('express');
const mongoose        = require('mongoose');
const morgan          = require('morgan');
const bodyParser      = require('body-parser');

const port            = process.env.PORT || 3000;
const app             = express();

const routes = require('./routes/api');

// body parsers for POST
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(morgan('dev')); // logging tool

// app.use(express.static(__dirname + '/dist')); // static path set to dist

// app.use('/scripts', express.static(__dirname + '/node_modules'));

app.use('/api', routes); // set up routes

mongoose.connect("mongodb://localhost/MeanMapApp"); // connect mongodb

//Listen
app.listen(port);
console.log('App listening on port ' + port);
