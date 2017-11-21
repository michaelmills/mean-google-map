import * as express from 'express';
import * as mongoose from 'mongoose';
import * as morgan from 'morgan';
import * as bodyParser from 'body-parser';
import router from './routes/api';

const port            = process.env.PORT || 3000;
const app             = express();

// body parsers for POST
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(morgan('dev')); // logging tool

// app.use(express.static(__dirname + '/dist')); // static path set to dist

// app.use('/scripts', express.static(__dirname + '/node_modules'));

app.use('/api', router); // set up routes

mongoose.connect('mongodb://localhost/MeanMapApp', {
  useMongoClient: true
}); // connect mongodb

// Listen
app.listen(port);
console.log('App listening on port ' + port);
