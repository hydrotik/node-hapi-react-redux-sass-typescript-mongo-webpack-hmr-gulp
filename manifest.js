var Confidence = require('confidence');
var Hoek = require('hoek');
var Config = require('./config');

// var Routes = require('./config.routes').routes;
var pkg = require('./package');

// if (typeof define !== 'function') {
//     const define = require('requirejs').define;
// }

//require("amd-loader");

//var define;

//if (typeof define !== 'function') { define = require('amdefine')(module) }

var HapiTypescriptViews = require('./src/global/server/plugins/hapi-typescript-react-views');
//HapiTypescriptViews.register(define);


var criteria = {
    env: process.env.NODE_ENV
};

var helpers = {
    artifactRoot : process.env.NODE_ENV === 'production' ? '' : 'http://' + Config.get('/devHost') + ':' + Config.get('/webpackPort') + '/'
}

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
                    path: './src/global/server/views/'
                }
            }
        },
        {
            plugin: {
                register: 'hapi-mongo-models',
                options: {
                    mongodb: Config.get('/hapiMongoModels/mongodb'),
                    models: {
                        Account: './src/global/server/models/account',
                        AdminGroup: './src/global/server/models/admin-group',
                        Admin: './src/global/server/models/admin',
                        AuthAttempt: './src/global/server/models/auth-attempt',
                        Session: './src/global/server/models/session',
                        Status: './src/global/server/models/status',
                        User: './src/global/server/models/user'
                    },
                    autoIndex: Config.get('/hapiMongoModels/autoIndex')
                }
            }
        },

        {
            plugin: './global/server/auth'
        },

        {
            plugin: './global/server/mailer'
        },

        {
            plugin: './global/server/api/accounts',
            options: {
                routes: { prefix: '/api' }
            }
        },
        {
            plugin: './global/server/api/admin-groups',
            options: {
                routes: { prefix: '/api' }
            }
        },
        {
            plugin: './global/server/api/admins',
            options: {
                routes: { prefix: '/api' }
            }
        },
        {
            plugin: './global/server/api/auth-attempts',
            options: {
                routes: { prefix: '/api' }
            }
        },
        {
            plugin: './global/server/api/contact',
            options: {
                routes: { prefix: '/api' }
            }
        },
        {
            plugin: './global/server/api/index',
            options: {
                routes: { prefix: '/api' }
            }
        },
        {
            plugin: {
                register: './global/server/api/login',
                options: {
                }
            },
            options: {
                select: [],
                routes: {
                    prefix: '/api'
                }
            }
        },
        {
            plugin: './global/server/api/logout',
            options: {
                routes: { prefix: '/api' }
            }
        },
        {
            plugin: './global/server/api/sessions',
            options: {
                routes: { prefix: '/api' }
            }
        },
        {
            plugin: './global/server/api/signup',
            options: {
                routes: { prefix: '/api' }
            }
        },
        {
            plugin: './global/server/api/statuses',
            options: {
                routes: { prefix: '/api' }
            }
        },
        {
            plugin: './global/server/api/users',
            options: {
                routes: { prefix: '/api' }
            }
        },
        {
            plugin: {
                register: './global/server/misc/build',
                options: Object.assign({bundleName: 'app'}, Config, pkg.config, helpers)
            }
        },
        {
            plugin: {
                register: './global/server/misc/assets',
                options: Object.assign({bundleName: 'app'}, Config, pkg.config, helpers)
            }
        },


        {
            plugin: {
                register: './global/server/views/home',
                options: Object.assign({bundleName: 'app'}, Config, pkg.config, helpers)
            }
        },
        {
            plugin: {
                register: './global/server/views/about',
                options: Object.assign({bundleName: 'app'}, Config, pkg.config, helpers)
            }
        },
        {
            plugin: {
                register: './global/server/views/contact',
                options: Object.assign({bundleName: 'app'}, Config, pkg.config, helpers)
            }
        },
        {
            plugin: {
                register: './global/server/views/signup',
                options: Object.assign({bundleName: 'app'}, Config, pkg.config, helpers)
            }
        },
        {
            plugin: {
                register: './global/server/views/account',
                options: Object.assign({bundleName: 'app'}, Config, pkg.config, helpers)
            }
        },
        {
            plugin: {
                register: './global/server/views/admin',
                options: Object.assign({bundleName: 'app'}, Config, pkg.config, helpers)
            }
        },
        {
            plugin: {
                register: './global/server/views/login',
                options: Object.assign({bundleName: 'app'}, Config, pkg.config, helpers)
            }
        }
    ]
};



var store = new Confidence.Store(manifest);


exports.get = function (key) {
    return store.get(key, criteria);
};


exports.meta = function (key) {
    return store.meta(key, criteria);
};