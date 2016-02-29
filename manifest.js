var Confidence = require('confidence');
var Config = require('./config');
var Routes = require('./config.routes').routes;
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
        /*debug: { // Boom
            request: ['error']
        },*/
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
    plugins: {
        // Plugins/Modules
        'hapi-auth-basic': {},
        'hapi-auth-cookie': {},
        'crumb': {
            restful: true
        },
        'lout': {},
        'inert': {},
        'vision': {},
        'visionary': {
            engines: {
              jsx: "hapi-react-views",
              tsx: HapiTypescriptViews
            },
            compileOptions: {
                useNodeJsx: false
            },
            relativeTo: __dirname,
            path: "./src/global/server/views/"
        },

        'hapi-mongo-models': {
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
        },

        // BUILD
        './global/server/misc/build': Object.assign({bundleName: 'app'}, Config, pkg.config, helpers),

        // ASSETS
        './global/server/misc/assets': Object.assign({bundleName: 'app'}, Config, pkg.config, helpers),

        // API
        './global/server/auth': {},
        './global/server/mailer': {},
        './global/server/api/accounts': { basePath: '/api' },
        './global/server/api/admin-groups': { basePath: '/api' },
        './global/server/api/admins': { basePath: '/api' },
        './global/server/api/auth-attempts': { basePath: '/api' },
        './global/server/api/contact': { basePath: '/api' },
        './global/server/api/index': { basePath: '/api' },
        './global/server/api/login': { basePath: '/api' },
        './global/server/api/logout': { basePath: '/api' },
        './global/server/api/sessions': { basePath: '/api' },
        './global/server/api/signup': { basePath: '/api' },
        './global/server/api/statuses': { basePath: '/api' },
        './global/server/api/users': { basePath: '/api' }
    }
};

Object.assign(manifest.plugins, Routes);

var store = new Confidence.Store(manifest);


exports.get = function (key) {
    return store.get(key, criteria);
};


exports.meta = function (key) {
    return store.meta(key, criteria);
};
