# BASIC INSTALL STEPS
1. Clone repo with `git clone https://github.com/hydrotik/node-hapi-react-redux-sass-typescript-mongo-webpack-hmr-gulp --recursive`
2. Run `npm install`
3. Run `npm run dev` and visit http://localhost:8000/

# CREATING A PLUGIN
Assuming you have created a git repo for your plugin, you'll use git submodules to develop it
1. Run `git submodule add https://github.com/YOUR_PLUGIN_REPO plugins/YOUR_PLUGIN_REPO`
2. Run `git submodule update --init` to update all the plugins, including yours

# REGISTERING YOUR PLUGIN WITH HAPI
Go to the src/server/Manifest.js file and adding something like the below will usually suffice:
```
{
    "plugin": {
        "register": "../../node_modules/YOUR_PLUGIN_REPO",
        "select": ["web"],
        "routes": {
            "prefix": "/route_to_your_plugin"
        },
        "options": {
        }
    }
}
```

# PLUGIN CODE
See plugins/dashboard-component/src/server/index.js for an example of plugin code and see the hapi.js documentation

# INCLUDED PLUGINS
*contentedit* https://github.com/dhsaks/contentedit