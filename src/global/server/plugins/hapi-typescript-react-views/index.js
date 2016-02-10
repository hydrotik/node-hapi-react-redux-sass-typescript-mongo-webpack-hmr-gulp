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

                let program = TypeScript.createProgram(files, compileOpts);
                let emitResult = program.emit();

                console.log(emitResult);

                //let c = compileTypeScript(files, ['./src/global/server/views/home/'], compileOpts);

                

                //let Element = React.createFactory(tsexec);
                //let Element = React.createFactory(emitResult);

                //let ElContext = Element(context);

                

                output += '<pre>';

                for (var prop in emitResult) {
                    output += prop + ': ' + emitResult[prop] + '\r';
                }

                output +=  '</pre>'; //ReactDOMServer[compileOpTypeScript.renderMethod](ElContext);





            } catch (e) {
                console.error(e); // Error: L1: Type 'string' is not assignable to type 'number'.

                output += '<html><head><title>Error ' + compileOpts.filename + '</title>';
                output += '<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">';
                output += '</head><body><p>' + compileOpts.filename + '</p><p>';

                // for (var prop in e) {
                //     console.log(e[prop]);
                //     output += convert.toHtml(e[prop]);
                // }

                output += e.message;

                if(e.codeFrame != undefined || e.codeFrame != null) output += '<pre style="background-color:#666666">' + convert.toHtml(e.codeFrame) + '</pre>';

                output += '</p></body></html>';
            }
        
        return output;
    };
};

function createCompilerHost(options, moduleSearchLocations) {
    return {
        getSourceFile,
        getDefaultLibFileName: () => "lib.d.ts",
        writeFile,
        getCurrentDirectory: () => TypeScript.sys.getCurrentDirectory(),
        getCanonicalFileName: fileName => TypeScript.sys.useCaseSensitiveFileNames ? fileName : fileName.toLowerCase(),
        getNewLine: () => TypeScript.sys.newLine,
        useCaseSensitiveFileNames: () => TypeScript.sys.useCaseSensitiveFileNames,
        fileExists,
        readFile,
        resolveModuleNames
    }

    function writeFile(fileName, content) {
        let c = TypeScript.sys.writeFile(fileName, content);
        console.log(c);
        return c;
    }

    function fileExists(fileName) {
        let e = TypeScript.sys.fileExists(fileName);
        return e;
    }

    function readFile(fileName) {
        return TypeScript.sys.readFile(fileName);
    }

    function getSourceFile(fileName, languageVersion, onError) {
        const sourceText = TypeScript.sys.readFile(fileName);
        return sourceText !== undefined ? TypeScript.createSourceFile(fileName, sourceText, languageVersion) : undefined;
    }

    function resolveModuleNames(moduleNames, containingFile) {
        return moduleNames.map(moduleName => {
            // try to use standard resolution
            let result = TypeScript.resolveModuleName(moduleName, containingFile, options, {fileExists, readFile});
            if (result.resolvedModule) {
                return result.resolvedModule;
            }

            // check fallback locations, for simplicity assume that module at location should be represented by '.d.ts' file
            for (const location of moduleSearchLocations) {
                const modulePath = path.join(location, moduleName + ".d.ts");
                if (fileExists(modulePath)) {
                    return { resolvedFileName: modulePath }
                }
            } 

            return undefined;
        });
    }
}

function compileTypeScript(sourceFiles, moduleSearchLocations, compileOpts) {
    const options = compileOpts;
    const host = createCompilerHost(options, moduleSearchLocations);
    const program = TypeScript.createProgram(sourceFiles, options);

    return program;
}


module.exports = {
    compile: compile
};