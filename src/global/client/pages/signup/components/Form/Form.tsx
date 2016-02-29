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
    onFormInit,
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

    console.warn('select() :: errormessage');
    console.warn(errormessage);

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
        console.warn('constructor()');
        this.state = {
            success: false,
            hasError: {
                name: ''
            },
            help: {
                name: ''
            },
            loading: false,
            errormessage: 'init'
        };
    }

    public componentDidMount(): void {
        // this.refs.nameControl.refs.inputField.getDOMNode().focus();
        console.warn('componentDidMount()');
        const { dispatch }: IFormProps = this.props;
        dispatch(
            onFormInit()
        );
    }

    public onSubmit(event: any): void {

        event.preventDefault();
        event.stopPropagation();

        const { dispatch }: IFormProps = this.props;

        /*
        dispatch(
            handleRequest({
                name: this.state.name,
                username: this.state.username,
                password: this.state.password,
                email: this.state.email
            })
        );
        */

        dispatch(
            onReceiveFormAction(false, 'ERROR', {}, {}, false)
        );
    }

    public linkState(value: string): any {
        return {
            value: this.state[value],
            requestChange: function(newValue: string): void {
                this.state[value] = newValue;
            }
        };
    }

    public render(): React.ReactElement<{}> {

        let alerts: any[] = [];
        console.warn('render()');
        console.warn('this.state.errormessage');
        console.warn(this.state.errormessage);

        if (this.state.success) {
            alerts.push(<div key='success' className='alert alert-success'>
                Success.Redirecting...
            </div>);
        }

        if (this.state.errormessage !== '') {
            alerts.push(<div key='danger' className='alert alert-danger'>
                {this.state.errormessage}
            </div>);
        }

        let formElements: React.ReactElement<{}>;
        if (!this.state.success) {
            formElements = <fieldset>
                <TextControl
                    name='name'
                    label='Name'
                    ref='nameControl'
                    hasError={this.state.hasError.name}
                    valueLink={this.linkState('name') }
                    help={this.state.help.name}
                    disabled={this.state.loading}
                    />
                <TextControl
                    name='email'
                    label='Email'
                    hasError={this.state.hasError.email}
                    valueLink={this.linkState('email') }
                    help={this.state.help.email}
                    disabled={this.state.loading}
                    />
                <TextControl
                    name='username'
                    label='Username'
                    hasError={this.state.hasError.username}
                    valueLink={this.linkState('username') }
                    help={this.state.help.username}
                    disabled={this.state.loading}
                    />
                <TextControl
                    name='password'
                    label='Password'
                    type='password'
                    hasError={this.state.hasError.password}
                    valueLink={this.linkState('password') }
                    help={this.state.help.password}
                    disabled={this.state.loading}
                    />
                <ControlGroup hideLabel={true} hideHelp={true}>
                    <Button
                        type='submit'
                        inputClasses={{ 'btn-primary': true }}
                        disabled={this.state.loading}>

                        Create my account
                        <Spinner space='left' show={this.state.loading} />
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
