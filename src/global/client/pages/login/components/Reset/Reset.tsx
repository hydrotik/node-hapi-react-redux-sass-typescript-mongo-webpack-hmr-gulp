/// <reference path='../../../../../../../typings/tsd.d.ts' />

// Core Imports
import * as React from 'react';
import { connect } from 'react-redux';

// Styles
import './_Reset.scss';

// Page Components


// Behaviors and Actions
import {
    IResetMapping
} from '../../actions';

// Interfaces
interface IResetProps {
    dispatch?: (func: any) => void;
    store?: any;
    error?: string;
    success?:  boolean;
    email?: string;
    hasError?: any;
    help?: any;
    loading?: boolean;
    message?: string;
}

interface IResetState {

}

// Decorators
function select(state: { login: IResetMapping; }): IResetProps {
    const { login }: { login: IResetMapping; } = state;
    const {
        success,
        error,
        hasError,
        help,
        loading,
        email,
        message
    }: IResetMapping = login;

    return {
        success,
        error,
        hasError,
        help,
        loading,
        email,
        message
    };

}
@connect(select)
export class Reset extends React.Component<IResetProps, IResetState> {

    public constructor(props: any = {}) {
        super(props);
    }

    public componentDidMount(): void {
        // this.refs.nameControl.refs.inputField.getDOMNode().focus();
        // const { dispatch }: IResetProps = this.props;
        // dispatch(onFormReset());
        // dispatch(onFormInit());
    }

    /*
    public handleChange(event: any): void {
        const { dispatch }: IResetProps = this.props;
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
        }: IResetProps = this.props;

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
            <div>Reset Section</div>
        );
    }
}
