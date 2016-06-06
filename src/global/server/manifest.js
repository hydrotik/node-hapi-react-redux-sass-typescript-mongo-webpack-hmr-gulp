var Confidence = require('confidence');
var Hoek = require('hoek');
var Config = require('./config');
var Pages = require('./config.pages').getConfig();
var pkg = require('../../../package');
var HapiTypescriptViews = require('hapi-typescript-views');
var path = require('path');

var criteria = {
    env: process.env.NODE_ENV
};

var helpers = {
    artifactRoot : (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'test') ? '/' : 'http://' + Config.get('/devHost') + ':' + Config.get('/webpackPort') + '/'
}

var processRoutes = function(pages){
    var routes = [], route;
    for (var i = pages.length - 1; i >= 0; i--) {
        route = pages[i].route;
        if(route.plugin.options.hasOwnProperty('bundleName')){
            route.plugin.options = Object.assign(route.plugin.options, Config, pkg.config, helpers);

        }
        routes.push(route);
        
    }
    return routes;
}

var Routes = processRoutes(Pages);

var manifest = {
    $meta: 'This file defines the plot device.',
    server: {
        debug: {
            request: [/*'error'*/]
        },
        connections: {
            routes: {
                security: true
            }
        }
    },
    connections: [{
        port: Config.get('/devPort'),
        labels: ['web']
    }],
    registrations: [
        {
            plugin: 'inert'
        },
        {
            plugin: 'hapi-auth-basic'
        },
        {
            plugin: 'hapi-auth-cookie'
        },
        {
            plugin: {
                register: 'crumb',
                options: {
                    restful: true
                }
            }
        },
        {
            plugin: 'lout'
        },
        {
            plugin: 'inert'
        },
        {
            plugin: 'vision'
        },
        {
            plugin: {
                register: 'visionary',
                options: {
                    engines: {
                        tsx: HapiTypescriptViews
                    },
                    compileOptions: {
                        useNodeJsx: false
                    },
                    relativeTo: __dirname,
                    path: './views/'
                }
            }
        },
        {
            plugin: {
                register: 'hapi-mongo-models',
                options: {
                    mongodb: Config.get('/hapiMongoModels/mongodb'),
                    models: {
                        Account: path.join(__dirname, 'models/account'),
                        AdminGroup: path.join(__dirname, 'models/admin-group'),
                        Admin: path.join(__dirname, 'models/admin'),
                        AuthAttempt: path.join(__dirname, 'models/auth-attempt'),
                        Session: path.join(__dirname, 'models/session'),
                        Status: path.join(__dirname, 'models/status'),
                        User: path.join(__dirname, 'models/user')
                    },
                    autoIndex: Config.get('/hapiMongoModels/autoIndex')
                }
            }
        },

        {
            plugin: './auth'
        },

        {
            plugin: './mailer'
        },

        {
            plugin: './api/accounts',
            options: {
                routes: { prefix: '/api' }
            }
        },
        {
            plugin: './api/admin-groups',
            options: {
                routes: { prefix: '/api' }
            }
        },
        {
            plugin: './api/admins',
            options: {
                routes: { prefix: '/api' }
            }
        },
        {
            plugin: './api/auth-attempts',
            options: {
                routes: { prefix: '/api' }
            }
        },
        {
            plugin: './api/contact',
            options: {
                routes: { prefix: '/api' }
            }
        },
        {
            plugin: './api/index',
            options: {
                routes: { prefix: '/api' }
            }
        },
        {
            plugin: './api/login',
            options: {
                routes: { prefix: '/api' }
            }
        },
        {
            plugin: './api/logout',
            options: {
                routes: { prefix: '/api' }
            }
        },
        {
            plugin: './api/sessions',
            options: {
                routes: { prefix: '/api' }
            }
        },
        {
            plugin: './api/signup',
            options: {
                routes: { prefix: '/api' }
            }
        },
        {
            plugin: './api/statuses',
            options: {
                routes: { prefix: '/api' }
            }
        },
        {
            plugin: './api/users',
            options: {
                routes: { prefix: '/api' }
            }
        }
    ]
};

manifest.registrations = manifest.registrations.concat(Routes);

var store = new Confidence.Store(manifest);


exports.get = function (key) {
    return store.get(key, criteria);
};


exports.meta = function (key) {
    return store.meta(key, criteria);
};