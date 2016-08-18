var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var serveAssets = require('../web/http-helpers.js');
// require more modules/folders here!

exports.handleRequest = function (req, res) {

  var defaultHeaders = {
    'access-control-allow-origin': '*',
    'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'access-control-allow-headers': 'content-type, accept',
    'access-control-max-age': 10
  };
  // console.log(req.method);
  // console.log(req.url);
  if (req.method === 'GET') {
    
    if (req.url.search('css') !== -1) {
      
      serveAssets.serveAssets(res, 'public/styles.css');
      // fs.readFile('public/styles.css', function(err, content) {
      //   defaultHeaders['Content-Type'] = 'text/css';
      //   res.writeHead('200', defaultHeaders);         
      //   res.end(content);
      //});

    }

    serveAssets.serveAssets(res, 'public/index.html');
    fs.readFile( 'public/index.html', 'utf-8', function(err, content) {
      defaultHeaders['Content-Type'] = 'text/html';
      res.writeHead('200', defaultHeaders);
      res.end(content);
    });
  
  } else if (req.method === 'POST') {
    var message = '';

    req.on('data', function(chunk) {
      message += chunk;
    });

    req.on('end', function() {
      //res.end(message);
      fs.readFile('archives/sites.txt','utf-8', function(err, content) {
        if (content.search(message.split('=')[1]) !== -1) {
          res.end('Found it');
          fs.readFile('archives/sites/' + message.split('=')[1] + '.html', function(error, cont) {
            defaultHeaders['Content-Type'] = 'text/html';
            res.writeHead('201', defaultHeaders);
            res.end(cont);
          });
        } else {
         // res.end('Didnt find it');
          fs.readFile('public/loading.html',function(err,loadingcontent){
            defaultHeaders['Content-Type'] = 'text/html';
            res.writeHead('200',defaultHeaders);
            res.end(loadingcontent);
          });
        } 
      });
    });

    
    //res.end(JSON.stringify(req.headers));
  }
};
