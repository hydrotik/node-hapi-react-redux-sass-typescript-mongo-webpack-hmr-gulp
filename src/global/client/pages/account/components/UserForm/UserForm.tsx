/// <reference path='../../../../../../../typings/tsd.d.ts' />

// Core Imports
import * as React from 'react';
// import { connect } from 'react-redux';

// Styles
import './_UserForm.scss';

// Page Components


// Behaviors and Actions
import {

} from '../../actions';

// Interfaces
interface IUserFormProps {
    dispatch?: (func: any) => void;
    store?: any;
    data: any;
}

interface IUserFormState {

}

// Decorators
/*
function select(state: { formSignup: IReducer; }): IUserFormState {
    const { formSignup }: { formSignup: IReducer; } = state;
    const {
    }: IReducer = formSignup;

    return {
    };

}

@connect(select) */
export class UserForm extends React.Component<IUserFormProps, IUserFormState> {

    public constructor(props: any = {}) {
        super(props);
    }

    public componentDidMount(): void {
        // this.refs.nameControl.refs.inputField.getDOMNode().focus();
        // const { dispatch }: IUserFormProps = this.props;
        // dispatch(onUserFormInit());
    }

    /*
    public handleChange(event: any): void {
        const { dispatch }: IUserFormProps = this.props;
        dispatch(onUserFormUpdate(event.target.name, event.target.value));
    }
    */

    public render(): React.ReactElement<{}> {

        return (
            <div>HELLO USER FORM</div>
        );
    }
}
