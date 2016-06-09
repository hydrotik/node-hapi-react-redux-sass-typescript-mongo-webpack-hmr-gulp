/// <reference path="../../../../../typings/index.d.ts" />

import * as React from 'react';
import Layout from '../layouts/Plain';

interface IIndexProps {
    js?: string;
}

class Index extends React.Component<IIndexProps, {}> {

    public render(): React.ReactElement<{}> {

        const styles: React.ReactElement<{}>[] = [
            <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css" rel="stylesheet" />,

            <link key="page" rel="stylesheet" href="pages/admin.min.css" />,
        ];

        const script: React.ReactElement<{}> = <script src={this.props.js}></script>;

        return (
            <Layout
                title="Admin"
                styles={styles}
                script={script}>

                <div id="app"></div>
            </Layout>
        );
    }
}

export default Index;