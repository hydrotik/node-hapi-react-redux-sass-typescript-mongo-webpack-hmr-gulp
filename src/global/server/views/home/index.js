var Hoek = require('hoek');
var path = require('path');
var pkg = require('../../../../../package.json');
var util = require('util');


exports.register = function (plugin, options, next) {

    options = Hoek.applyToDefaults({ basePath: '' }, options);

    //var js = options.artifactRoot + path.join('js', util.format(options.bundleName + '.%s.js', pkg.version))
    //var css = options.artifactRoot + path.join('css', util.format(options.bundleName + '.%s.css', pkg.version));

    var js = options.artifactRoot + path.join('js', 'home.min.js')
    var css = options.artifactRoot + path.join('css', 'home.min.css');

    plugin.route({
        method: 'GET',
        path: '/',
        handler: function(request, response) {
            console.log('LOADING INDEX/HOME');

            var props = {
                title: 'Boilerplate Test',
                js: js,
                css: css
            }

            response.view('home/Index.tsx', props);
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
