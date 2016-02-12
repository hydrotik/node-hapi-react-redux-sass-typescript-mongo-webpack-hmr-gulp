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
    module: TypeScript.ModuleKind.AMD,
    removeComments: true,
    noEmit: false,
    outFile: 'output.js'
};

const compile = function compile(template, compileOpts) {

    compileOpts = Hoek.applyToDefaults(DEFAULTS, compileOpts);

    return function runtime(context, renderOpts) {

        renderOpts = Hoek.applyToDefaults(compileOpts, renderOpts);

        let output = renderOpts.doctype;

        //let Component = fs.readFileSync(compileOpTypeScript.filename).toString();

            try {
                let d = []; // for diagnostics

                //let tss =  TypeScript.transpile(Component, compileOpts, compileOpTypeScript.filename, d);
                //let tsexec =  eval(tss);

                

                // https://github.com/Microsoft/TypeScript/wiki/Using-the-Compiler-API#a-minimal-compiler
                // https://github.com/Microsoft/TypeScript/wiki/Compiler-Options
                // http://json.schemastore.org/tsconfig

                let files = [];
                files.push(compileOpts.filename);

                //let program = TypeScript.createProgram(files, compileOpts);
                //let emitResult = program.emit();

                

                let out = compileTypeScript(files, compileOpts);

                console.log(out.emitResult);
                

                //let Element = React.createFactory(tsexec);
                //let Element = React.createFactory(emitResult);

                //let ElContext = Element(context);

                

                output += '<p>';

                output += out.debug;

                for (var prop in out.emitResult) {
                    output += prop + ': ' + out.emitResult[prop] + '\r';
                }


                output +=  '</p>'; //ReactDOMServer[compileOpTypeScript.renderMethod](ElContext);





            } catch (e) {
                console.error(e); // Error: L1: Type 'string' is not assignable to type 'number'.

                output += '<html><head><title>Error ' + compileOpts.filename + '</title>';
                output += '<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">';
                output += '</head><body><p>' + compileOpts.filename + '</p><p>';

                // for (var prop in e) {
                //     console.log(e[prop]);
                //     output += convert.toHtml(e[prop]);
                // }
                output += 'ERROR!!!!!';
                output += e.message;

                if(e.codeFrame != undefined || e.codeFrame != null) output += '<pre style="background-color:#666666">' + convert.toHtml(e.codeFrame) + '</pre>';

                output += '</p></body></html>';
            }
        
        return output;
    };
};

function compileTypeScript(fileNames, options) {
    let program = TypeScript.createProgram(fileNames, options);
    let emitResult = program.emit();

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
        emitResult
    };
}


module.exports = {
    compile: compile
};