/// <reference path="../../../../../typings/index.d.ts" />

import * as React from 'react';
const objectAssign = require('object-assign');

interface IDefaultProps {
    title?: string;
    script?: React.ReactElement<any>[];
    styles?: React.ReactElement<any>[];
    activeTab?: string;
}

class Component extends React.Component<IDefaultProps, any> {
    public static defaultStylesheets: React.ReactElement<any>[] = [
        <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css" rel="stylesheet" />,
        <link href="https://fonts.googleapis.com/css?family=Varela+Round" rel="stylesheet" type="text/css" />,
    ];

    public static defaultScripts: React.ReactElement<any>[] = [];

    constructor(props: IDefaultProps) {
        super(objectAssign({ script: [], styles: [] }, props));
    }

    public render(): React.ReactElement<any> {
        return (
            <html>
                <head>
                    <title>{this.props.title}</title>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <link rel="shortcut icon" href="/favicon.ico" />
                    {this.props.styles}
                </head>
                <body className="hold-transition skin-blue sidebar-mini">
                    {this.props.children}
                    {this.props.script}
                </body>
            </html>
        );
    }
}

export default Component;
