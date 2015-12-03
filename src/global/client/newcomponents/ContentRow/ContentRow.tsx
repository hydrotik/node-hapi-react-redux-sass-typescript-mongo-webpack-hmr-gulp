/// <reference path="../../../../../typings/tsd.d.ts" />

import './_ContentRow.scss';
import * as React from 'react';

const { Component, PropTypes } = React;

export interface IContentRowProps {
    children?: any;
    layouttype?: string;
}

/**
 * @class ContentRow
 * @augments {React.Component}
 */
export class ContentRow extends React.Component<IContentRowProps, {}> {

    public render(): React.ReactElement<{}> {

        const base = 'contentrow',
            layouttype = this.props.layouttype;
        let mod;

        switch (layouttype) {

            case 'column':
                mod = 'contentrow__doublecolumn';
                break;

            case 'wrap':
                mod = 'contentrow__singlecoumn';
                break;

            case 'full':
                mod = 'contentrow__full';
                break;

            default:
                mod = 'contentrow__full';
        }

        const cn = base + ' ' + mod;

        return (
            <div className={cn}>
                {this.props.children}
            </div>
        );
    }
}
