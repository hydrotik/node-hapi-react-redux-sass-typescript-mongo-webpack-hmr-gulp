/// <reference path="../../../../../typings/index.d.ts" />

import * as React from 'react';
import Layout from '../layouts/Plain';
const objectAssign = require('object-assign');
interface IIndexProps {
    js?: string[];
    css?: string[];
}

// TODO: Cleanup how styles+css are passed to Layout
class Index extends React.Component<IIndexProps, any> {
    private styles: React.ReactElement<any>[];
    private scripts: React.ReactElement<any>[];

    constructor(props?: IIndexProps) {
        super(objectAssign(
            { css: [], js: [] },
            props
        ));

        this.styles = 
        [
            <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css" rel="stylesheet" />,
            <link type="text/css" key="font-awesome" rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.5.0/css/font-awesome.min.css" />,
            <link type="text/css" key="ionicons" rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/ionicons/2.0.1/css/ionicons.min.css" />,
        ].concat(
            this.props.css.map((s) => {
                return <link rel="stylesheet" href={s} />;
            })
        );

        this.scripts = Layout.defaultScripts.concat(
            this.props.js.map((s) => {
                return <script src={s}></script>;
            })
        );
    }
    public render(): React.ReactElement<any> {
        
        return (
            <Layout
                title="Admin"
                styles={this.styles}
                script={this.scripts}>

                <div id="app"></div>
            </Layout>
        );
    }
}

export default Index;