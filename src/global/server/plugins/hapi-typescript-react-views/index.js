'use strict';

const Hoek = require('hoek');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const TypeScript = require('typescript');
const TypescriptSimple = require('typescript-simple');
const fs = require('fs');
const UglifyJS = require("uglify-js");
const path = require('path');
const C = require('ansi-to-html');
const convert = new C();

const DEFAULTS = {
    doctype: '<!DOCTYPE html>',
    renderMethod: 'renderToStaticMarkup',
    removeCache: process.env.NODE_ENV !== 'production',
    experimentalDecorators: true,
    target:TypeScript.ScriptTarget.ES5,
    jsx: TypeScript.JsxEmit.React,
    module: TypeScript.ModuleKind.AMD,
    removeComments: true,
    noEmit: false,
    outFile: 'output.js'
};

let define;

const compile = function compile(template, compileOpts) {

    compileOpts = Hoek.applyToDefaults(DEFAULTS, compileOpts);

    return function runtime(context, renderOpts) {

        renderOpts = Hoek.applyToDefaults(compileOpts, renderOpts);
        let output = renderOpts.doctype;

        try {
            // https://github.com/Microsoft/TypeScript/wiki/Using-the-Compiler-API#a-minimal-compiler
            // https://github.com/Microsoft/TypeScript/wiki/Compiler-Options
            // http://json.schemastore.org/tsconfig

            let files = [];
            files.push(compileOpts.filename);

            let out = compileTypeScript(files, compileOpts);

            if (typeof define !== 'function') {
                define = require('amdefine')(module)
            };

            let san = out.outputFiles[0].text;

            let m = path.dirname(compileOpts.filename).split('/').pop() + '/' + path.basename(compileOpts.filename, '.tsx')
            console.log(m);

            let tsexec = eval(san);

            define(function(require) {
                var dep = require(m);

                let Element = React.createFactory(dep.default);

                let ElContext = Element(context);

                output += ReactDOMServer[compileOpts.renderMethod](ElContext);
            });

            define = null;

        } catch (e) {
            console.error(e); // Error: L1: Type 'string' is not assignable to type 'number'.

            output += '<html><head><title>Error ' + compileOpts.filename + '</title>';
            output += '<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">';
            output += '</head><body style="padding:12px;"><p>' + compileOpts.filename + '</p><p>';
            output += '<strong>ERROR</strong><br />';
            output += '<pre style="background-color:#999999">' + e.message + '</pre>';

            if (e.codeFrame != undefined || e.codeFrame != null) output += '<pre style="background-color:#999999">' + convert.toHtml(e.codeFrame) + '</pre>';

            output += '</p></body></html>';
        }

        return output;
    };

};

function compileTypeScript(fileNames, options) {

    function writeFile(fileName, data, writeByteOrderMark) {
        outputFiles.push({
            sourceName: fileName,
            name: fileName,
            writeByteOrderMark: writeByteOrderMark,
            text: data
        });
    }

    let outputFiles = [];

    let program = TypeScript.createProgram(fileNames, options);

    let source = program.getSourceFile(fileNames[0]);

    let emitResult = program.emit(source, writeFile);

    let allDiagnostics = TypeScript.getPreEmitDiagnostics(program).concat(emitResult.diagnostics);

    let debug = '';

    allDiagnostics.forEach(diagnostic => {
        let d = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start);
        let line = d.line;
        let character = d.character;
        let message = TypeScript.flattenDiagnosticMessageText(diagnostic.messageText, '\n');
        console.log(`${diagnostic.file.fileName} (${line + 1},${character + 1}): ${message}`);
        debug += `${diagnostic.file.fileName} (${line + 1},${character + 1}): ${message}`;
    });

    let exitCode = emitResult.emitSkipped ? 1 : 0;
    console.log(`Process exiting with code '${exitCode}'.`);

    return {
        debug,
        emitResult,
        outputFiles
    };
}

const register = function(d){
    define = d;
}

module.exports = {
    compile: compile
};