'use strict';

const Hoek = require('hoek');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const TypeScript = require('typescript');
const TypescriptSimple = require('typescript-simple');
const fs = require('fs');
const UglifyJS = require("uglify-js");

const TypescriptOptions = require('../../../../../tsconfig.json');
const vm = require('vm');

// https://github.com/Microsoft/TypeScript/issues/5152
// https://github.com/Microsoft/TypeScript/wiki/Using-the-Compiler-API#transpiling-single-file

//require('ts-node/register');




const EXT_REGEX = new RegExp('\\.tsx$');

const DEFAULTS = {
    doctype: '<!DOCTYPE html>',
    renderMethod: 'renderToStaticMarkup',
    removeCache: process.env.NODE_ENV !== 'production',
    removeComments: true,
    jsx : "react",
    experimentalDecorators: true,
    module : "commonjs"
};

const compile = function compile(template, compileOpts) {
    console.log('\n\nHapi Typescript ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::');
    //compileOpts = Hoek.applyToDefaults(TypescriptOptions, compileOpts);
    compileOpts = Hoek.applyToDefaults(DEFAULTS, compileOpts);

    return function runtime(context, renderOpts) {

        renderOpts = Hoek.applyToDefaults(compileOpts, renderOpts);

        let output = renderOpts.doctype;
        console.log('\n\nrenderOpts.doctype ======================================================================');
        console.log(compileOpts.filename);

        // let c = require(compileOpts.filename);
        //console.log('\n\ncontext =================================================================================');
        //console.log(context);

        // var rcrf = React.createElement(c);
        // console.log('\n\nrcrf =================================================================================');
        // console.log(rcrf);

        let Component = fs.readFileSync(compileOpts.filename).toString();

            //console.log('\n\ntranspiling typescript');

            let compilerOptions =  {
                target:TypeScript.ScriptTarget.ES5,
                jsx: TypeScript.JsxEmit.React,
                module: TypeScript.ModuleKind.CommonJS,
                removeComments: true
            };

            try {
                let d = []; // for diagnostics

                var m = require('module');

                let tss =  TypeScript.transpile(Component, compilerOptions, compileOpts.filename, d);

                let tsexec =  eval(tss);

                let Element = React.createFactory(tsexec);

                let ElContext = Element(context);

                console.log('\n\nReactDOMServer.renderToStaticMarkup() ====================================================');
                let o = ReactDOMServer.renderToStaticMarkup(ElContext);
                console.log(o);
                output += o;
                console.log('\n\noutput ===================================================================================');
                console.log(output);
            } catch (e) {
                console.error(e); // Error: L1: Type 'string' is not assignable to type 'number'.
            }
        
        return output;
        
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