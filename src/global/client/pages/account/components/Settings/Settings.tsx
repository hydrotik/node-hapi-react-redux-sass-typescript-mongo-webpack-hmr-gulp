/// <reference path='../../../../../../../typings/main.d.ts' />

// Core Imports
import * as React from 'react';
// import { connect } from 'react-redux';

// Styles
import './_Settings.scss';

// Page Components
import { AccountForm } from '../AccountForm/AccountForm';
import { UserForm } from '../UserForm/UserForm';
import { PasswordForm } from '../PasswordForm/PasswordForm';

// Behaviors and Actions
import {

} from '../../actions';

// Interfaces
interface ISettingsProps {
    dispatch?: (func: any) => void;
    store?: any;
}

interface ISettingsState {

}

// Decorators
/*
function select(state: { account: IAccountMapping; }): ISettingsState {
    const { account }: { account: IAccountMapping; } = state;
    const {
        accountsuccess,
        usersuccess,
        passwordsuccess,
        hasError,
        help,
        loading,
        error,
        accounthydrated,
        userhydrated
    }: IAccountMapping = account;

    return {
        accountsuccess,
        usersuccess,
        passwordsuccess,
        hasError,
        help,
        loading,
        error,
        accounthydrated,
        userhydrated
    };

}

@connect(select)*/
export class Settings extends React.Component<ISettingsProps, ISettingsState> {

    public constructor(props: any = {}) {
        super(props);
    }

    public componentDidMount(): void {
        // this.refs.nameControl.refs.inputField.getDOMNode().focus();
        // console.warn('reset form state');
        // const { dispatch }: ISettingsProps = this.props;
        // dispatch(onFormReset());
    }

    /*
    public handleChange(event: any): void {
        const { dispatch }: ISettingsProps = this.props;
        dispatch(onSettingsUpdate(event.target.name, event.target.value));
    }
    */

    public render(): React.ReactElement<{}> {

        return (
            <section className='section-settings container'>
                <h1 className='page-header'>Account settings</h1>
                <div className='row'>
                    <div className='col-sm-6'>
                        <AccountForm />
                        <UserForm />
                        <PasswordForm />
                        </div>
                    </div>
                </section>
        );
    }
}
