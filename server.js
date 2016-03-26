var Composer = require('./index');
var dateFormat = require('dateformat');
var format = "dd mmm HH:MM:ss";
var opn = require('opn');
var pkg = require('./package.json');
var util = require('util');
var Config = require('./config');

// require("amd-loader");


Composer(function (err, server) {

    if (err) {
        throw err;
    }

    server.start(function () {

        console.info('==> ' + dateFormat(new Date(), format));
        console.info("==> ✅  Server is listening");
        var url = util.format('http://%s:%d', Config.get('/devHost'), Config.get('/devPort'));
        console.log('==> 🌎  Listening at %s', url);
        opn(url + '/login');
    });
});