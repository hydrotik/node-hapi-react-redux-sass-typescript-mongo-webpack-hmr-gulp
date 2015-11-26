/// <reference path="../../../../../typings/tsd.d.ts" />
/// <reference path="../../../../../typings/react-picture/react-picture.d.ts" />

import * as React from 'react';
import { ContentRow, IContentRowProps } from '../ContentRow/ContentRow';
import { map } from 'lodash';

import './_ColumnContainer.scss';

interface IColumnContainerProps {
    children?: Function;
    key?: number;
    rows?: any;
}

/**
 * @class CarouselItem
 * @augments {React.Component}
 */
export class ColumnContainer extends React.Component<IColumnContainerProps, {}> {

    public render(): React.ReactElement<{}> {
        let output: React.ReactElement<{}> = null;

        const {rows}: IColumnContainerProps = this.props;

        if ( this.props.children ) {
            console.warn('Explicit');
            console.warn(this.props.children);
            output = (<div className='columncontainer'>{ this.props.children }</div>);
        } else {
            console.warn('Dynamic');
            output = (<div className='columncontainer'>{ map(rows, this.renderEditorialContentContainer) }</div>);
        }

        return output;
    }

    private renderEditorialContentContainer(item: any, i: number): React.ReactElement<{}> {
        const { type }: IContentRowProps = item;

        return (<ContentRow type={type} key={i} contents={item} />);
    }
}
