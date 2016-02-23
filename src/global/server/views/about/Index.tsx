/// <reference path="../../../../../typings/tsd.d.ts" />

import * as React from 'react';
import Layout from '../layouts/Default';

interface IIndexProps {
    js?: string;
}

class Index extends React.Component<IIndexProps, {}> {

    public render(): React.ReactElement<{}> {

        const script = <script src={this.props.js}></script>;

        return (
            <Layout
                title="About Us"
                script={script}
                activeTab="about">

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
            </Layout>
        );
    }
}

export default Index;