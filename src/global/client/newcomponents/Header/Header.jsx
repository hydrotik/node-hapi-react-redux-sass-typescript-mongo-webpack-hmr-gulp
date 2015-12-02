import './_Header.scss';
import React from 'react';

const { Component } = React;

const displayName = 'Header';

export default class Header extends Component {

    render() {
        return (
            <div className="header">
                <h1>Hello World</h1>
            </div>
        );
    }

}

Header.displayName = displayName;
