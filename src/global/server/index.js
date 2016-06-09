var Glue = require('glue');
var Manifest = require('./manifest.js');

var options = {
	relativeTo: __dirname
};



module.exports = Glue.compose.bind(Glue, Manifest.get('/'), options);
