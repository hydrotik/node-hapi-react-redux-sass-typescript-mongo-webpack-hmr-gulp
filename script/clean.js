var rimraf = require('rimraf');
var Config = require('../config');

console.log('Deleting ' + Config.get('/buildDir'));
rimraf(Config.get('/buildDir'), function(err) {
    if (err) {
        console.log('Could not delete ' + Config.get('/buildDir'));
    }
});
