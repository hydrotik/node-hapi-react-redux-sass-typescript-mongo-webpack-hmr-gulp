var Hoek = require('hoek');
var path = require('path');
// TODO: config or buildDir should be accessible through options or server...confirm and/or fix3
var Config = require('../config.js');

exports.register = function (server, options, next) {

    options = Hoek.applyToDefaults({ basePath: '' }, options);

    server.route({
        method: 'GET',
        path: '/build/{param*}',
        handler: {
            directory: {
                path: 'build'
            }
        },
        config: {
            cors: true
        }
    });


    next();
};


exports.register.attributes = {
    name: 'build'
};
