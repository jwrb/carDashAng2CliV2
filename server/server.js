require('rootpath')();
var express      = require('express');
var path         = require('path');
var favicon      = require('serve-favicon');
var logger       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var mongoose     = require('mongoose');
var config       = require('./config');
var app          = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, '/../dist')));
app.set('mongo_uri', (process.env.MONGO_URI || config.db.url))
mongoose.connect(app.get('mongo_uri'));
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongo db connection error:'));
db.once('open', function() {
  console.log('mongo db is connected!');
});

app.use('/api/v1/auth', require('./api/authApi'));
app.use('/api/v1/purchase', require('./api/purchaseApi'));
app.use('/api/v1/user', require('./api/userApi'));

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, '/../dist/index.html'));
});

app.use(function(req, res, next) {
  var err    = new Error('Not Found');
  err.status = 404;
  next(err);
});


app.set('port', (process.env.PORT || config.server.listenPort));
app.listen(app.get('port'), function() {
  console.log('Example app listening on port ' + app.get('port'));
});

module.exports = app;