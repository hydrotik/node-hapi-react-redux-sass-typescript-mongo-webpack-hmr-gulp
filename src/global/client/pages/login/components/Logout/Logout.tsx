/// <reference path='../../../../../../../typings/main.d.ts' />

// Core Imports
import * as React from 'react';
import * as activeComponent from 'react-router-active-component';
// import { connect } from 'react-redux';

// Styles
import './_Logout.scss';

// Page Components


// Behaviors and Actions
import {
} from '../../actions';

import jsonFetch, { IJSONFetch } from '../../../../api/jsonfetch'
// Interfaces
interface ILogoutProps {
    dispatch?: (func: any) => void;
    store?: any;
    success?: boolean;
    error?: string;
}

interface ILogoutState {

}

let ac: any = activeComponent;
const NavLink: any = ac('li');

// Decorators
/*
function select(state: { account: IAccountMapping; }): ILogoutState {
    const { account }: { account: IAccountMapping; } = state;
    const {
        password,
        passwordConfirm,
        hasError,
        help,
        loading,
        passwordsuccess,
        error
    }: IAccountMapping = account;

    return {
        password,
        passwordConfirm,
        hasError,
        help,
        loading,
        passwordsuccess,
        error
    };

}

@connect(select)*/
export class Logout extends React.Component<ILogoutProps, ILogoutState> {

    public constructor(props: any = {}) {
        super(props);
    }

    public componentDidMount(): void {
        // TODO: refactor this so that it is in an action?
        jsonFetch({ url: "/api/logout", method: "DELETE" } as IJSONFetch, (err: Error, result: string) => {
          console.log(result)
        })


    }

    public render(): React.ReactElement<{}> {

        let alerts: any[] = [];

        let {
            success,
            error
        }: ILogoutProps = this.props;

        if (success) {
            alerts.push(<div key='success' className='alert alert-success'>
                Logout successful.
            </div>);
        } else if (error) {
            alerts.push(<div key='danger' className='alert alert-warning'>
                {error}
            </div>);
        }

        return (
            <section>
                <h1 className='page-header'>Sign out</h1>
                {alerts}
                <NavLink className='btn btn-link' to='/login'>Back to login</NavLink>
            </section>
        );
    }
}
