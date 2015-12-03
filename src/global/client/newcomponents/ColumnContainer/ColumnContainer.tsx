/// <reference path="../../../../../typings/tsd.d.ts" />

import * as React from 'react';

import './_ColumnContainer.scss';

interface IColumnContainerProps {
    children?: Function;
}

/**
 * @class CarouselItem
 * @augments {React.Component}
 */
export class ColumnContainer extends React.Component<IColumnContainerProps, {}> {

    public render(): React.ReactElement<{}> {
        return (
            <div className='columncontainer'>
                {this.props.children}
            </div>
        );
    }
}
