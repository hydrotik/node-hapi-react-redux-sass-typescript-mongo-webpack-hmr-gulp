/// <reference path="../../../../../typings/tsd.d.ts" />

import * as React from 'react';
//import Layout from '../layouts/Default.tsx';


interface IIndexProps {
    title?: string;
    activeTab?: string;
    js?: string;
    script?: any;
    children?: any;
    feet?: any;
}

class Index extends React.Component<IIndexProps, {}> {

    // FIXME Until I can get transpile API to import external modules, this is the crappy workaround
    public render(): React.ReactElement<{}> {

        const title = 'About Us';
        const script = <script src={this.props.js}></script>;
        const activeTab = 'about';

        return (
            <html>
                <head>
                    <title>TEST {title}</title>
                    <meta charSet="utf-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css" rel="stylesheet"></link>
                    <link href='https://fonts.googleapis.com/css?family=Varela+Round' rel='stylesheet' type='text/css'></link>
                    <link rel="shortcut icon" href="favicon.ico" />
                    </head>
                <body>
                    <div className="page">
                        <div className="container">
                <div id="app"></div>

                <div className="row">
                    <div className="col-sm-6">
                        <h1 className="page-header">About us</h1>
                        <div className="media">
                            <div className="pull-left">
                                <div className="media-object">
                                    <i className="fa fa-camera-retro fa-4x"></i>
                                    </div>
                                </div>
                            <div className="media-body">
                                <h4 className="media-heading">Leo Damon</h4>
                                <p>
                                    Cras sit amet nibh libero, in gravida
                                    nulla.Nulla vel metus scelerisque ante
                                    sollicitudin commodo.Cras purus odio,
                                    vestibulum in vulputate at, tempus viverra
                                    turpis.
                                    </p>
                                </div>
                            </div>
                        <div className="media text-right">
                            <div className="pull-right">
                                <div className="media-object">
                                    <i className="fa fa-camera-retro fa-4x"></i>
                                    </div>
                                </div>
                            <div className="media-body">
                                <h4 className="media-heading">Mathew DiCaprio</h4>
                                <p>
                                    Cras sit amet nibh libero, in gravida
                                    nulla.Nulla vel metus scelerisque ante
                                    sollicitudin commodo.Cras purus odio,
                                    vestibulum in vulputate at, tempus viverra
                                    turpis.
                                    </p>
                                </div>
                            </div>
                        <div className="media">
                            <div className="pull-left">
                                <div className="media-object">
                                    <i className="fa fa-camera-retro fa-4x"></i>
                                    </div>
                                </div>
                            <div className="media-body">
                                <h4 className="media-heading">Nick Jackson</h4>
                                <p>
                                    Cras sit amet nibh libero, in gravida
                                    nulla.Nulla vel metus scelerisque ante
                                    sollicitudin commodo.Cras purus odio,
                                    vestibulum in vulputate at, tempus viverra
                                    turpis.
                                    </p>
                                </div>
                            </div>
                        </div>
                    <div className="col-sm-6 text-center">
                        <h1 className="page-header">Prestige worldwide</h1>
                        <p className="lead">
                            The first name in entertainment.
                            </p>
                        <i className="fa fa-volume-up bamf"></i>
                    </div>
                </div>
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
                    {script}
                    {this.props.feet}
                    </body>
                </html>
        );
    }
}

export default Index;