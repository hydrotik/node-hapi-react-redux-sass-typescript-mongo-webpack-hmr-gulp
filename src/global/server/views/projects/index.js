// var Routes = require('../../client/pages/login/Routes.jsx');

exports.register = function (plugin, options, next) {

    const context = { pagetitle: 'Steve' };

    plugin.route({
        method: 'GET',
        path: '/projects',
        handler: function(request, response) {
        	console.log('LOADING INDEX/HOME');
            response.view('projects/Index.jsx', context);

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
