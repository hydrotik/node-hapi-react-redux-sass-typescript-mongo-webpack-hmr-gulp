'use strict';

var Hoek = require('hoek');
var path = require('path');
var pkg = require('../../../../../package.json');
var page = require('./package.json');
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
            },
            cors: true
        },
        handler: function (request, reply) {
            console.log('LOADING ACCOUNT');

            var props = {
                title: 'Account',
                js: js,
                css: css
            }

            // Hook into typescript generated files
            reply.view('account/Index.tsx', props);
        }
    });


    next();
};


exports.register.attributes = {
    name: page.name,
    version: page.version
};

