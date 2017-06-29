'use strict';

const csi = require('./common');
let env = process.env.NODE_ENV;

let config = {
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


// ============================================================================
//
// Team-built plugins should go here...
// 
// ============================================================================
        {
            "plugin": {
                "register": "../../node_modules/auth_plugin",
                "options": {
                    "ldapUrl": 'ldap://ldap.saksinc.com:389'
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
                "select": ["admin"],
                "routes": {
                    "prefix": "/navbobulator"
                },
                "options": {
                }
            }
        }
    ]
}

module.exports = config;
