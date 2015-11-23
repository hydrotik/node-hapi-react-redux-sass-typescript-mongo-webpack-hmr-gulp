var Hoek = require('hoek');


exports.register = function (server, options, next) {

    options = Hoek.applyToDefaults({ basePath: '' }, options);

    server.route({
        method: 'GET',
        path: '/{param*}',
        handler: {
            directory: {
                path: 'static'
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
