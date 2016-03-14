/// <reference path='../../../../../../../typings/tsd.d.ts' />

import { Link } from 'react-router';

/*
    Maps to components/[section]/FilterForm.jsx

    Router upgrade info:
    http://stackoverflow.com/questions/30115324/pass-props-in-link-react-router
*/

// Core Imports
import * as React from 'react';

// Styles
import './_FilterForm.scss';

// Page Components
import { ControlGroup } from '../../../../components/ControlGroup/ControlGroup';
import { TextControl } from '../../../../components/TextControl/TextControl';
import { SelectControl } from '../../../../components/SelectControl/SelectControl';

interface IFilterFormProps {
    dispatch?: (func: any) => void;
    children?: any;
    routes?: any[];
    ref?: any;
    query: string;
    parentSection: string;
    data?: any;
    onChange?: any;

    loading?: boolean;
    sort?: boolean;
    username?: string;
    limit?: number;
}

interface IFilterFormState {
}



export class FilterForm extends React.Component<IFilterFormProps, IFilterFormState> {

    public constructor(props: any = {}) {
        super(props);
    }

    public handleChange(event: any): void {
        /*
        const { dispatch }: IFilterFormProps = this.props;
        dispatch(
            onFormUpdate(event.target.name, event.target.value)
        );
        */
    }

    public onMenuChange(event: any): void {
        /*
        var newState = { page: 1 };
        newState[event.target.name] = event.target.value;
        this.setState(newState, this.props.onChange);
        */
    }

    public onEnterSubmit(event: any): void {

        if (event.which === 13) {
            event.preventDefault();
            event.stopPropagation();
            // this.setState({ page: 1 }, this.props.onChange);
        }
    }

    public render(): React.ReactElement<{}> {

        let linkTo: string;
        let row: React.ReactElement<{}>;
        let head: React.ReactElement<{}>;

        switch(this.props.parentSection){
            case 'accounts':
                console.log('loading FilterForm.tsx for accounts');
                linkTo = 'accountDetails';
                row = (
                    <div className='row'>
                        <div className='col-sm-4'>
                            <TextControl
                                name='username'
                                label='Username search'
                                value={this.props.username}
                                onChange={ (e: any) => this.handleChange(e) }
                                disabled={this.props.loading}
                            />
                        </div>
                        <div className='col-sm-4'>
                            <SelectControl
                                name='sort'
                                label='Sort by'
                                disabled={this.props.loading}
                                onChange={(e: any) => this.onMenuChange}
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
                                onChange={(e: any) => this.onMenuChange}
                                value={this.props.limit}>

                                <option value='10'>10 items</option>
                                <option value='20'>20 items</option>
                                <option value='50'>50 items</option>
                                <option value='100'>100 items</option>
                            </SelectControl>
                        </div>
                    </div>
                );
                break;
            case 'admin-groups':
                console.log('loading FilterForm.tsx for admin-groups');
                linkTo = 'adminGroupDetails';
                row = (
                    <div className='row'>
                    </div>
                );
                break;
            case 'admins':
                console.log('loading FilterForm.tsx for admins');
                linkTo = 'adminDetails';
                row = (
                    <div className='row'>
                    </div>
                );
                break;
            case 'statuses':
                console.log('loading FilterForm.tsx for statuses');
                linkTo = 'statusDetails';
                row = (
                    <div className='row'>
                    </div>
                );
                break;
            case 'users':
                console.log('loading FilterForm.tsx for users');
                linkTo = 'userDetails';
                row = (
                    <div className='row'>
                    </div>
                );
                break;
            default :
                console.warn('FilterForm.tsx parentSection property doesn\'t match a section');
                break;
        }

        return (
            <form onKeyDown={(e: any) => this.onEnterSubmit} onSubmit={(e: any) => this.props.onChange}>
                {row}
            </form>
        );
    }
}
