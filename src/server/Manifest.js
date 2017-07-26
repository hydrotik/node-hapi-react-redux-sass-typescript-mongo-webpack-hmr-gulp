'use strict';

const csi = require('./common');
let env = process.env.NODE_ENV;

let custom = {
    cors: { 
        origin: [
            "hbc.com",
            "*.hbc.com",
            "lordandtaylor.com",
            "*.lordandtaylor.com",
            "saks.com",
            "*.saks.com",
            "saksdirect.com",
            "*.saksdirect.com",
            "saksfifthavenue.com",
            "*.saksfifthavenue.com",
            "saksoff5th.com",
            "*.saksoff5th.com"
        ],
        maxAge: 3600,
        credentials: true
    }
}

if (env === "development") {
    custom.cors.origin = ["*"];
}

let manifest = {
    "server": {
        "app": {
            "slogan": "CSI-ONE"
        }
    },
    "connections": [
        {
            "port": 8000,
            "labels": ["web"]
        },
        {
            "port": 8001,
            "labels": ["admin"]
        }
    ],
    "registrations": [

// ============================================================================
//
// Third-party plugins should go here...
// 
// ============================================================================
        {
            "plugin": {
                "register": "vision", // hapi vision plugin for rendering templates
                "options": {}
            }
        },
        {
            "plugin": {
                "register": "hapi-auth-jwt2", // Support for JWT
                "options": {}
            }
        },
        {
            "plugin": {
                "register": "hapi-auth-cookie", // Support for authentication/session via cookie
                "options": {}
            }
        },
        {
            "plugin": {
                "register": "crumb",
                "options": {
                    "skip": (request, reply) => {

                        if (csi.get("route.settings.plugins.crumb.skip", request)) {
                            return true;
                        }

                        return false;
                    },
                    "cookieOptions": {
                        "isSecure": env != "development"
                    } 
                }
            }
            
        },
        {
            "plugin": {
                "register": "inert",
                "options": {
                }
            }
            
        },
        {
            "plugin": {
                "register": "h2o2",
                "options": {}
            }
        },
        {
            "plugin": {
                "register": "hapi-mongo-models",
                "options": {
                    "mongodb": {
                        "uri": process.env.MONGO_URI || 'mongodb://localhost:27017/watts',
                        "options": {},
                    },
                    "autoIndex": false,
                    "models": {
                        
                    }
                }
            }
        },


// ============================================================================
//
// Team-built plugins should go here...
// 
// ============================================================================
        {
            "plugin": {
                "register": "../../node_modules/auth_plugin",
                "options": {
                    "ldapUrl": process.env.LDAP_URI || 'ldap://localhost:389' //'ldap://ldap.saksinc.com:389'
                },
                "select": ['web'],
                "routes": {
                    "prefix": "/auth"
                }
            }
        },

       {
            "plugin": {
                "register": "../../node_modules/navbobulator",
                "select": ["web"],
                "routes": {
                    "prefix": "/navbobulator"
                },
                "options": {
                }
            }
        },

        {
            "plugin": {
                "register": "../../node_modules/contentedit",
                "select": ["web"],
                "routes": {
                    "prefix": "/contentedit"
                },
                "options": {
                }
            }
        }
    ]
}

module.exports = {
    manifest,
    custom
};
