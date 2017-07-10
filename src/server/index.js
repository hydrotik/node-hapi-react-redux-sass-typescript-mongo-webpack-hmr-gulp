'use strict';

const csi = require('./common');
const Path = require('path');
const Hapi = require('hapi');

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
            if (process.env.MONGO_URI) {
                var mongoBreaker = server.app.mongoBreaker = CircuitBreaker(() => {
                    return new Promise((resolve, reject) => {
                        MongoClient.connect(process.env.MONGO_URI, function(err, db) {
                            if (!err) {
                                return resolve(db);
                            }
                            else {
                                return reject(err);
                            }
                        });
                    });
                },
                {
                    timeout: 3000,
                    maxFailures: 3,
                    resetTimeout: 10000,
                    Promise: Promise
                });

                mongoBreaker.on('open', () => {
                    server.log(['error'], 'Mongo connection failure. Circuit-breaker is opened.');
                });

                mongoBreaker.on('timeout', (err) => {
                    server.log(['warn'], 'Mongo connection has timed-out.');
                });

                mongoBreaker.on('failure', (err) => {
                    server.log(['error'], 'Mongo connection failed.');
                });

                mongoBreaker.on('success', () => {
                    server.log(['info'], 'Mongo connection success.');
                });

                mongoBreaker.on('close', () => {
                    server.log(['info'], 'Mongo connection has restored. Circuit-breaker is closed.');
                });

                mongoBreaker.fire()
                .then((db) => {
                    server.app.wattsDb = db;
                })
                .catch((err) => {
                    setTimeout(() => {
                        mongoBreaker.fire()
                        .then((db) => {
                            server.app.wattsDb = db;
                        })
                    }, 3000)
                });
            }
            else {
                server.log(['error'], "No mongo defined");
            }

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

            server.route({
                method: 'GET',
                path: '/',
                handler: function (request, reply) {
                    request.server.app.wattsDb.collection('hello').findOne({}, function(err, docs) {
                        if (err) {
                            return reply(Boom.serverUnavailable());
                        }
                        return reply('Hello, ' + docs.name);
                    });
                    
                }
            })

            next();
        });
    }
};

Glue.compose(Manifest, glueOptions, (err, server) => {
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
