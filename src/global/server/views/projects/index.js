var Hoek = require('hoek');
var path = require('path');
var pkg = require('../../../../../package.json');
var util = require('util');
// var Routes = require('../../client/pages/login/Routes.jsx');

exports.register = function (plugin, options, next) {
    
    options = Hoek.applyToDefaults({ basePath: '' }, options);

    var js = options.artifactRoot + path.join('js', util.format(options.bundleName + '.%s.js', pkg.version))
    var css = options.artifactRoot + path.join('css', util.format(options.bundleName + '.%s.css', pkg.version));

    plugin.route({
        method: 'GET',
        path: '/project',
        handler: function(request, response) {
        	console.log('LOADING PROJECTS/INDEX');

            var props = {
                title: 'Projects Title',
                js: js,
                css: css
            }

            response.view('projects/Index.tsx', props);
        },
        config: {
            cors: true
        }
    });

    plugin.route({
        method: 'GET',
        path: '/project/{projectid}',
        handler: function(request, response) {
            console.log('LOADING PROJECTS/DETAIL');

            var props = {
                title : 'Project Title ' + request.params.projectid,
                js: js,
                css: css,
                projectid : request.params.projectid
            }

            response.view('projects/Index.tsx', props);

            /*
            Router.run(Routes, request.url.path, function (Handler) {

                var props = {something: 'nothing'};
                var component = React.createElement(Handler, props);
                var html = React.renderToString(component);
                reply(options.doctype + html);
            });
            */
        },
        config: {
            cors: true
        }
    });


    next();
};


exports.register.attributes = {
	pkg: require('./package.json')
};
