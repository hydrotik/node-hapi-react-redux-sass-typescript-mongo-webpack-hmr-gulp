'use strict';

var Hoek = require('hoek');
var path = require('path');
var pkg = require('../../../../../package.json');
var page = require('./package.json');
var util = require('util');


exports.register = function (plugin, options, next) {

    options = Hoek.applyToDefaults({ basePath: '' }, options);

    var js = options.artifactRoot + path.join('js', 'login.min.js')
    var css = options.artifactRoot + path.join('css', 'login.min.css');

    plugin.route({
        method: 'GET',
        path: '/login/{glob*}',
        config: {
            auth: {
                mode: 'try',
                strategy: 'session'
            },
            plugins: {
                'hapi-auth-cookie': {
                    redirectTo: false
                }
            }
        },
        handler: function (request, reply) {

            if (request.params.glob !== 'logout' &&
                request.auth.isAuthenticated) {

                if (request.auth.credentials.user.roles.admin) {
                    return reply.redirect('/admin');
                }

                return reply.redirect('/account');
            }

            var props = {
                title: 'Login',
                js: js,
                css: css
            }

            const response = reply.view('login/Index.tsx', props);
            response.header('x-auth-required', true);
        }
    });


    next();
};

exports.register.attributes = {
    name: page.name,
    version: page.version
};
