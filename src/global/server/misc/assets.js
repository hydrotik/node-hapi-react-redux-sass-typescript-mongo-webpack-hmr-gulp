var Hoek = require('hoek');
// TODO: config or buildDir should be accessible through options or server...confirm and/or fix3
var Config = require('../config.js');
var path = require('path');

exports.register = function (server, options, next) {

    options = Hoek.applyToDefaults({ basePath: '' }, options);
    // TODO: /js maybe doesn't make sense for server application...
    // Perhaps make it /admin/js so that it is uniform with other potential apps
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
