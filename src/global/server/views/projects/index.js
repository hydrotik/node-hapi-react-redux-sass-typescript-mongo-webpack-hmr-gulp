// var Routes = require('../../client/pages/login/Routes.jsx');

exports.register = function (plugin, options, next) {

    plugin.route({
        method: 'GET',
        path: '/project',
        handler: function(request, response) {
        	console.log('LOADING INDEX/HOME');

            var props = {
                title : 'Projects Title'
            }

            response.view('projects/Index.jsx', props);
        },
        config: {
            cors: true
        }
    });

    plugin.route({
        method: 'GET',
        path: '/project/{projectid}',
        handler: function(request, response) {
            console.log('LOADING INDEX/HOME');

            var props = {
                title : 'Project Title ' + request.params.projectid,
                projectid : request.params.projectid
            }

            response.view('projects/Project.jsx', props);

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
