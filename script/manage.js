'use strict';

var Config = "../config.js";
var Mongodb = require('mongodb');
var BaseModel = require('hapi-mongo-models').BaseModel;
var User = require('../src/global/server/models/user');
var Admin = require('../src/global/server/models/admin');
var AdminGroup = require('../src/global/server/models/admin-group');
var Account = require('../src/global/server/models/account');
var Promise = require('es6-promise').Promise;

if (process.argv.length <= 2) {

}

function connect(options) {
    let p = new Promise((resolve, reject) => {
        if (BaseModel.db) {
            return resolve(BaseModel.db);
        }
        BaseModel.connect({url: options.url}, (err, db) => {
            if (err) {
                return reject(err);
            }

            return resolve(db);
        })
    });

    return p;
}

function getOrCreateRootGroup(db) {
    let p = new Promise((resolve, reject) => {

        AdminGroup.findOne(
            {
                name: 'Root'
            },
            (err, adminGroup) => {
                if (err) {
                    return reject(err);
                }

                if (adminGroup) {
                    return resolve(adminGroup);
                }

                AdminGroup.create('Root', (err, adminGroup) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(adminGroup);
                })
            }
        );
        
    });

    return p;
}

function createUser(options) {
    var adminName = options.firstName + ' ' + options.lastName;

    var p = new Promise((resolve, reject) => {
        Admin.create(adminName, (err, resultsAdmin) => {
            if (err) {
                return reject(err);
            }

            User.create(options.username, options.password, options.email, (err, resultsUser) => {
                if (err) {
                    return reject(err);
                }

                var id = resultsAdmin._id.toString();
                var update = {
                    $set: {
                        groups: {
                            root: 'Root'
                        }
                    }
                };

                Admin.findByIdAndUpdate(id, update, (err) => {
                    if (err) {
                        return reject(err);
                    }
                    var id = resultsUser._id.toString();
                    var update = {
                        $set: {
                            'roles.admin': {
                                id: resultsAdmin._id.toString(),
                                name: adminName
                            }
                        }
                    };

                    User.findByIdAndUpdate(id, update, function(err) {
                        if (err) {
                            return reject(err);
                        }
                        var id = resultsAdmin._id.toString();
                        var update = {
                            $set: {
                                user: {
                                    id: resultsUser._id.toString(),
                                    name: options.username
                                }
                            }
                        };

                        Admin.findByIdAndUpdate(id, update, function(err) {
                            if (err) {
                                return reject(err);
                            }
                            return resolve({user: resultsUser, admin: resultsAdmin});
                        });
                    });

                });

            });
        });
    });

    return getOrCreateRootGroup().then(p);
    
}

module.exports = {
    connect,
    getOrCreateRootGroup,
    createUser
}