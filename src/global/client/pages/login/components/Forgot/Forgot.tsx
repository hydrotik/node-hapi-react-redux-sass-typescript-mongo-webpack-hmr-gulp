/// <reference path='../../../../../../../typings/index.d.ts' />

// Core Imports
import * as React from 'react';
import * as activeComponent from 'react-router-active-component';
import { connect } from 'react-redux';

// Styles
import './_Forgot.scss';

// Page Components
import { ControlGroup } from '../../../../components/ControlGroup/ControlGroup';
import { TextControl } from '../../../../components/TextControl/TextControl';
import { Button } from '../../../../components/Button/Button';
import { Spinner } from '../../../../components/Spinner/Spinner';

// Behaviors and Actions
import {
    IForgotMapping,
    doForgot,
    onFormUpdate,
    onFormReset,
} from '../../actions';

// Interfaces
interface IForgotProps {
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

interface IForgotState {

}

let ac: any = activeComponent;
const NavLink: any = ac('li');

// Decorators

function select(state: { forgot: IForgotMapping; }): IForgotProps {
    const { forgot }: { forgot: IForgotMapping; } = state;
    const {
        success,
        error,
        hasError,
        help,
        loading,
        email,
        message
    }: IForgotMapping = forgot;

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

class Form extends React.Component<IForgotProps, IForgotState> {

    public constructor(props: any = {}) {
        super(props);
    }

    public componentDidMount(): void {
        // this.refs.nameControl.refs.inputField.getDOMNode().focus();
        const { dispatch }: IForgotProps = this.props;
        dispatch(onFormReset());
    }

    public handleChange(event: any): void {
        const { dispatch }: IForgotProps = this.props;
        dispatch(
            onFormUpdate(event.target.name, event.target.value)
        );
    }

    public onSubmit(event: any): void {
        event.preventDefault();
        event.stopPropagation();

        const {
            dispatch,
            email
        }: IForgotProps = this.props;

        dispatch(
            doForgot({
                email
            })
        );
    }

    public render(): React.ReactElement<{}> {

        let alerts: any[] = [];

        let {
            email,
            hasError,
            help,
            loading,
            success,
            message
        }: IForgotProps = this.props;


        if (success) {
            alerts.push(<div key='success'>
                <div className='alert alert-success'>
                    If an account matched that address, an email will be sent with instructions.
                </div>
                <NavLink to='/login' className='btn btn-link'>Back to login</NavLink>
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
                        name='email'
                        label='What\'s your email?'
                        ref='email'
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

                        Send reset
                        <Spinner space='left' show={loading} />
                    </Button>
                    <NavLink to='/login' className='btn btn-link'>Back to login</NavLink>
                </ControlGroup>
            </fieldset>;
        }

        return (
            <section>
                <h1 className='page-header'>Forgot your password?</h1>
                <form onSubmit={(e: any) => this.onSubmit(e) }>
                    {alerts}
                    {formElements}
                </form>
            </section>
        );
    }
}

export const Forgot = connect(select)(Form);