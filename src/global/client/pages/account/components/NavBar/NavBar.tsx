/// <reference path='../../../../../../../typings/tsd.d.ts' />

// Core Imports
import * as React from 'react';
import { connect } from 'react-redux';

// Styles
import './_NavBar.scss';

// Page Components


// Behaviors and Actions
import {

} from '../../actions';

// Interfaces
interface INavBarProps {
    dispatch?: (func: any) => void;
    store?: any;
}

interface INavBarState {

}

// Decorators
/*
function select(state: { formSignup: IReducer; }): INavBarState {
    const { formSignup }: { formSignup: IReducer; } = state;
    const {
    }: IReducer = formSignup;

    return {
    };

}

@connect(select) */
export class NavBar extends React.Component<INavBarProps, INavBarState> {

    public constructor(props: any = {}) {
        super(props);
    }

    public componentDidMount(): void {
        // this.refs.nameControl.refs.inputField.getDOMNode().focus();
        // const { dispatch }: INavBarProps = this.props;
        // dispatch(onNavBarInit());
    }

    /*
    public handleChange(event: any): void {
        const { dispatch }: INavBarProps = this.props;
        dispatch(onNavBarUpdate(event.target.name, event.target.value));
    }
    */

    public render(): React.ReactElement<{}> {

        return (
            
        );
    }
}
