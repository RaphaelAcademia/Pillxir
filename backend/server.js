var express = require('express'),
  app = express(),
  port = process.env.PORT || 3001;
  mongoose = require('mongoose'),
  Receipt = require('./api/Model.js'), // Created model loading here
  bodyParser = require('body-parser'),
  fileUpload = require('express-fileupload'),
  cors = require('cors'),
  parser = require('./parser/parser'),
  chokidar = require('chokidar');
  
// Mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/ReceiptDB', { 
	useNewUrlParser: true,
	useUnifiedTopology: true 
}); 

// To clear database
//mongoose.connection.collection('receipts').drop();

// Enable files upload
app.use(fileUpload({
  createParentPath: true
}));

// Dependencies
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

// Looks at the uploads directory to check if a file has been added
 // One-liner for current directory
 chokidar.watch('./uploads').on('add', path => {
  
  parser.parseText(path);
  
  });




