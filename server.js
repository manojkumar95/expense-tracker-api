const express = require('express');
const app = express();
const bodyParser = require('body-parser');
//CORS middleware
const allowCrossDomain = function(req, res, next) {
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
const loadDataConfig = require('./app/migration/load.data.js');

// Connecting to the database
mongoose.connect(dbConfig.url,)
  .then(() => {
    console.log("Successfully connected to MongoDB.");
    loadDataConfig.loadInitialData();
  }).catch(err => {
    console.log('Could not connect to MongoDB.');
    process.exit();
  });

require('./app/routes/index.js')(app);
require('./app/routes/user.routes.js')(app);
require('./app/routes/category.routes.js')(app);
require('./app/routes/expense.routes.js')(app);

// Create a Server
const server = app.listen(8081, function () {

  const host = server.address().address
  const port = server.address().port

  console.log("App listening at http://%s:%s", host, port)
})
