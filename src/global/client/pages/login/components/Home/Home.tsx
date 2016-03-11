/// <reference path='../../../../../../../typings/tsd.d.ts' />

// Core Imports
import * as React from 'react';
import { connect } from 'react-redux';
import * as activeComponent from 'react-router-active-component';

// Styles
import './_Home.scss';

// Page Components
import { ControlGroup } from '../../../../components/ControlGroup/ControlGroup';
import { TextControl } from '../../../../components/TextControl/TextControl';
import { Button } from '../../../../components/Button/Button';
import { Spinner } from '../../../../components/Spinner/Spinner';

// Behaviors and Actions
import {
    ILoginMapping,
    onFormUpdate,
    onFormReset,
    doLogin
} from '../../actions';

// Interfaces
interface IHomeProps {
    dispatch?: (func: any) => void;
    store?: any;
    error?: string;
    success?:  boolean;
    username?: string;
    password?: string;
    hasError?: any;
    help?: any;
    loading?: boolean;
    message?: string;
}

interface IHomeState {
}

let ac: any = activeComponent;
const NavLink: any = ac('li');


// Decorators
function select(state: { login: ILoginMapping; }): IHomeProps {
    const { login }: { login: ILoginMapping; } = state;
    const {
        success,
        error,
        hasError,
        help,
        loading,
        username,
        password,
        message
    }: ILoginMapping = login;

    return {
        success,
        error,
        hasError,
        help,
        loading,
        username,
        password,
        message
    };

}
@connect(select)
export class Home extends React.Component<IHomeProps, IHomeState> {



    public constructor(props: any = {}) {
        super(props);
    }

    public componentDidMount(): void {
        // this.refs.nameControl.refs.inputField.getDOMNode().focus();
        const { dispatch }: IHomeProps = this.props;
        dispatch(onFormReset());
    }

    public handleChange(event: any): void {
        const { dispatch }: IHomeProps = this.props;
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
            password
        }: IHomeProps = this.props;

        dispatch(
            doLogin({
                username,
                password
            })
        );
    }

    public render(): React.ReactElement<{}> {

        let alerts: any[] = [];

        let {
            username,
            password,
            hasError,
            help,
            loading,
            success,
            message
        }: IHomeProps = this.props;

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
                        name='username'
                        label='Username'
                        hasError={hasError.username}
                        value={username}
                        onChange={ (e: any) => this.handleChange(e) }
                        help={help.username}
                        disabled={loading}
                        />
                <TextControl
                        name='password'
                        label='Password'
                        type='password'
                        hasError={hasError.password}
                        value={password}
                        onChange={ (e: any) => this.handleChange(e) }
                        help={help.password}
                        disabled={loading}
                        />
                <ControlGroup hideLabel={true} hideHelp={true}>
                    <Button
                        type='submit'
                        inputClasses={{ 'btn-primary': true }}
                        disabled={loading}>

                        Sign in
                        <Spinner space='left' show={loading} />
                    </Button>
                    <NavLink to='login/forgot' className='btn btn-link'>Forgot your password?</NavLink>
                </ControlGroup>
            </fieldset>;
        }

        return (
            <section>
                <h1 className='page-header'>Sign in</h1>
                <form onSubmit={(e: any) => this.onSubmit(e) }>
                    {alerts}
                    {formElements}
                </form>
            </section>
        );
    }
}
