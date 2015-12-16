{
    // API
    './global/server/api/index': Object.assign({bundleName: 'app'}, Config, pkg.config, helpers),

    // ROUTES
    './global/server/views/home': Object.assign({bundleName: 'app'}, Config, pkg.config, helpers),
    './global/server/views/projects': Object.assign({bundleName: 'app'}, Config, pkg.config, helpers)
}