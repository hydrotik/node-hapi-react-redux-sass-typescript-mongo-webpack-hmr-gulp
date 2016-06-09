var Hoek = require('hoek');
var Config = require('../config.js');
var path = require('path');

exports.register = function (server, options, next) {

    options = Hoek.applyToDefaults({ basePath: '' }, options);
    server.route({
        method: 'GET',
        path: '/js/{param*}',
        handler: {
            directory: {
                path: path.join(Config.get('/buildDir'), 'pages/js')
            }
        },
        config: {
            cors: true
        }
    });

    server.route({
        method: 'GET',
        path: '/{param*}',
        handler: {
            directory: {
                path: Config.get('/buildDir')
            }
        },
        config: {
            cors: true
        }
    });
    
    


    next();
};


exports.register.attributes = {
    name: 'assets'
};
