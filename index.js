
var React = require('react');  
var ReactDOM = require('react-dom');
var App = require('./src/app.jsx').default;

ReactDOM.hydrate(
    <App/>,
    document.getElementById("root")
);
