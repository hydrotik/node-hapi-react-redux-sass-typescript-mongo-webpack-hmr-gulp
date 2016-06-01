/// <reference path="../../../../../typings/index.d.ts" />

import * as React from 'react';
import Layout from '../layouts/Default';

interface IIndexProps {
    js?: string;
}

class Index extends React.Component<IIndexProps, {}> {

    public render(): React.ReactElement<{}> {

        const script = <script src={this.props.js}></script>;
        // var script = <script src="/public/pages/signup.min.js"></script>;

        return (
            <Layout
                title="Sign up"
                script={script}
                activeTab="signup">

                <div className="row">
                    <div className="col-sm-6" id="app"></div>
                    <div className="col-sm-6 text-center">
                        <h1 className="page-header">Campy benefits</h1>
                        <p className="lead">
                            Really, you will love it inside.It's super great!
                            </p>
                        <i className="fa fa-thumbs-o-up bamf"></i>
                        </div>
                    </div>
                </Layout>
        );
    }
}

export default Index;