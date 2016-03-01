/// <reference path='../../../../../../../typings/tsd.d.ts' />

// Core Imports
import * as React from 'react';
import { connect } from 'react-redux';

// Styles
import './_Form.scss';

// Page Components
import { ControlGroup } from './components/ControlGroup/ControlGroup';
import { TextControl } from './components/TextControl/TextControl';
import { Button } from './components/Button/Button';
import { Spinner } from './components/Spinner/Spinner';

// Behaviors and Actions
import {
    // SEND_REQUEST,
    // RECEIVE_RESPONSE,
    IFormMapping,
    // onFormAction,
    // handleRequest,
    // onFormInit,
    onReceiveFormAction
} from '../../actions';

// Interfaces
interface IFormProps {
    dispatch?: (func: any) => void;
    store?: any;
}
interface IFormState {
    success?: boolean;
    errormessage?: string;
    hasError?: any;
    help?: any;
    loading?: boolean;
    name?: string;
    username?: string;
    password?: string;
    email?: string;
}

// Decorators
function select(state: { formSignup: IFormMapping; }): IFormState {
    const { formSignup }: { formSignup: IFormMapping; } = state;
    const {
        errormessage,
        name,
        username,
        password,
        email,
        success,
        hasError,
        help,
        loading
    }: IFormMapping = formSignup;

    return {
        errormessage,
        name,
        username,
        password,
        email,
        success,
        hasError,
        help,
        loading
    };

}

@connect(select)
export class Form extends React.Component<IFormProps, IFormState> {

    public constructor(props: any = {}) {
        super(props);
    }

    public componentDidMount(): void {
        // this.refs.nameControl.refs.inputField.getDOMNode().focus();
    }

    public onSubmit(event: any): void {

        event.preventDefault();
        event.stopPropagation();

        const { dispatch }: IFormProps = this.props;

        dispatch(
            onReceiveFormAction(false, 'ERROR', {}, {}, false)
        );
    }

    public render(): React.ReactElement<{}> {

        let alerts: any[] = [];

        const {
            errormessage,
            name,
            username,
            password,
            email,
            success,
            hasError,
            help,
            loading
        }: IFormState = this.props;

        if (success) {
            alerts.push(<div key='success' className='alert alert-success'>
                Success.Redirecting...
            </div>);
        }

        if (errormessage !== '') {
            alerts.push(<div key='danger' className='alert alert-danger'>
                {errormessage}
                </div>);
        }

        let formElements: React.ReactElement<{}>;
        if (!success) {
            formElements = <fieldset>
                <TextControl
                    name='name'
                    label='Name'
                    ref='nameControl'
                    hasError={hasError.name}
                    value={name}
                    help={help.name}
                    disabled={loading}
                    />
                <TextControl
                    name='email'
                    label='Email'
                    hasError={hasError.email}
                    value={email}
                    help={help.email}
                    disabled={loading}
                    />
                <TextControl
                    name='username'
                    label='Username'
                    hasError={hasError.username}
                    value={username}
                    help={help.username}
                    disabled={loading}
                    />
                <TextControl
                    name='password'
                    label='Password'
                    type='password'
                    hasError={hasError.password}
                    value={password}
                    help={help.password}
                    disabled={loading}
                    />
                <ControlGroup hideLabel={true} hideHelp={true}>
                    <Button
                        type='submit'
                        inputClasses={{ 'btn-primary': true }}
                        disabled={loading}>

                        Create my account
                        <Spinner space='left' show={loading} />
                    </Button>
                </ControlGroup>
            </fieldset>;
        }
        return (
            <section>
                <h1 className='page-header'>Sign up</h1>
                <form onSubmit={(e: any) => this.onSubmit(e) }>
                    {alerts}
                    {formElements}
                </form>
            </section>
        );
    }
}
