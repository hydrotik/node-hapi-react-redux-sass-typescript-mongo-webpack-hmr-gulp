/// <reference path='../../../../../../../../../typings/tsd.d.ts' />
import { Link } from 'react-router';

/*
    Row include for admin/components/Results/Results.jsx
*/

// Core Imports
import * as React from 'react';

// Styles
import './_FilterFormRow.scss';

// Page Components
import { ControlGroup } from '../../../../../../components/ControlGroup/ControlGroup';
import { TextControl } from '../../../../../../components/TextControl/TextControl';
import { SelectControl } from '../../../../../../components/SelectControl/SelectControl';

interface IFilterFormRowProps {

    onChange?: any;

    loading?: boolean;
    sort?: boolean;
    username?: string;
    limit?: number;

    handleChange?: (e: any) => void;
    onMenuChange?: (e: any) => void;
}

interface IFilterFormRowState {
}

export class FilterFormRow extends React.Component<IFilterFormRowProps, IFilterFormRowState> {

    public constructor(props: any = {}) {
        super(props);
    }

    public render(): React.ReactElement<{}> {

        return (
            <div className='row'>
                <div className='col-sm-4'>
                    <TextControl
                        name='username'
                        label='Username search'
                        value={this.props.username}
                        onChange={ (e: any) => this.props.handleChange(e) }
                        disabled={this.props.loading}
                    />
                </div>
                <div className='col-sm-4'>
                    <SelectControl
                        name='sort'
                        label='Sort by'
                        disabled={this.props.loading}
                        onChange={(e: any) => this.props.onMenuChange}
                        value={this.props.sort}>

                        <option value='_id'>id &#9650;</option>
                        <option value='-_id'>id &#9660;</option>
                        <option value='username'>username &#9650;</option>
                        <option value='-username'>username &#9660;</option>
                    </SelectControl>
                </div>
                <div className='col-sm-4'>
                    <SelectControl
                        name='limit'
                        label='Limit'
                        disabled={this.props.loading}
                        onChange={(e: any) => this.props.onMenuChange}
                        value={this.props.limit}>

                        <option value='10'>10 items</option>
                        <option value='20'>20 items</option>
                        <option value='50'>50 items</option>
                        <option value='100'>100 items</option>
                    </SelectControl>
                </div>
            </div>
        );
    }
}
