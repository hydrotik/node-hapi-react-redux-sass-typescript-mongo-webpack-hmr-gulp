/// <reference path="../../../../../typings/tsd.d.ts" />

import * as React from 'react';

interface IDefaultProps {
    title?: string;
    script?: any;
    styles?: any;
    children?: any;
}

class Component extends React.Component<IDefaultProps, {}> {
    public render(): React.ReactElement<{}> {

        return (
            <html>
                <head>
                    <title>{this.props.title}</title>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    { /* <link rel="stylesheet" href="/public/core.min.css" /> 
                    <link rel="shortcut icon" href="/public/media/favicon.ico" />
                    this.props.styles */ }
                    </head>
                <body>
                    {this.props.children}
                    { /* <script src="/public/core.min.js"></script> */ }
                    {this.props.script}
                    </body>
                </html>
        );
    }
}

export default Component;
