'use strict';

var Hoek = require('hoek');
var path = require('path');
var pkg = require('../../../../../package.json');
var page = require('./package.json');
var util = require('util');

exports.register = function (plugin, options, next) {

    options = Hoek.applyToDefaults({ basePath: '' }, options);

    var js = options.artifactRoot + path.join('js', 'signup.min.js')
    var css = options.artifactRoot + path.join('css', 'signup.min.css');

    plugin.route({
        method: 'GET',
        path: '/signup',
        handler: function(request, response) {
            console.log('LOADING SIGNUP');

            var props = {
                title: 'Signup',
                js: [js],
                css: [css]
            }

            // Hook into typescript generated files
            response.view('signup/Index.tsx', props);
        },
        config: {
            cors: true
        }
    });


    next();
};


exports.register.attributes = {
    name: page.name,
    version: page.version
};
