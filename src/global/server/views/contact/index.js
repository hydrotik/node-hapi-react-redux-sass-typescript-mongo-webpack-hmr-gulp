'use strict';

var Hoek = require('hoek');
var path = require('path');
var pkg = require('../../../../../package.json');
var page = require('./package.json');
var util = require('util');

exports.register = function (plugin, options, next) {

    options = Hoek.applyToDefaults({ basePath: '' }, options);

    var js = options.artifactRoot + path.join('js', 'contact.min.js')
    var css = options.artifactRoot + path.join('css', 'contact.min.css');

    plugin.route({
        method: 'GET',
        path: '/contact',
        handler: function(request, response) {
            console.log('LOADING CONTACT');

            var props = {
                title: 'Contact',
                js: [js],
                css: [css]
            }

            // Hook into typescript generated files
            response.view('contact/Index.tsx', props);
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
