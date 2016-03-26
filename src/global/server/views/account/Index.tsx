/// <reference path="../../../../../typings/main.d.ts" />

import * as React from 'react';
import Layout from '../layouts/Plain';

interface IIndexProps {
    js?: string;
}

class Index extends React.Component<IIndexProps, {}> {

    public render(): React.ReactElement<{}> {
        
        const styles = [
            <link key="layout" rel="stylesheet" href="layouts/default.min.css" />,
            <link key="page" rel="stylesheet" href="pages/account.min.css" />
        ];
        
        const script = <script src={this.props.js}></script>;

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