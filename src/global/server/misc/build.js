var Hoek = require('hoek');


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
