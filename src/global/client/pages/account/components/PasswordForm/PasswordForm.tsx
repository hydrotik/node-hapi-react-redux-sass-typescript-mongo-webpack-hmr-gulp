/// <reference path='../../../../../../../typings/tsd.d.ts' />

// Core Imports
import * as React from 'react';
// import { connect } from 'react-redux';

// Styles
import './_PasswordForm.scss';

// Page Components


// Behaviors and Actions
import {

} from '../../actions';

// Interfaces
interface IPasswordFormProps {
    dispatch?: (func: any) => void;
    store?: any;
    data: any;
}

interface IPasswordFormState {

}

// Decorators
/*
function select(state: { formSignup: IReducer; }): IPasswordFormState {
    const { formSignup }: { formSignup: IReducer; } = state;
    const {
    }: IReducer = formSignup;

    return {
    };

}

@connect(select) */
export class PasswordForm extends React.Component<IPasswordFormProps, IPasswordFormState> {

    public constructor(props: any = {}) {
        super(props);
    }

    public componentDidMount(): void {
        // this.refs.nameControl.refs.inputField.getDOMNode().focus();
        // const { dispatch }: IPasswordFormProps = this.props;
        // dispatch(onPasswordFormInit());
    }

    /*
    public handleChange(event: any): void {
        const { dispatch }: IPasswordFormProps = this.props;
        dispatch(onPasswordFormUpdate(event.target.name, event.target.value));
    }
    */

    public render(): React.ReactElement<{}> {

        return (
            <div>HELLO PASSWORD FORM</div>
        );
    }
}
