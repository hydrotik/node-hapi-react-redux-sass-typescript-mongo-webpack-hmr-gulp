var Config = require('./config');
var pkg = require('./package');

var helpers = {
    artifactRoot : process.env.NODE_ENV === 'production' ? '' : 'http://' + Config.get('/devHost') + ':' + Config.get('/webpackPort') + '/'
}

var routes = [
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

exports.routes = routes;