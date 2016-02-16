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
        let out;
        try {
            // https://github.com/Microsoft/TypeScript/wiki/Using-the-Compiler-API#a-minimal-compiler
            // https://github.com/Microsoft/TypeScript/wiki/Compiler-Options
            // http://json.schemastore.org/tsconfig

            let files = [];
            files.push(compileOpts.filename);

            out = compileTypeScript(files, compileOpts);

            if (typeof define !== 'function') {
                define = require('amdefine')(module)
            };

            let san = out.outputFiles[0].text;

            let m = getModuleFromFullPath(compileOpts.filename);

            let tsexec = eval(san);

            define(function(require) {
                var dep = require(m);

                let Element = React.createFactory(dep.default);

                let ElContext = Element(context);

                output += ReactDOMServer[compileOpts.renderMethod](ElContext);

                if(out.debug && out.debug != '') output += handleRuntimeError(out.debug, compileOpts.filename);
            });

        } catch (e) {
            let rt = (out.debug && out.debug != '') ? handleRuntimeError(out.debug, compileOpts.filename) : '';
            output += handlePageError(e, compileOpts.filename, rt);
        }

        define = null;

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

    //TODO https://nodejs.org/api/fs.html#fs_fs_watch_filename_options_listener
    fs.watch(fileNames[0], (event, filename) => {
        console.log(`event is: ${event}`);
        if (filename) {
            console.log(`filename provided: ${filename}`);
        } else {
            console.log('filename not provided');
        }
    });

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
        let dir = path.dirname(diagnostic.file.fileName);
        let file = path.basename(diagnostic.file.fileName);
        console.log(`${diagnostic.file.fileName} (${line + 1},${character + 1}): ${message}`);
        debug += `${dir}/<span style="color: #993333; font-weight: bold;">${file}</span>\t\t<span style="font-weight: bold;">(${line + 1},${character + 1}): ${message}</span><br />`;
    });

    let exitCode = emitResult.emitSkipped ? 1 : 0;
    console.log(`Process exiting with code '${exitCode}'.`);

    return {
        debug,
        emitResult,
        outputFiles
    };
}

const getModuleFromFullPath = function(p){
    return path.dirname(p).split('/').pop() + '/' + path.basename(p, '.tsx');
}

const handlePageError = function(error, path, runtime){
    console.error(error); // Error: L1: Type 'string' is not assignable to type 'number'.
    let m = getModuleFromFullPath(path);
    let output = '';

    output += '<html><head><title>Error ' + m + '</title>';
    output += '<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">';
    output += '</head><body style="padding:12px;">';
    output += '<h3 style="color:red;" >FILE</strong></h3>';
    output += '<p>' + path + '</p>';
    output += '<h2 style="color:red;" >ERROR</strong></h2>';
    output += '<pre style="background-color:#AAAAAA">' + error.message + '</pre>';

    if(runtime != '') output += runtime;

    if (error.codeFrame != undefined || error.codeFrame != null) output += '<pre style="background-color:#999999">' + convert.toHtml(error.codeFrame) + '</pre>';

    output += '</p></body></html>';


    return output;
}

const handleRuntimeError = function(error, path){
    console.error(error); // Error: L1: Type 'string' is not assignable to type 'number'.
    let m = getModuleFromFullPath(path);
    let output = '';

    output += '<div style="padding:16px; border-style: solid; border-color: red; border-width: 12px 0 0 0;">'
    output += '<h3 style="color:red;" >FILE</strong></h3>';
    output += '<p>' + path + '</p>';
    output += '<h2 style="color:red;" >ERROR</strong></h2>';
    output += '<pre style="background-color:#AAAAAA">' + error + '</pre></div>';


    return output;
}

module.exports = {
    compile: compile
};