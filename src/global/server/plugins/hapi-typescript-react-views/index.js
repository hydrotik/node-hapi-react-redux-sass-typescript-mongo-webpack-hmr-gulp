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
const colors = require('colors/safe');
const striptags = require('striptags');

const DEFAULTS = {
    doctype: '<!DOCTYPE html>',
    renderMethod: 'renderToStaticMarkup',
    removeCache: process.env.NODE_ENV !== 'production',
    experimentalDecorators: true,
    target:TypeScript.ScriptTarget.ES5,
    jsx: TypeScript.JsxEmit.React,
    module: TypeScript.ModuleKind.AMD,
    removeComments: true,
    consoleErrors: true,
    noEmit: false,
    outFile: 'build/servoutput.js'
};

let define;

const cols = (process.stdout && typeof process.stdout.getWindowSize === 'function') ? process.stdout.getWindowSize()[0] : 25;

let consoleErrors;

const compile = function compile(template, compileOpts) {

    compileOpts = Hoek.applyToDefaults(DEFAULTS, compileOpts);

    return function runtime(context, renderOpts) {

        renderOpts = Hoek.applyToDefaults(compileOpts, renderOpts);
        let output = renderOpts.doctype;
        let out;
        let errors = [];
        let fatalCount = 0;

        consoleErrors = compileOpts.consoleErrors;

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

                if(out.debug && out.debug != '') errors.push({runtime: getRuntimeError(out.debug)});
            });

        } catch (e) {
            if(out.debug && out.debug != '') errors.push({runtime: getRuntimeError(out.debug)});
            errors.unshift({fatal: getFatalError(e, compileOpts.filename)});
            fatalCount += 1;
        }

        define = null;

        if(errors.length){
            output += formatErrors(fatalCount, compileOpts.filename, errors);
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

    // TODO https://nodejs.org/api/fs.html#fs_fs_watch_filename_options_listener
    // This is for eventually caching the code and to also prevent production code from recompiling every page load
    /*
    fs.watch(fileNames[0], (event, filename) => {
        console.log(`event is: ${event}`);
        if (filename) {
            console.log(`filename provided: ${filename}`);
        } else {
            console.log('filename not provided');
        }
    });
    */

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
        let dbmessage = escapeHTML(message);
        debug += `${dir}/<span style="color: #993333; font-weight: bold;">${file}</span>\t\t<span style="font-weight: bold;">(${line + 1},${character + 1}): ${dbmessage}</span><br />`;
    });

    let exitCode = emitResult.emitSkipped ? 1 : 0;

    return {
        debug,
        emitResult,
        outputFiles
    };
}

const getModuleFromFullPath = function(p){
    return path.dirname(p).split('/').pop() + '/' + path.basename(p, '.tsx');
}

const formatErrors = function(fatal, path, errors){
    let m = getModuleFromFullPath(path);
    let output = '';

    // Complete HTML Page
    if(fatal){
        output += '<html><head><title>Error ' + m + '</title>';
        output += '<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">';
        output += '</head><body>';

    }

    output += '<div style="padding:16px; border-style: solid; border-color: red; border-width: 12px 0 0 0;">';
    //output += '<h3 style="color:red;">FILE</strong></h3>';
    //output += '<p>' + path + '</p>';
    output += '<h2 style="color:red;">ERRORS</strong></h2>';

    // Error List output
    output += '<pre style="background-color:#AAAAAA">';

    let runtimeCount = 0;
    let pageCount = 0;

    for(var i = 0; i < errors.length; i += 1) {
        let e = errors[i];
        for(let prop in e) {
            switch(prop){
                case 'runtime':
                    if(!runtimeCount) {
                        output += '<strong style="color:#993333;">Runtime Error</strong><br />';
                        runtimeCount += 1;
                    }
                    break;
                case 'fatal':
                    if(!pageCount){
                        output += '<strong style="color:#993333;">Fatal Error</strong><br />';
                        pageCount += 1;
                    }
                    break;
            }

            output += e[prop] + '<br />';
        }
        
    }

    // END Error List output
    output += '</pre>';

    // END Complete HTML Page
    if(fatal) output += '</body></html>';

    return output;
}

const getFatalError = function(error, p){
    if(consoleErrors){
        console.error(createConsoleHeader('Fatal Error'));
        console.error(error); // Error: L1: Type 'string' is not assignable to type 'number'.
    }
    let output = '';

    let dir = path.dirname(p);
    let file = path.basename(p);

    output += `${dir}/<span style="color: #993333; font-weight: bold;">${file}</span><br />`;
    output += '<strong>' + error + '</strong><br />';
    if (error.codeFrame != undefined || error.codeFrame != null) output += convert.toHtml(error.codeFrame) + '\n';
    return output;
}

const getRuntimeError = function(error){
    if(consoleErrors){
        console.error(createConsoleHeader('Runtime Error'));
        var regex = /<br\s*[\/]?>/gi;
        console.error(striptags(error.replace(regex, '\n'))); // Error: L1: Type 'string' is not assignable to type 'number'.
    }
    let output = '';
    output += error + '\n';
    return output;
}

const escapeHTML = function(s) { 
    return s.replace(/&/g, '&amp;')
            .replace(/"/g, '&quot;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
}

const createConsoleHeader = function(m){
    let o = '\n' + m + ' ';
    let delta = cols - (m.length + 1);
    for(let i = 0; i < delta; i += 1){
        o += '═';
    }
    return colors.red(o);
}

module.exports = {
    compile: compile
};