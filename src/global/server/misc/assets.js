var Hoek = require('hoek');
var Config = require('../config.js').Config;
var path = require('path');

exports.register = function (server, options, next) {

    options = Hoek.applyToDefaults({ basePath: '' }, options);
    

    server.route({
        method: 'GET',
        path: '/favicon.ico',
        handler: function(request, response) {
            response.file(path.resolve(__dirname + '/../favicon.ico'));
        }
    });
    

    
    


    next();
};


exports.register.attributes = {
    name: 'assets'
};
