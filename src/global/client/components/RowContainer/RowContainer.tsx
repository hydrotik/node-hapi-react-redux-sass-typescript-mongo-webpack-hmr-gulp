/// <reference path="../../../../../typings/tsd.d.ts" />

import * as React from 'react';
import { ColumnContainer } from '../ColumnContainer/ColumnContainer.tsx';
import { ContentRow } from '../ContentRow/ContentRow.tsx';
import { map } from 'lodash';

import './_RowContainer.scss';

interface IRowContainerProps {
    children?: any;
    key?: number;
    columns?: any;
}

/**
 * @class ContentRow
 * @augments {React.Component}
 */
export class RowContainer extends React.Component<IRowContainerProps, {}> {

    public render(): React.ReactElement<{}> {

        let output: React.ReactElement<{}> = null;

        if (!this.props.columns) {
            output = (<div className='rowcontainer'>{ this.props.children }</div>);
        } else {
            const {columns}: IRowContainerProps = this.props;
            output = (<div className='rowcontainer'>{ this.checkColumnCount(columns) }</div>);
        }

        return output;
    }

    private renderEditorialColumnContainer(item: any, i: number): React.ReactElement<{}> {
        let rows: any = item;

        return (<ColumnContainer key={i} rows={rows} />);
    }

    private renderEditorialContentContainer(item: any, i: number): React.ReactElement<{}> {
        const {type}: { type: string; } = item;

        return (<ContentRow type={type} key={i} contents={item} />);
    }

    private checkColumnCount(columns: any[]): any {
        if (columns.length > 1) {
            return map(columns, this.renderEditorialColumnContainer);
        } else {
            return map(columns[0], this.renderEditorialContentContainer);
        }
    }
}
