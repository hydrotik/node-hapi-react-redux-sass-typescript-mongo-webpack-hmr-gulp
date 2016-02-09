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
                title="Home"
                script={script}
                activeTab="home">

                <div id="app"></div>

                <div className="jumbotron">
                    <h1>Success</h1>
                    <div className="lead">
                        Your Node.js website and user system is running.May
                        the force be with you.

                        <div>
                            <a className="btn btn-primary btn-lg" href="/signup">
                                Create an account
                                </a>
                            &nbsp; or &nbsp;
                            <a className="btn btn-warning btn-lg" href="/login/forgot">
                                Reset your password
                                </a>
                            </div>
                        </div>
                    </div>
                <div className="row">
                    <div className="col-sm-4">
                        <div className="panel panel-default">
                            <div className="panel-body">
                                <h3>About us</h3>
                                <p>
                                    At vero eos et accusamus et iusto odio
                                    dignissimos ducimus qui blanditiis
                                    praesentium voluptatum deleniti atque
                                    corrupti.
                                    </p>
                                <a href="/about" className="btn btn-default btn-block">
                                    Learn more
                                    </a>
                                </div>
                            </div>
                        </div>
                    <div className="col-sm-4">
                        <div className="panel panel-default">
                            <div className="panel-body">
                                <h3>Sign up</h3>
                                <p>
                                    At vero eos et accusamus et iusto odio
                                    dignissimos ducimus qui blanditiis
                                    praesentium voluptatum deleniti atque
                                    corrupti.
                                    </p>
                                <a href="/signup" className="btn btn-default btn-block">
                                    Learn more
                                    </a>
                                </div>
                            </div>
                        </div>
                    <div className="col-sm-4">
                        <div className="panel panel-default">
                            <div className="panel-body">
                                <h3>Contact us</h3>
                                <p>
                                    At vero eos et accusamus et iusto odio
                                    dignissimos ducimus qui blanditiis
                                    praesentium voluptatum deleniti atque
                                    corrupti.
                                    </p>
                                <a href="/contact" className="btn btn-default btn-block">
                                    Learn more
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </Layout>
        );
    }
}

export default Index;