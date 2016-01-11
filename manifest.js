var Confidence = require('confidence');
var Config = require('./config');
var Routes = require('./config.routes').routes;
var pkg = require('./package');

var criteria = {
    env: process.env.NODE_ENV
};

require('node-jsx').install();

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
              tsx: "hapi-react-views"
            },
            compileOptions: {
                useNodeJsx: false
            },
            relativeTo: __dirname,
            path: "./src/global/server/views/"
        },
        '@tanepiper/quorra' : {

        },

        // BUILD
        './global/server/misc/build': Object.assign({bundleName: 'app'}, Config, pkg.config, helpers),

        // ASSETS
        './global/server/misc/assets': Object.assign({bundleName: 'app'}, Config, pkg.config, helpers)
    }
};

Object.assign(manifest.plugins, Routes);

    var hapiMongoModels = {
        'hapi-mongo-models': {
            mongodb: Config.get('/hapiMongoModels/mongodb'),
            models: {
                Account: './src/global/server/models/account',
                AdminGroup: './src/global//server/models/admin-group',
                Admin: './src/global//server/models/admin',
                AuthAttempt: './src/global//server/models/auth-attempt',
                Session: './src/global//server/models/session',
                Status: './src/global//server/models/status',
                User: './src/global//server/models/user'
            },
            autoIndex: Config.get('/hapiMongoModels/autoIndex')
        }
    }
    Object.assign(manifest.plugins, hapiMongoModels);


var store = new Confidence.Store(manifest);


exports.get = function (key) {
    return store.get(key, criteria);
};


exports.meta = function (key) {
    return store.meta(key, criteria);
};
