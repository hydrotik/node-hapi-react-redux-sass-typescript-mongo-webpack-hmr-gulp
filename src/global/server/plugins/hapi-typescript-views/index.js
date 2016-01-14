'use strict';

const Hoek = require('hoek');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const TypeScript = require('typescript');
const TypescriptSimple = require('typescript-simple');
const fs = require('fs');
const UglifyJS = require("uglify-js");

const TypescriptOptions = require('../../../../../tsconfig.json');

// https://github.com/Microsoft/TypeScript/issues/5152
// https://github.com/Microsoft/TypeScript/wiki/Using-the-Compiler-API#transpiling-single-file

const EXT_REGEX = new RegExp('\\.tsx$');

const DEFAULTS = {
    doctype: '<!DOCTYPE html>',
    renderMethod: 'renderToStaticMarkup',
    removeCache: process.env.NODE_ENV !== 'production'
};

const compile = function compile(template, compileOpts) {
    console.log('Hapi Typescript:::::::::');
    compileOpts = Hoek.applyToDefaults(TypescriptOptions, compileOpts);
    compileOpts = Hoek.applyToDefaults(DEFAULTS, compileOpts);

    return function runtime(context, renderOpts) {

        renderOpts = Hoek.applyToDefaults(compileOpts, renderOpts);

        let output = renderOpts.doctype;

        console.log(compileOpts.filename);

        //let Component = require(compileOpts.filename);

        fs.readFile(compileOpts.filename, function (err, data) {
            if (err) {
                throw err; 
            }
            let Component = data.toString();

            console.log('transpiling typescript');

            try {
                // let tsoutput = TypescriptSimple(Component);
                let tsoutput = TypeScript.transpile(Component, compileOpts, /*fileName*/ compileOpts.filename, /*diagnostics*/ undefined);

                let Element = React.createFactory(tsoutput);
                console.log('Element =======================================================');
                // console.log(Element);
                let ElContext = Element(context);
                console.log('Element Context ===============================================');
                // console.log(ElContext);


                // output += '<html><head><title>OUTPUT HERE HELLO WORLD</title></head></html>';


                let o = ReactDOMServer.renderToStaticMarkup(ElContext);
                console.log('o');
                console.log(o);
                output += o;
                console.log('output ========================================================');
                console.log(output);
            } catch (e) {
                console.error(e); // Error: L1: Type 'string' is not assignable to type 'number'.
            }

            return output;

        });

        
        /*

        // support es6 default export semantics
        //Component = Component.default || Component;

        //let Element = React.createFactory(Component);
        
        console.log('transpiling typescript');
        try {
            let Element = TypescriptSimple(Component);
            console.log(Element);
        } catch (e) {
            console.error(e); // Error: L1: Type 'string' is not assignable to type 'number'.
        }

        
        // output += ReactDOMServer[renderOpts.renderMethod](Element(context));
        output += Element;

        // transpilers tend to take a long time to start up, so we delete react
        // modules from the cache so we don't need to restart to see view
        // changes (unless we're in production silly)
        if (renderOpts.removeCache) {
            Component = undefined;
            Element = undefined;

            Object.keys(require.cache).forEach((module) => {

                if (EXT_REGEX.test(module)) {
                    delete require.cache[module];
                }
            });
        }
        

        return output;
        */
    };
};


module.exports = {
    compile: compile
};