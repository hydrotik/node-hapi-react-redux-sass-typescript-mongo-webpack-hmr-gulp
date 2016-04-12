# Watts
**The F√©k $#!† St∆ck.**

Rapid prototyping full stack framework using our favorite technologies. Inspired by [Aqua](https://github.com/jedireza/aqua)/[Frame](https://github.com/jedireza/frame) with a sprinkle of Mean.io and Mean.js

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
* Using awesome-typescript-loader for Webpack
* Using hapi-typescript-views module

**Working/Completed Sections**

**Roadmap**
* Extensible styling
* Admin Dashboard via bootstrap. Started converting [AdminLTE](https://almsaeedstudio.com/preview) over to React
* Feasibility of using either React or Angular as rendering framework

#### Run

* Be sure you clear your localhost cookies before running the project
* When you do run setup, be sure to have Mongo Running. After config setup is complete, you can stop Mongo and npm run watch will automatically start Mongo

```bash
git clone https://github.com/hydrotik/node-hapi-react-redux-sass-typescript-mongo-webpack-hmr-gulp.git wattsproject
cd wattsproject
npm run setup -s
npm run watch
```
