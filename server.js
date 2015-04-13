// Require our dependencies
var express = require('express'),
  http = require('http'),
  mongoose = require('mongoose'),
  routes = require('./routes'),
  config = require('./config'),
  tweetHandler = require('./modules/utils/twitterHandler');

// Create an express instance and set a port variable
var app = express();
var port = process.env.PORT || 8080;

//Set html as the templating engine
app.set('view options', { layout: false });
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.set('views', __dirname + '/public');


// Connect to our mongo database
mongoose.connect('mongodb://localhost:27017/react-tweets');

// Index Route
app.get('/', routes.index);

// get Urls Count Route
app.get('/urlInfo', routes.urlInfo);

// get Url Tweets Route
app.get('/url/:url/tweets', routes.urlTweets);

// Set /public as our static content dir
app.use("/", express.static(__dirname + "/public/"));

// Fire this bitch up (start our server)
var server = http.createServer(app).listen(port, function() {
  console.log('Express server listening on port ' + port);
});

// Initialize socket.io
var io = require('socket.io').listen(server);


 //invoke the listener
 tweetHandler.streamTweets(io);

