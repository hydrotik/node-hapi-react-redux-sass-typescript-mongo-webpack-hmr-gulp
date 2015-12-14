// Default layout template

var React = require('react');
var path = require('path');
var pkg = require('../../../../../package.json');
var util = require('util');

var Navigation = React.createClass({

    render: function() {

        return(
            <ul></ul>
        );
    }
});

module.exports = Navigation;