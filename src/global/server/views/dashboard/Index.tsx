/// <reference path="../../../../../typings/index.d.ts" />

import * as React from 'react';
import Layout from '../layouts/Plain';

interface IIndexProps {
    js?: string;
    css?: string;
}

// TODO: Cleanup how styles+css are passed to Layout
class Index extends React.Component<IIndexProps, {}> {

    public render(): React.ReactElement<{}> {
        
        const styles = [
            <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css" rel="stylesheet" />,
            <link type="text/css" key="font-awesome" rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.5.0/css/font-awesome.min.css" />,
            <link type="text/css" key="ionicons" rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/ionicons/2.0.1/css/ionicons.min.css" />,
            
        ];
        
        const css = this.props.css ? [<link type="text/css" rel="stylesheet" href={this.props.css} />] : [];
        
        const script = <script src={this.props.js}></script>;
        
        return (
            <Layout
                title="Admin"
                styles={styles.concat(css)}
                script={script}>

                <div id="app"></div>
            </Layout>
        );
    }
}

export default Index;