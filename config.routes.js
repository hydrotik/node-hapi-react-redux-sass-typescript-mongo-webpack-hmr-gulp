var Config = require('./config');
var pkg = require('./package');

var helpers = {
    artifactRoot : process.env.NODE_ENV === 'production' ? '' : 'http://' + Config.get('/devHost') + ':' + Config.get('/webpackPort') + '/'
}

var routes = {
    './global/server/views/home': Object.assign({bundleName: 'app'}, Config, pkg.config, helpers),
    './global/server/views/about': Object.assign({bundleName: 'app'}, Config, pkg.config, helpers),
    './global/server/views/signup': Object.assign({bundleName: 'app'}, Config, pkg.config, helpers),
    './global/server/views/account': Object.assign({bundleName: 'app'}, Config, pkg.config, helpers),
    './global/server/views/admin': Object.assign({bundleName: 'app'}, Config, pkg.config, helpers),
    './global/server/views/login': Object.assign({bundleName: 'app'}, Config, pkg.config, helpers)
}

exports.routes = routes;