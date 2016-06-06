var Confidence = require('confidence');

var criteria = {
    env: process.env.NODE_ENV
};


var config = {
    $meta: 'This file configures the plot device.',
    projectName: 'WattsProject',
    buildDir: '../../../build',
    buildDirTests: '../../../build_tests',
    devHost: 'localhost',
    devPort: 8000,
    webpackPort: 8080,
    port: {
        web: {
            $filter: 'env',
            test: 9000,
            production: process.env.PORT,
            $default: 8000
        }
    },
    baseUrl: {
        $filter: 'env',
        $meta: 'values should not end in "/"',
        production: 'https://wattsproject.herokuapp.com',
        $default: 'http://localhost:8000'
    },
    authAttempts: {
        forIp: 50,
        forIpAndUser: 7
    },
    cookieSecret: {
        $filter: 'env',
        production: process.env.COOKIE_SECRET,
        $default: 'sezEhj(@#05Jxgnd5CTCGktuiXldIae3'
    },
    hapiMongoModels: {
        $filter: 'env',
        production: {
            mongodb: {
                url: process.env.MONGOLAB_URI
            },
            autoIndex: false
        },
        test: {
            mongodb: {
                url: 'mongodb://localhost:27017/wattsproject-test'
            },
            autoIndex: true
        },
        $default: {
            mongodb: {
                url: 'mongodb://localhost:27017/wattsproject'
            },
            autoIndex: true
        }
    },
    nodemailer: {
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'root@localhost.lan',
            pass: ''
        }
    },
    system: {
        fromAddress: {
            name: 'WattsProject',
            address: 'root@localhost.lan'
        },
        toAddress: {
            name: 'WattsProject',
            address: 'root@localhost.lan'
        }
    }
};


var store = new Confidence.Store(config);


exports.get = function (key) {

    return store.get(key, criteria);
};


exports.meta = function (key) {

    return store.meta(key, criteria);
};
