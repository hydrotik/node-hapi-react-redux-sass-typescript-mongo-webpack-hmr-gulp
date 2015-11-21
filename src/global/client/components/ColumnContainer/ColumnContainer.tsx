/// <reference path="../../../../../typings/tsd.d.ts" />
/// <reference path="../../../../../typings/react-picture/react-picture.d.ts" />

import * as React from 'react';
import { ContentRow } from '../ContentRow/ContentRow';
import { map } from 'lodash';

import './_ColumnContainer.scss';

interface IColumnContainer {
    children?: Function;
    key?: number;
    rows?: any;
}

/**
 * @class CarouselItem
 * @augments {React.Component}
 */
export class ColumnContainer extends React.Component<IColumnContainer, {}> {

    public render(): React.ReactElement<{}> {
        const {rows}: IColumnContainer = this.props;

        return (
            <div className='columncontainer'>
                {map(rows, this.renderEditorialContentContainer) }
            </div>
        );
    }

    private renderEditorialContentContainer(item: any, i: number): React.ReactElement<{}> {
        const { type }: { type: any; } = item;

        return (
            <ContentRow type={type} key={i} contents={item} />);
    }
}
