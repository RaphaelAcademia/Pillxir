var express = require('express'),
  app = express(),
  port = process.env.PORT || 3001;
  mongoose = require('mongoose'),
  Receipt = require('./api/Model.js'), // Created model loading here
  bodyParser = require('body-parser'),
  fileUpload = require('express-fileupload'),
  cors = require('cors');
  
// Mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/ReceiptDB', { 
	useNewUrlParser: true,
	useUnifiedTopology: true 
}); 

// enable files upload
app.use(fileUpload({
  createParentPath: true
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

var routes = require('./api/Routes.js'); // Importing route
routes(app); // Register the route

app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});

app.listen(port);

console.log('RESTful API server started on: ' + port);