/// <reference path="../../../../../typings/main.d.ts" />

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
                    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css" rel="stylesheet"></link>
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
                        <div className="container">
                            <span className="copyright pull-right">
                                &copy; 2014 Acme, Inc.
                            </span>
                            <ul className="links">
                                <li><a href="/">Home</a></li>
                                <li><a href="/contact">Contact</a></li>
                            </ul>
                            <div className="clearfix"></div>
                        </div>
                    </div>
                    {this.props.script}
                </body>
            </html>
        );
    }
}

export default Layout;