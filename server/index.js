const express = require('express');
const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost/url-shortner";
const bodyParser = require('body-parser');

//Connect to MongoDB
mongoose.Promise = global.Promise;
mongoose.set('debug', true);
const connectOptions = { 
  keepAlive: true, 
  reconnectTries: Number.MAX_VALUE 
}; 
mongoose.connect(mongoURI, connectOptions, (err, db) => 
{ 
  if (err) console.log(`Error`, err); 
  console.log(`Connected to MongoDB`); 
}); 

require('./models/UrlShorten');
const app = express();

app.use(bodyParser.json());
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-type,Accept,x-access-token,X-Key');
  if (req.method == 'OPTIONS') {
    res.status(200).end();
  } else {
    next();
  }
});
require('./routes/urlshorten')(app);

const PORT = 7000;
app.listen(PORT, () => {
  console.log(`Server started on port`, PORT);
});