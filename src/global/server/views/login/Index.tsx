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
                title="Sign In"
                script={script}
                activeTab="login">

                <div className="row">
                    <div className="col-sm-6" id="app"></div>
                </div>
            </Layout>
        );
    }
}

export default Index;