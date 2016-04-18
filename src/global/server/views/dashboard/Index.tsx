/// <reference path="../../../../../typings/main.d.ts" />

import * as React from 'react';
import Layout from '../layouts/Plain';

interface IIndexProps {
    js?: string;
}

class Index extends React.Component<IIndexProps, {}> {

    public render(): React.ReactElement<{}> {
        
        const styles = [
            <link type="text/css" key="font-awesome" rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.5.0/css/font-awesome.min.css" />,
            <link type="text/css" key="ionicons" rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/ionicons/2.0.1/css/ionicons.min.css" />,
            <link type="text/css" key="dashboard" rel="stylesheet" href="/assets/dashboard/dashboard.min.css" />,
        ];
        
        const script = <script src={this.props.js}></script>;

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