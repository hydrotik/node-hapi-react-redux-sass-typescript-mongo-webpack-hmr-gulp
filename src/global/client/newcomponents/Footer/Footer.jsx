import './_Footer.scss';
import React, { Component } from 'react';

const displayName = 'Footer';

export default class Footer extends Component {
    render() {
        const year = (new Date()).getFullYear();
        return (
            <footer className="footer">
                &copy; Your Company&nbsp;{year}
            </footer>
        );
    }
}

Footer.displayName = displayName;
