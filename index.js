// var express = require('express'),
// app = express();

// app.use(express.static(__dirname  + '/dist'));

// app.get('/', function(req, res) {
//     res.sendfile('index.html', {root: __dirname })
// });
// var server = app.listen(process.env.PORT || 80);


var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/dist'));

// views is directory for all template files
// app.set('views', __dirname + '/views');
// app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  // response.render('pages/index');
  response.render('index');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


