/// <reference path='../../../../../../../typings/index.d.ts' />

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
    routes?: any[];
    ref?: any;
    query: string;
    data?: any;
    onChange?: any;

    loading?: boolean;
    sort?: boolean;
    username?: string;
    limit?: number;

    children?: any;

    handleChange?: (e: any) => void;
    onMenuChange?: (e: any) => void;
}

interface IFilterFormState {
}



export class FilterForm extends React.Component<IFilterFormProps, IFilterFormState> {

    public constructor(props: any = {}) {
        super(props);
    }

    public handleChange: any = (event: any): void => {
        // console.warn('FilterForm :: handleChange()');
        // console.warn(event.target.value);
        /*
        const { dispatch }: IFilterFormProps = this.props;
        dispatch(
            onFormUpdate(event.target.name, event.target.value)
        );
        */
        // console.log(this.props);
        this.props.onChange(event);
    }

    public onMenuChange: any = (event: any): void => {
        // console.warn('FilterForm :: onMenuChange()');
        // console.warn(event.target.value);
        /*
        var newState = { page: 1 };
        newState[event.target.name] = event.target.value;
        this.setState(newState, this.props.onChange);
        */
        // console.log(this.props);
        this.props.onChange(event);
    }

    public onEnterSubmit(event: any): void {

        if (event.which === 13) {
            event.preventDefault();
            event.stopPropagation();
            // this.setState({ page: 1 }, this.props.onChange);
        }
    }

    public render(): React.ReactElement<{}> {

        let handleChange = this.handleChange;
        let onMenuChange = this.onMenuChange;

        let p: any = {
            handleChange,
            onMenuChange
        };

        let childrenWithProps: any = React.Children.map(this.props.children, (child: React.ReactElement<{}>) => {
            return React.cloneElement(child, p);
        });

        return (
            <form onKeyDown={this.onEnterSubmit} onSubmit={this.props.onChange}>
                { childrenWithProps }
            </form>
        );
    }
}
