/// <reference path='../../../../../../../typings/index.d.ts' />

// Core Imports
import * as React from 'react';
import { connect } from 'react-redux';
import * as activeComponent from 'react-router-active-component';

// Styles
import './_Reset.scss';

// Page Components
import { ControlGroup } from '../../../../components/ControlGroup/ControlGroup';
import { TextControl } from '../../../../components/TextControl/TextControl';
import { Button } from '../../../../components/Button/Button';
import { Spinner } from '../../../../components/Spinner/Spinner';

// Behaviors and Actions
import {
    IResetMapping,
    doReset,
    onFormUpdate,
    onFormReset,
} from '../../actions';

// Interfaces
interface IResetProps {
    dispatch?: (func: any) => void;
    store?: any;
    error?: string;
    success?:  boolean;
    password?: string;
    key?: string;
    email?: string;
    hasError?: any;
    help?: any;
    loading?: boolean;
    message?: string;
}

interface IResetState {

}

interface IRouter {
    getCurrentParams(): any;
}

interface IRouterContext {
    router: IRouter;
}

let ac: any = activeComponent;
const NavLink: any = ac('li');

// Decorators
function select(state: { login: IResetMapping; }): IResetProps {
    const { login }: { login: IResetMapping; } = state;
    const {
        success,
        error,
        hasError,
        help,
        loading,
        password,
        key,
        email,
        message
    }: IResetMapping = login;

    return {
        success,
        error,
        hasError,
        help,
        loading,
        password,
        key,
        email,
        message
    };

}

class Form extends React.Component<IResetProps, IResetState> {

    public constructor(props: any = {}) {
        super(props);
    }

    public context: IRouterContext;

    public componentDidMount(): void {
        // this.refs.nameControl.refs.inputField.getDOMNode().focus();
        const { dispatch }: IResetProps = this.props;
        dispatch(onFormReset());
    }

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
            password
        }: IResetProps = this.props;

        dispatch(
            doReset({
                password,
                key: this.context.router.getCurrentParams().key,
                email: this.context.router.getCurrentParams().email
            })
        );
    }

    public render(): React.ReactElement<{}> {

        let alerts: any[] = [];

        let {
            password,
            hasError,
            help,
            loading,
            success,
            message
        }: IResetProps = this.props;

        if (success) {
            alerts.push(<div key='success' className='alert alert-success'>
                Success. Redirecting...
            </div>);
        } else if (message) {
            alerts.push(<div key='danger' className='alert alert-danger'>
                {message}
            </div>);
        }

        let formElements: any;
        if (!success) {
            formElements = <fieldset>
                <TextControl
                        name='password'
                        label='New password'
                        type='password'
                        ref='password'
                        hasError={hasError.password}
                        value={password}
                        onChange={ (e: any) => this.handleChange(e) }
                        help={help.password}
                        disabled={loading}
                        />
                <TextControl
                        name='_key'
                        label='Key'
                        hasError={hasError.key}
                        value={this.context.router.getCurrentParams().key}
                        help={help.key}
                        disabled={true}
                        />
                <TextControl
                        name='_email'
                        label='Email'
                        hasError={hasError.email}
                        value={this.context.router.getCurrentParams().email}
                        help={help.email}
                        disabled={true}
                        />
                <ControlGroup hideLabel={true} hideHelp={true}>
                    <Button
                        type='submit'
                        inputClasses={{ 'btn-primary': true }}
                        disabled={loading}>

                        Set password
                        <Spinner space='left' show={loading} />
                    </Button>
                    <NavLink to='/login' className='btn btn-link'>Back to login</NavLink>
                </ControlGroup>
            </fieldset>;
        }

        return (
            <section>
                <h1 className='page-header'>Reset your password</h1>
                <form onSubmit={(e: any) => this.onSubmit(e) }>
                    {alerts}
                    {formElements}
                </form>
            </section>
        );
    }
}

export const Reset = connect(select)(Form);