/// <reference path='../../../../../../../typings/main.d.ts' />

// Core Imports
import * as React from 'react';
import { connect } from 'react-redux';

// Styles
import './_AccountForm.scss';

// Page Components
import { ControlGroup } from '../../../../components/ControlGroup/ControlGroup';
import { TextControl } from '../../../../components/TextControl/TextControl';
import { Button } from '../../../../components/Button/Button';
import { Spinner } from '../../../../components/Spinner/Spinner';

// Behaviors and Actions
import {
    IAccountMapping,
    // onFormInit,
    onFormReset,
    onFormUpdate,
    getAccountSettings,
    saveAccountSettings
} from '../../actions';

// Interfaces
interface IAccountFormProps {
    dispatch?: (func: any) => void;
    store?: any;
    error?: boolean;
    accountsuccess?:  boolean;
    accounthydrated?: boolean;
    nameFirst?: string;
    nameMiddle?: string;
    nameLast?: string;
    hasError?: any;
    help?: any;
    loading?: boolean;
}

interface IAccountFormState extends IAccountFormProps {

}

// Decorators
function select(state: { account: IAccountMapping; }): IAccountFormState {
    const { account }: { account: IAccountMapping; } = state;
    const {
        nameFirst,
        nameMiddle,
        nameLast,
        hasError,
        help,
        loading,
        accountsuccess,
        error,
        accounthydrated
    }: IAccountMapping = account;

    return {
        nameFirst,
        nameMiddle,
        nameLast,
        hasError,
        help,
        loading,
        accountsuccess,
        error,
        accounthydrated
    };

}

class Container extends React.Component<IAccountFormProps, IAccountFormState> {

    public constructor(props: any = {}) {
        super(props);
    }

    public componentDidMount(): void {
        // this.refs.nameControl.refs.inputField.getDOMNode().focus();
        const { dispatch }: IAccountFormProps = this.props;
        dispatch(onFormReset());
        dispatch(getAccountSettings());
    }

    public handleChange(event: any): void {
        const { dispatch }: IAccountFormProps = this.props;
        dispatch(
            onFormUpdate(event.target.name, event.target.value)
        );
    }

    public onSubmit(event: any): void {

        event.preventDefault();
        event.stopPropagation();

        const {
            dispatch,
            nameFirst,
            nameMiddle,
            nameLast
        }: IAccountFormProps = this.props;

        dispatch(
            saveAccountSettings({
                nameFirst,
                nameMiddle,
                nameLast
            })
        );
    }

    public render(): React.ReactElement<{}> {

        let alerts: any[] = [];

        let {
            nameFirst,
            nameMiddle,
            nameLast,
            hasError,
            help,
            loading,
            accountsuccess,
            error,
            accounthydrated
        }: IAccountFormProps = this.props;

        // TESTING FOR UI
        /*
        hydrated = true;
        hasError = {
            nameFirst: false,
            nameMiddle: false,
            nameLast: false
        };
        help = {
            nameFirst: false,
            nameMiddle: false,
            nameLast: false
        };
        */

        if (accountsuccess) {
            alerts.push(<div key='success' className='alert alert-success'>
                Success. Contact info settings saved.
            </div>);
        } else if (error) {
            alerts.push(<div key='danger' className='alert alert-danger'>
                {error}
            </div>);
        }

        let notice: any;
        if (!accounthydrated) {
            notice = <div className='alert alert-info'>
                Loading contact info data...
            </div>;
        }

        let formElements: any;
        if (accounthydrated) {
            formElements = (
                <fieldset>
                    <legend>Contact info</legend>
                    {alerts}
                    <TextControl
                        name='nameFirst'
                        label='First name'
                        hasError={hasError.nameFirst}
                        value={nameFirst}
                        onChange={ (e: any) => this.handleChange(e) }
                        help={help.nameFirst}
                        disabled={loading}
                        />
                    <TextControl
                        name='nameMiddle'
                        label='Middle name'
                        hasError={hasError.nameMiddle}
                        value={nameMiddle}
                        onChange={ (e: any) => this.handleChange(e) }
                        help={help.nameMiddle}
                        disabled={loading}
                        />
                    <TextControl
                        name='nameLast'
                        label='Last name'
                        hasError={hasError.nameLast}
                        value={nameLast}
                        onChange={ (e: any) => this.handleChange(e) }
                        help={help.nameLast}
                        disabled={loading}
                        />
                    <ControlGroup hideLabel={true} hideHelp={true}>
                    <Button
                        type='submit'
                        inputClasses={{ 'btn-primary': true }}
                        disabled={loading}>

                        Update contact info
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

export const AccountForm = connect(select)(Container);
