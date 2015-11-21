exports.register = function (plugin, options, next) {

    plugin.route({
        method: 'GET',
        path: '/',
        handler: function(request, response) {
        	console.log('LOADING INDEX/HOME');
            response.view('home/Index.jsx');
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
