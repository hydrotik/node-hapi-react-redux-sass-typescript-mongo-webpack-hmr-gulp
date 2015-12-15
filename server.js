

var Composer = require('./index');
var dateFormat = require('dateformat');
var format = "dd mmm HH:MM:ss";
var opn = require('opn');
var pkg = require('./package.json');
var util = require('util');
var Config = require('./config');

require('babel-core/register')({
    presets: ['react', 'es2015']
});


Composer(function (err, server) {

    if (err) {
        throw err;
    }

    server.start(function () {

        console.info('==> ' + dateFormat(new Date(), format));
        console.info("==> ✅  Server is listening");
        var url = util.format('http://%s:%d', Config.get('/devHost'), Config.get('/devPort'));
        console.log('==> 🌎  Listening at %s', url);
        opn(url);
    });
});

/*



// Bundle the client assets with Webpack
//var StartWebpack = require('./webpack');
//StartWebpack();

// Create a basic Hapi.js server
var Hapi = require('hapi');
var Vision = require('vision');
var Inert = require('inert');
var HapiReactViews = require('hapi-react-views');

require('babel-core/register')({});

var port = pkg.config.devPort;
var host = pkg.config.devHost;

// Basic Hapi.js connection stuff
var server = new Hapi.Server();

server.connection({
    host: host,
    port: port
});


var apiHandler = function(request, response) {
    response.view('Api');
};

server.register([
    Vision,
    Inert
], function(err) {

    server.views({
        engines: {
            jsx: HapiReactViews
        },
        compileOptions: { useNodeJsx: false },
        relativeTo: __dirname,
        path: 'src/global/server/views'
    });



    // Add a route to serve static assets (CSS, JS, IMG)
    server.route({
        method: 'GET',
        path: '/{param*}',
        handler: {
            directory: {
                path: 'build'
            }
        },
        config: {
            cors: true
        }
    });

    server.register(require('./src/global/server/views/home/index'), function (err) {
        if (err) {
            console.error('Failed to load plugin:', err);
        }
    });

    server.register(require('./src/global/server/api/index'), function (err) {
        if (err) {
            console.error('Failed to load plugin:', err);
        }
    });

    

    server.start(function() {
        console.info('==> ' + dateFormat(new Date(), format));
        console.info("==> ✅  Server is listening");
        var url = util.format('http://%s:%d', host, port);
        console.log('==> 🌎  Listening at %s', url);
        opn(url);
    });
});
*/
