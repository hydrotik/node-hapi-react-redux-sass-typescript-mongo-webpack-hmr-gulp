# Watts
The F√©k $#!† St∆ck. **This is a VERY rough and in progress project in it's early stages, but it does already bring a number of technologies together for proving compatibility.**

At the moment I am using awesome-typescript-loader, but I plan on testing ts-loader as well. Once that is complete, I will continue to incorporate backend and micro service based communication between front and back. If you are considering running this project, feel free to reach out to me as docs are lacking and the struggle is real.

**Requirements**
* NVM is recommended
* Node 4 or greater
* NPM 3.2 or greater

**Working Features**
* Server and client side React using Typescript (TSX)
* Webpack on client side React using Typescript (TSX)
* Hot Module Reload (HMR) on client side using Webpack
* Simple Redux implementation using globals spanning across multiple pages and locals using in index within pages
* Setup using bash scripts
* Setup using Promptly for setting up manifest config
* Currently using awesome-typescript-loader for Webpack
* Using hapi-typescript-views module

**Working/Completed Sections**
* Signup

#### Run

```bash
git clone https://github.com/hydrotik/node-hapi-react-redux-sass-typescript-mongo-webpack-hmr-gulp.git wattsproject
cd wattsproject
npm run setup -s
npm run watch
```


**awesome-typescript-loader**
```json
{
  "compilerOptions": {
    "target" : "ES5",
    "jsx" : "react",
    "sourceMap": true,
    "emitRequireType": false,
    "experimentalDecorators": false,
    "module" : "commonjs"
  },
  "exclude" : ["node_modules", "config", "dev_server.js"]
}
```

**ts-loader**
```json
{
  "compilerOptions": {
    "target" : "ES5",
    "jsx" : "react",
    "sourceMap": true
  },
  "exclude" : ["node_modules", "config", "dev_server.js"]
}
```