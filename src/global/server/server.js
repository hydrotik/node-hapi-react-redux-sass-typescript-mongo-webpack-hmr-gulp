var Composer = require('./index');
var dateFormat = require('dateformat');
var format = "dd mmm HH:MM:ss";
var opn = require('opn');
var util = require('util');
var Config = require('./config').Config;

// require("amd-loader");


Composer(function (err, server) {

    if (err) {
        throw err;
    }

    server.start(function () {
        console.log(process.env.NODE_ENV);
        console.info('==> ' + dateFormat(new Date(), format));
        console.info("==> ✅  Server is listening");
        var url = util.format('http://%s:%d', Config.get('/devHost'), Config.get('/devPort'));
        console.log('==> 🌎  Listening at %s', url);
        
        // Browser will load through webpack...
        // opn(url + '/dashboard');
    });
});