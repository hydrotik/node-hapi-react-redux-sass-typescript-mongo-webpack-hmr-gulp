var Config = require('./config');
var pkg = require('./package');

var helpers = {
    artifactRoot : process.env.NODE_ENV === 'production' ? '' : 'http://' + Config.get('/devHost') + ':' + Config.get('/webpackPort') + '/'
}

var routes = {
    // API
    './global/server/api/index': Object.assign({bundleName: 'app'}, Config, pkg.config, helpers),

    // ROUTES
    './global/server/views/home': Object.assign({bundleName: 'app'}, Config, pkg.config, helpers),
    './global/server/views/projects': Object.assign({bundleName: 'app'}, Config, pkg.config, helpers)
}

exports.routes = routes;