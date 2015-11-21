# Watts
The F√©k $#!† St∆ck

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