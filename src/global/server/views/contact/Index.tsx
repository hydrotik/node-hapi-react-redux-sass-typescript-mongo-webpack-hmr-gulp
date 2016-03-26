/// <reference path="../../../../../typings/main.d.ts" />

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
                title="Contact us"
                activeTab="contact"
                script={script}>

                <div className="row">
                    <div className="col-sm-6" id="app"></div>
                    <div className="col-sm-6 text-center">
                        <h1 className="page-header">Contact us</h1>
                        <p className="lead">
                            Freddy can't wait to hear from you.
                        </p>
                        <i className="fa fa-reply-all bamf"></i>
                        <div>
                            1428 Elm Street &bull; San Francisco, CA 94122
                        </div>
                    </div>
                </div>
            </Layout>
        );
    }
}

export default Index;