/// <reference path="../../../../../typings/tsd.d.ts" />

import * as React from 'react';
import Layout from '../layouts/Plain';

interface IIndexProps {
    js?: string;
}

class Index extends React.Component<IIndexProps, {}> {

    public render(): React.ReactElement<{}> {

        const styles = [
            <link key="layout" rel="stylesheet" href="/public/layouts/default.min.css" />,
            <link key="page" rel="stylesheet" href="/public/pages/account.min.css" />
        ];
        const script = <script src="/public/pages/account.min.js"></script>;

        return (
            <Layout
                title="Account"
                styles={styles}
                script={script}>

                <div id="app"></div>
            </Layout>
        );
    }
}

export default Index;