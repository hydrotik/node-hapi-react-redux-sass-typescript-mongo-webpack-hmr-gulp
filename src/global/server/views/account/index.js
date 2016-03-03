var Hoek = require('hoek');
var path = require('path');
var pkg = require('../../../../../package.json');
var util = require('util');


exports.register = function (plugin, options, next) {

    options = Hoek.applyToDefaults({ basePath: '' }, options);

    var js = options.artifactRoot + path.join('js', 'account.min.js')
    var css = options.artifactRoot + path.join('css', 'account.min.css');

    plugin.route({
        method: 'GET',
        path: '/account/{glob*}',
        config: {
            auth: {
                strategy: 'session',
                scope: 'account'
            }
        },
        handler: function(request, response) {
            console.log('LOADING ACCOUNT');

            var props = {
                title: 'Boilerplate Test',
                js: js,
                css: css
            }

            // Hook into typescript generated files
            response.view('account/Index.tsx', props);
        },
        config: {
            cors: true
        }
    });


    next();
};


exports.register.attributes = {
    pkg: require('./package.json')
};
