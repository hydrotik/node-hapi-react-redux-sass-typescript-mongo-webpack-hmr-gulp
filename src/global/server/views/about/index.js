'use strict';

var path = require('path');
var pkg = require('../../../../../package.json');
var page = require('./package.json');
var util = require('util');

exports.register = function (plugin, options, next) {

    var js = options.artifactRoot + path.join('js', 'about.min.js')
    var css = options.artifactRoot + path.join('css', 'about.min.css');

    plugin.route({
        method: 'GET',
        path: '/about',
        handler: function (request, reply) {

            console.log('LOADING ABOUT');

            var props = {
                title: 'About',
                js: [js],
                css: [css]
            }

            reply.view('about/Index.tsx', props);
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
