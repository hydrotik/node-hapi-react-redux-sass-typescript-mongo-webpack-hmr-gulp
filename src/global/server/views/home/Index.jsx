// Default layout template

var React = require('react');
var path = require('path');
var pkg = require('../../../../../package.json');
var util = require('util');

var Index = React.createClass({

    render: function() {

        var js = 'http://localhost:8080/' + path.join('js', util.format('app.%s.js', pkg.version))
        var css = 'http://localhost:8080/' + path.join('css', util.format('app.%s.css', pkg.version));

        return(
            <html>
                <head>

                    <meta charSet="utf-8"></meta>
                    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"></meta>
                    <title>Boilerplate Test Again</title>
                    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css" rel="stylesheet"></link>
                    <link href='https://fonts.googleapis.com/css?family=Varela+Round' rel='stylesheet' type='text/css'></link>
                </head>
                <body style={{fontFamily: ['Varela Round', 'sans-serif']}}>
                    <div id="app"></div>
                    <script src={js}></script>
                </body>
            </html>
        );
    }
});

module.exports = Index;