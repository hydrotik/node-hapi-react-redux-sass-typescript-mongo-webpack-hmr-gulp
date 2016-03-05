/// <reference path='../../../../../../../typings/tsd.d.ts' />

// Core Imports
import * as React from 'react';
// import { connect } from 'react-redux';

// Styles
import './_AccountForm.scss';

// Page Components


// Behaviors and Actions
import {

} from '../../actions';

// Interfaces
interface IAccountFormProps {
    dispatch?: (func: any) => void;
    store?: any;
    data: any;
}

interface IAccountFormState {

}

// Decorators
/*
function select(state: { formSignup: IReducer; }): IAccountFormState {
    const { formSignup }: { formSignup: IReducer; } = state;
    const {
    }: IReducer = formSignup;

    return {
    };

}

@connect(select) */
export class AccountForm extends React.Component<IAccountFormProps, IAccountFormState> {

    public constructor(props: any = {}) {
        super(props);
    }

    public componentDidMount(): void {
        // this.refs.nameControl.refs.inputField.getDOMNode().focus();
        // const { dispatch }: IAccountFormProps = this.props;
        // dispatch(onAccountFormInit());
    }

    /*
    public handleChange(event: any): void {
        const { dispatch }: IAccountFormProps = this.props;
        dispatch(onAccountFormUpdate(event.target.name, event.target.value));
    }
    */

    public render(): React.ReactElement<{}> {

        return (
            <div>HELLO ACCOUNT FORM</div>
        );
    }
}
