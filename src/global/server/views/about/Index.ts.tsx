/// <reference path="../../../../../typings/tsd.d.ts" />

import * as React from 'react';

interface IIndexProps {
    title?: string;
    js?: string;
}

class Index extends React.Component<IIndexProps, {}> {
    public render(): React.ReactElement<{}> {
        return (
            <html>
                <head>

                    <meta charSet="utf-8"></meta>
                    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"></meta>
                    <title>{this.props.title}</title>
                    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css" rel="stylesheet"></link>
                    <link href='https://fonts.googleapis.com/css?family=Varela+Round' rel='stylesheet' type='text/css'></link>
                </head>
                <body style={{ fontFamily: ['Varela Round', 'sans-serif'] }}>
                    <div id="app"></div>
                    {this.props.js}
                </body>
            </html>
        );
    }
}