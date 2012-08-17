/**
 * Module dependencies.
 */

var express = require('express')
  , exec = require('child_process').exec
  , useragent = require('express-useragent')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path')
  , hbs = require('hbs');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 8888);
  app.set('views', __dirname + '/views');
  app.engine('html', hbs.__express);
  app.set('view engine', 'html');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(useragent.express());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', function(req, res) {
  // Простенькое регулярное выражение для детектирования Гуглбота
  var seCraulersUA_Match = /Googlebot|\+http:\/\/www\.google\.com\/bot.html/gi;

  if (seCraulersUA_Match.test(req.useragent.source)) {
    console.log('>>> Search engine crawler detected! <<<');

    // Пропускаем запрашиваемую страницу через скрипт PhantomJS,
    // в ответ получаем отрендеренный HTML, который и скармливаем Гуглботу
    exec('phantomjs proxy.js http://' + req.headers.host, function(error, stdout) {
      res.send(stdout);
    });
  } else {
    res.render('index');
  }
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
