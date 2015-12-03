/// <reference path="../../../../../typings/tsd.d.ts" />
import * as React from 'react';

import './_RowContainer.scss';

interface IRowContainerProps {
    children?: any;
    key?: number;
    columns?: number;
}

/**
 * @class ContentRow
 * @augments {React.Component}
 */
export class RowContainer extends React.Component<IRowContainerProps, {}> {
    public render(): React.ReactElement<{}> {
        return (
            <div className='rowcontainer'>
                {this.props.children}
            </div>
        );
    }
}
