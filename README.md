# Watts
The F√©k $#!† St∆ck. **This is a VERY rough and in progress project in it's early stages, but it does already bring a number of technologies together for proving compatibility.**

At the moment I am using awesome-typescript-loader, but I plan on testing ts-loader as well. A big portion of my work at the moment is centered around animation and rendering performance. Once that is complete, I will continue to incorporate backend and micro service based communication between front and back. If you are considering running this project, feel free to reach out to me as docs are lacking and the struggle is real.

**At the moment this project needs mongo running. To do this you can install and setup a new aqua project and copy the data folder over into this project.** 

#### Run

```
npm install
npm start
```

#### Develop

Webpack auto-watches client assets.
Nodemon auto-watches server assets.

```
npm install
npm run dev
```

#### Build

Bundle the assets for production.

```
npm run build
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