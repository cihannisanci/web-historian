var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
// require more modules/folders here!

exports.handleRequest = function (req, res) {

  var defaultHeaders = {
    'access-control-allow-origin': '*',
    'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'access-control-allow-headers': 'content-type, accept',
    'access-control-max-age': 10
  };
  console.log(req.method);
  console.log(req.url);
  if (req.method === 'GET') {
    
    if (req.url.search('css') !== -1) {
      

      fs.readFile('public/styles.css', function(err, content) {
        defaultHeaders['Content-Type'] = 'text/css';
        res.writeHead('200', defaultHeaders);         
        res.end(content);
      });

    }

    fs.readFile( 'public/index.html', function(err, content) {
      defaultHeaders['Content-Type'] = 'text/html';
      res.writeHead('200', defaultHeaders);
      res.end(content);
    });



  

  } else if (req.method === 'POST') {
    var message = '';

    req.on('data', function(chunk) {
      message += chunk;

    });

    req.on('end', function(data) {
      res.end(message);
    });

    //res.end(JSON.stringify(req.headers));
  }
};
