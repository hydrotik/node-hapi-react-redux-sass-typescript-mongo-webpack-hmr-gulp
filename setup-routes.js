#!/usr/bin/env node
var Fs = require('fs');
var Path = require('path');
var Async = require('async');
var Promptly = require('promptly');
var Mongodb = require('mongodb');
var Handlebars = require('handlebars');


var routesPath = Path.resolve(__dirname, 'config.routes.js');


var routeString = ",\n\t'./global/server/views/projects': Object.assign({bundleName: 'app'}, Config, pkg.config, helpers)"

Async.auto({
    newRoute: function (done) {

        Promptly.prompt('Path to route file: ', { default: 'WattsProject' }, done);
    },
    createConfig: ['newRoute', function (done, results) {

        var fsOptions = { encoding: 'utf-8' };

        Fs.readFile(routesPath, fsOptions, function (err, src) {

            if (err) {
                console.error('Failed to read config template.');
                return done(err);
            }

            configTemplate = Handlebars.compile(src);
            Fs.writeFile(configPath, configTemplate(results), done);
        });
    }]
}, function (err, results) {

    if (err) {
        console.error('Setup failed.');
        console.error(err);
        return process.exit(1);
    }

    console.log('Setup complete.');
    process.exit(0);
});
