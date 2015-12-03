/// <reference path="../../../../../typings/tsd.d.ts" />

import './_SectionContainer.scss';
import * as React from 'react';
import * as lodash from 'lodash';

interface ISectionContainerProps {
    children?: any;
    fullWidth?: boolean;
    gutter?: number;
    gutterBottom?: number;
}

/**
 * @class ContentRow
 * @augments {React.Component}
 */
export class SectionContainer extends React.Component<ISectionContainerProps, {}> {

    public constructor(props: ISectionContainerProps) {
        super(props);

        this.props = { gutter: 0, gutterBottom: 0, fullWidth: false };
    }

    public render(): React.ReactElement<{}> {

        let gutter: any = this.props.gutter ?
            {'marginBottom': this.props.gutter + this.props.gutterBottom + 'px', 'marginTop': this.props.gutter / 2 + 'px'} :
            {'marginBottom': this.props.gutterBottom + 'px'};
        let width: any = this.props.fullWidth ?
            {'maxWidth': '100%'} :
            {'maxWidth': 960 + this.props.gutter + 'px'};

        gutter = lodash.assign({}, gutter, width);

        return (
            <div style={gutter} className='section-container'>
                {this.props.children}
            </div>
        );
    }
}
