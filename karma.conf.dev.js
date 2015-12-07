var assign = require('lodash').assign;
var baseConfiguration = require('./karma.conf').baseConfiguration;

var devConfiguration = {
    browsers: ['Safari'],
    plugins: ['karma-phantomjs2-launcher'].concat(baseConfiguration.plugins),
    reporters: ['progress', 'notify', 'coverage'],
    singleRun: false
};

module.exports = function (config) {
    var configuration = assign({}, baseConfiguration, devConfiguration);
    config.set(configuration);
};
