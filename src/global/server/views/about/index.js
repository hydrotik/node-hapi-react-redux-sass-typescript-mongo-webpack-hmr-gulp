var Hoek = require('hoek');
var path = require('path');
var pkg = require('../../../../../package.json');
var util = require('util');


exports.register = function (plugin, options, next) {

    options = Hoek.applyToDefaults({ basePath: '' }, options);

    var js = options.artifactRoot + path.join('js', util.format(options.bundleName + '.%s.js', pkg.version))
    var css = options.artifactRoot + path.join('css', util.format(options.bundleName + '.%s.css', pkg.version));

    plugin.route({
        method: 'GET',
        path: '/about',
        handler: function(request, response) {
            console.log('LOADING ABOUT');

            var props = {
                title: 'Boilerplate Test',
                js: js,
                css: css
            }

            response.view('about/Index.jsx', props);
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
