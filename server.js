require('@babel/register') //Need this library in order to run ES6 syntax on the NodeJS
var express = require('express');
var app = express();
var path = require('path');
var React = require('react');
var ReactDOMServer = require('react-dom/server');
var App = require('./src/app.jsx').default;
var fs = require('fs');

app.use(express.static(__dirname+"/public/"));

//Server Side Rendering Configuration.
app.get('/', function(req, res) {
    const app = ReactDOMServer.renderToString(React.createElement(App));
    const indexFile = path.resolve(__dirname +'/index.html');
    fs.readFile(indexFile, 'utf8', (err, data) => {
        if (err) {
          console.error('Something went wrong:', err);
          return res.status(500).send('Oops, better luck next time!');
        }
    
        return res.send(
          data.replace('<div id="root"></div>', `<div id="root">${app}</div>`)
        );
      });
});

app.listen(8000,() => {
    console.log("app started in 8000")
});