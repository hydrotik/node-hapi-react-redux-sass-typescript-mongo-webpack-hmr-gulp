exports.register = function (plugin, options, next) {
    /*
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
    */

    plugin.route({
        method: 'GET',
        path: '/isomorphic/{route*}',
        handler: {
          react: {
            relativeTo: `${__dirname}/app`,
            router: 'routes.js',
            layout: 'layout.jsx' || 'myLayoutMethod',
            props: {
              '/': 'myIndexMethod',
              '/about': 'myAboutMethod'
            }
          }
        }
      });


    next();


};


exports.register.attributes = {
    pkg: require('./package.json')
};
