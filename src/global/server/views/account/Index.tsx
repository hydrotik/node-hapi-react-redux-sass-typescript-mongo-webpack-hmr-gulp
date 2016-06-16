/// <reference path="../../../../../typings/index.d.ts" />

import * as React from 'react';
import Layout from '../layouts/Plain';
const objectAssign = require('object-assign');

interface IIndexProps {
    js?: string[];
    css?: string[];
}

class Index extends React.Component<IIndexProps, {}> {
    private styles: React.ReactElement<any>[];
    private scripts: React.ReactElement<any>[];

    constructor(props?: IIndexProps) {
        super(objectAssign(
            { css: [], js: [] },
            props
        ));

        this.styles = Layout.defaultStylesheets.concat(
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

    public render(): React.ReactElement<{}> {
        return (
            <Layout
                title="Account"
                styles={this.styles}
                script={this.scripts}>

                <div id="app"></div>
            </Layout>
        );
    }
}

export default Index;