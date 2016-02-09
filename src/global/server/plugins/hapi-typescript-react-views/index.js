'use strict';

const Hoek = require('hoek');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const TypeScript = require('typescript');
const TypescriptSimple = require('typescript-simple');
const fs = require('fs');
const UglifyJS = require("uglify-js");

const Convert = require('ansi-to-html');
const convert = new Convert();

const DEFAULTS = {
    doctype: '<!DOCTYPE html>',
    renderMethod: 'renderToStaticMarkup',
    removeCache: process.env.NODE_ENV !== 'production',
    experimentalDecorators: true,
    target:TypeScript.ScriptTarget.ES5,
    jsx: TypeScript.JsxEmit.React,
    module: TypeScript.ModuleKind.CommonJS,
    removeComments: true,
    noEmit: true
};

const compile = function compile(template, compileOpts) {

    compileOpts = Hoek.applyToDefaults(DEFAULTS, compileOpts);

    return function runtime(context, renderOpts) {

        renderOpts = Hoek.applyToDefaults(compileOpts, renderOpts);

        let output = renderOpts.doctype;

        let Component = fs.readFileSync(compileOpts.filename).toString();

            try {
                let d = []; // for diagnostics

                //let tss =  TypeScript.transpile(Component, compileOpts, compileOpts.filename, d);
                //let tsexec =  eval(tss);

                let files = [];

                files.push(compileOpts.filename);

                // https://github.com/Microsoft/TypeScript/wiki/Using-the-Compiler-API#a-minimal-compiler
                // https://github.com/Microsoft/TypeScript/wiki/Compiler-Options
                // http://json.schemastore.org/tsconfig

                let program = TypeScript.createProgram(files, compileOpts);
                let emitResult = program.emit();

                console.log(emitResult);

                //let Element = React.createFactory(tsexec);
                let Element = React.createFactory(emitResult);

                let ElContext = Element(context);

                output += ReactDOMServer[compileOpts.renderMethod](ElContext);
            } catch (e) {
                console.error(e); // Error: L1: Type 'string' is not assignable to type 'number'.

                output += '<html><head><title>Error ' + compileOpts.filename + '</title>';
                output += '<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">';
                output += '</head><body><p>' + compileOpts.filename + '</p><p>';

                // for (var prop in e) {
                //   console.log(e[prop]);
                //   output += convert.toHtml(e[prop]);
                // }

                output += e.message;

                if(e.codeFrame != undefined || e.codeFrame != null) output += '<pre style="background-color:#666666">' + convert.toHtml(e.codeFrame) + '</pre>';

                output += '</p></body></html>';
            }
        
        return output;
    };
};


module.exports = {
    compile: compile
};