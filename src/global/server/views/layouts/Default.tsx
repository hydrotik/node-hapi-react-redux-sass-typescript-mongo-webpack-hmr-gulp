/// <reference path="../../../../../typings/index.d.ts" />

import * as React from 'react';
import NavBar from './NavBar';

interface IDefaultProps {
    title?: string;
    activeTab?: string;
    js?: string;
    script?: any;
    children?: any;
}

class Layout extends React.Component<IDefaultProps, {}> {
    public render(): React.ReactElement<{}> {

        return (
            <html>
                <head>
                    <title>{this.props.title}</title>
                    <meta charSet="utf-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <link href="/layouts/default.min.css" rel="stylesheet"></link>
                    <link href='https://fonts.googleapis.com/css?family=Varela+Round' rel='stylesheet' type='text/css'></link>
                    <link rel="shortcut icon" href="favicon.ico" />

                </head>
                <body>
                    <NavBar activeTab={this.props.activeTab} />
                    <div className="page">
                        <div className="container">
                            {this.props.children}
                        </div>
                    </div>
                    <div className="footer">
                        <ul className="nav nav-inline">
                            <li className="nav-item">
                                <span className="nav-link">&copy; 2014 Acme, Inc.</span>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Link</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Link</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Another link</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link disabled" href="#">Disabled</a>
                            </li>
                        </ul>
                    </div>
                    {this.props.script}
                </body>
            </html>
        );
    }
}

export default Layout;