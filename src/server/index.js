'use strict';

const csi = require('./common');
const Path = require('path');
const Hapi = require('hapi');
const HapiMongoModels = require('hapi-mongo-models');

// hapijs server and plugin composition
const Glue = require('glue');

// hapijs templates
const Handlebars = require('handlebars');
const Vision = require('vision');

// hapijs authentication strategies
const AuthCookie = require('hapi-auth-cookie');
const AuthJWT = require('hapi-auth-jwt2');

// hapijs logging, also using npm modules good-squeeze and good-console
// https://github.com/hapijs/good-squeeze
// https://github.com/hapijs/good-console
const Good = require('good');

const Inert = require('inert');

// hapijs CSRF token generation
const Crumb = require('crumb');

// hapijs plugin for uncaught exceptions
const Poop = require('poop');

const Hoek = require('hoek');

const Promise = require('bluebird');

const MongoClient = require('mongodb').MongoClient

const CircuitBreaker = require('opossum');

//############################################################################
//
// Use Glue to compose plugins and configuration
//
// See hapi glue API for details on how to use pass config:
// https://github.com/hapijs/glue/blob/master/API.md
//
//############################################################################
const Manifest = require('./Manifest');

const isDevMode = process.env.NODE_ENV === 'development';

const glueOptions = {

    // paths for plugins relative to the current directory
    relativeTo: __dirname,
    
    // Register globally necessary plugins
    preRegister: (server, next) => {
        server.register([
            {
                "register": Good,
                "options": {
                    "ops": {
                        "interval": 1000
                    },
                    "reporters": {
                        "consoleReporter": [{
                            "module": "good-squeeze",
                            "name": "Squeeze",
                            "args": [{ "error": "*", "log": "*", "response": "*" }]
                        }, {
                            "module": "good-console"
                        }, "stdout"]
                    }
                }

            }
        ]
        
        , (err) => {
            if (err) {
                throw err;
            }
            server.log([], "Logging started");

// ============================================================================
//
// Here, you can add a plugin without using Glue
//
//      server.register(
//          { register: require('../../plugins/sample_plugin2') },
//          { select: ['web'], routes: { prefix: '/sample2' } }, (err) => {
//          if (err) {
//              throw err;
//          }
//      });
// ============================================================================

            server.app.getMongo = function() {
                return new Promise((resolve, reject) => {
                    let hapiMongoModels = server.plugins['hapi-mongo-models'];

                    if (hapiMongoModels.MongoModels && hapiMongoModels.MongoModels.db) {
                        resolve(hapiMongoModels.MongoModels.db);
                    }
                    else {
                        reject("Error getting db from hapi-mongo-models");
                    }
                });
            }
            server.route({
                method: 'GET',
                path: '/',
                handler: function (request, reply) {
                    
                    server.app.getMongo().then((db) => {
                        db.collection('hello').findOne({}, function(err, docs) {
                            if (err) {
                                return reply('Hello from ' + (process.env.COLOR || 'server'));
                            }
                            return reply('Hello, ' + docs.name + ' from ' + (process.env.COLOR || 'server'));
                        });
                    })
                }
            })

            next();
        });
    }
};

Glue.compose(Manifest.manifest, glueOptions, (err, server) => {
    if (err) {
        throw err;
    }

    // Connection labels for admin and web are required!
    let adminExists = false;
    let webExists = false;
    server.connections.forEach((curr, idx, arr) => {
        if (curr.settings.labels.includes('admin') && !curr.settings.labels.includes('web')) {
            adminExists = true;
        }

        if (curr.settings.labels.includes('web') && !curr.settings.labels.includes('admin')) {
            webExists = true;
        }
    });

    if (!adminExists || !webExists) {
        throw new Error('Connection labels admin and web must exist and be on separate connections');
    }

    // Wrap hapi server.initialize and server.start in promises

    function initialize() {
        return new Promise((resolve, reject) => {
            server.initialize((err) => {
                if (err) {
                    return reject(err);
                }

                return resolve();
            });
        });
    }

    function start() {
        return new Promise((resolve, reject) => {
            server.on('request-error', function (request, err) {
                console.log(err);
                throw err;
                //console.log('Error response (500) sent for request: ' + request.id + ' because: ' + (err.trace || err.stack || err));
            });

            server.start((err) => {
                
                // Check for required environment variables
                if (!process.env.NODE_ENV || !['production', 'development', 'test'].includes(process.env.NODE_ENV)) {
                    return reject(new Error("NODE_ENV environment variable is required, and must be one of (production, development, test)"));
                }

                if (!process.env.SECRET_KEY || process.env.SECRET_KEY === "" || process.env.SECRET_KEY.length < 32) {
                    return reject(new Error("SECRET_KEY environment variable is required, and must be at least 32 characters"));
                }

                if (err) {
                    return reject(err);
                }
                else {
                    
                    server.connections.map((curr, idx, arr) => {
                        server.log(['debug'], curr.settings.labels + ' running at: ' + server.select(curr.settings.labels[0]).info.uri);
                    });
                    server.connections.map((curr, idx, arr) => {
                        for (var plugin in curr.registrations) {
                            let output = {
                                name: curr.registrations[plugin].name,
                                version: curr.registrations[plugin].version
                            }
                            server.log(['debug', curr.settings.labels[0]], 'Plugin registered on ' + curr.settings.labels + ' ' + output.name + '(' + output.version + ')');
                        }
                    });

                    return resolve(server);
                }
            });
        });
    }

    initialize().then(start);
});
