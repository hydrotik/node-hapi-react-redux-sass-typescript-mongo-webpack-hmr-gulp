'use strict';

var Hoek = require('hoek');
var path = require('path');
var pkg = require('../../../../../package.json');
var page = require('./package.json');
var util = require('util');

exports.register = function (plugin, options, next) {

    options = Hoek.applyToDefaults({ basePath: '' }, options);

    var js = options.artifactRoot + path.join('js', 'admin.min.js');
    var css = options.artifactRoot + path.join('css', 'admin.min.css');

    plugin.route({
        method: 'GET',
        path: '/admin/{glob*}',
        config: {
            auth: {
                strategy: 'session',
                scope: 'admin'
            },
            cors: true
        },
        handler: function(request, response) {
            console.log('LOADING ADMIN');

            var props = {
                title: 'Admin',
                js: [js],
                css: process.env.NODE_ENV === 'production' ? [css] : []
            }

            // Hook into typescript generated files
            response.view('admin/Index.tsx', props);
        }
    });


    next();
};


exports.register.attributes = {
    name: page.name,
    version: page.version
};
