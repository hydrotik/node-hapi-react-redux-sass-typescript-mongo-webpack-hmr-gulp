import 'babel-core/polyfill';

let context = require.context('.', true, /-test\.tsx?$/);
context.keys().forEach(context);
