/// <reference path="../../../../../typings/index.d.ts" />

import * as React from 'react';
import Layout from '../layouts/Plain';

interface IIndexProps {
    js?: string;
    css?: string;
}

class Index extends React.Component<IIndexProps, {}> {

    public render(): React.ReactElement<{}> {

        const styles: React.ReactElement<{}>[] = [
            <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css" rel="stylesheet" />,

        ];
        
        const css = this.props.css ?  [<link rel="stylesheet" href={this.props.css} />] : [];

        const script: React.ReactElement<{}> = <script src={this.props.js}></script>;

        return (
            <Layout
                title="Admin"
                styles={[].concat(styles).concat(css)}
                script={script}>

                <div id="app"></div>
            </Layout>
        );
    }
}

export default Index;