/// <reference path='../../../../../../../typings/tsd.d.ts' />

// Core Imports
import * as React from 'react';
import { connect } from 'react-redux';

// Styles
import './_UserForm.scss';

// Page Components
import { ControlGroup } from '../../../../components/ControlGroup/ControlGroup';
import { TextControl } from '../../../../components/TextControl/TextControl';
import { Button } from '../../../../components/Button/Button';
import { Spinner } from '../../../../components/Spinner/Spinner';

// Behaviors and Actions
import {
    IAccountMapping,
    getUserSettings,
    saveUserSettings,
    onFormUpdate,
    onFormReset
} from '../../actions';

// Interfaces
interface IUserFormProps {
    dispatch?: (func: any) => void;
    store?: any;
    error?: boolean;
    usersuccess?:  boolean;
    userhydrated?: boolean;
    username?: boolean;
    email?: string;
    hasError?: any;
    help?: any;
    loading?: boolean;
}

interface IUserFormState {

}

// Decorators
function select(state: { account: IAccountMapping; }): IUserFormState {
    const { account }: { account: IAccountMapping; } = state;
    const {
        username,
        email,
        hasError,
        help,
        loading,
        usersuccess,
        error,
        userhydrated
    }: IAccountMapping = account;

    return {
        username,
        email,
        hasError,
        help,
        loading,
        usersuccess,
        error,
        userhydrated
    };

}

@connect(select)
export class UserForm extends React.Component<IUserFormProps, IUserFormState> {

    public constructor(props: any = {}) {
        super(props);
    }

    public componentDidMount(): void {
        // this.refs.nameControl.refs.inputField.getDOMNode().focus();
        const { dispatch }: IUserFormProps = this.props;
        dispatch(onFormReset());
        dispatch(getUserSettings());
    }

    public handleChange(event: any): void {
        const { dispatch }: IUserFormProps = this.props;
        dispatch(
            onFormUpdate(event.target.name, event.target.value)
        );
    }

    public onSubmit(event: any): void {

        event.preventDefault();
        event.stopPropagation();

        const {
            dispatch,
            username,
            email
        }: IUserFormProps = this.props;

        dispatch(
            saveUserSettings({
                username,
                email
            })
        );
    }

    public render(): React.ReactElement<{}> {

        let alerts: any[] = [];

        let {
            username,
            email,
            hasError,
            help,
            loading,
            usersuccess,
            error,
            userhydrated
        }: IUserFormProps = this.props;

        if (usersuccess) {
            alerts.push(<div key='success' className='alert alert-success'>
                Success. Identity settings saved.
            </div>);
        } else if (error) {
            alerts.push(<div key='danger' className='alert alert-danger'>
                {error}
            </div>);
        }

        let notice: any;
        if (!userhydrated) {
            notice = <div className='alert alert-info'>
                Loading identity data...
            </div>;
        }

        let formElements: any;
        if (userhydrated) {
            formElements = (
                <fieldset>
                    <legend>Identity</legend>
                    {alerts}
                    <TextControl
                        name='username'
                        label='Username'
                        hasError={hasError.username}
                        value={username}
                        onChange={ (e: any) => this.handleChange(e) }
                        help={help.username}
                        disabled={loading}
                        />
                    <TextControl
                        name='email'
                        label='Email'
                        hasError={hasError.email}
                        value={email}
                        onChange={ (e: any) => this.handleChange(e) }
                        help={help.email}
                        disabled={loading}
                        />
                    <ControlGroup hideLabel={true} hideHelp={true}>
                    <Button
                        type='submit'
                        inputClasses={{ 'btn-primary': true }}
                        disabled={loading}>

                        Update identity
                        <Spinner space='left' show={loading} />
                    </Button>
                </ControlGroup>
                </fieldset>
            );
        }


        return (
            <form onSubmit={(e: any) => this.onSubmit(e) }>
                {notice}
                {formElements}
            </form>
        );
    }
}
