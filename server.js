var express = require('express');
var app = express();
var bodyParser = require('body-parser');
//CORS middleware
var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
}
app.use(bodyParser.json())
app.use(allowCrossDomain);

// Configuring the database
const dbConfig = require('./app/config/mongodb.config.js');
const mongoose = require('mongoose');

// Connecting to the database
mongoose.connect(dbConfig.url,)
  .then(() => {
    console.log("Successfully connected to MongoDB.");
  }).catch(err => {
    console.log('Could not connect to MongoDB.');
    process.exit();
  });

require('./app/routes/index.js')(app);

// Create a Server
var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("App listening at http://%s:%s", host, port)
})
