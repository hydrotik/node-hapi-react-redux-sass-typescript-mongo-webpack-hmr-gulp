/// <reference path='../../../../../../../typings/tsd.d.ts' />

// Core Imports
import * as React from 'react';
// import { connect } from 'react-redux';

// Styles
import './_Forgot.scss';

// Page Components


// Behaviors and Actions
import {
} from '../../actions';

// Interfaces
interface IForgotProps {
    dispatch?: (func: any) => void;
    store?: any;
}

interface IForgotState {

}

// Decorators
/*
function select(state: { account: IAccountMapping; }): IForgotState {
    const { account }: { account: IAccountMapping; } = state;
    const {
        password,
        passwordConfirm,
        hasError,
        help,
        loading,
        passwordsuccess,
        error
    }: IAccountMapping = account;

    return {
        password,
        passwordConfirm,
        hasError,
        help,
        loading,
        passwordsuccess,
        error
    };

}

@connect(select)*/
export class Forgot extends React.Component<IForgotProps, IForgotState> {

    public constructor(props: any = {}) {
        super(props);
    }

    public componentDidMount(): void {
        // this.refs.nameControl.refs.inputField.getDOMNode().focus();
        // const { dispatch }: IForgotProps = this.props;
        // dispatch(onFormReset());
        // dispatch(onFormInit());
    }

    /*
    public handleChange(event: any): void {
        const { dispatch }: IForgotProps = this.props;
        dispatch(
            onFormUpdate(event.target.name, event.target.value)
        );
    }

    public onSubmit(event: any): void {

        event.preventDefault();
        event.stopPropagation();

        const {
            dispatch,
            password,
            passwordConfirm
        }: IForgotProps = this.props;

        dispatch(
            savePasswordSettings({
                password,
                passwordConfirm
            })
        );
    }
    */

    public render(): React.ReactElement<{}> {

        return (
            <div>Forgot Section</div>
        );
    }
}
