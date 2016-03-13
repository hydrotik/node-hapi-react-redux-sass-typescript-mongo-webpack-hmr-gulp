/// <reference path='../../../../../../../typings/tsd.d.ts' />

// Core Imports
import * as React from 'react';

// Styles
import './_App.scss';

// Page Components
import { NavBar } from '../../../../components/NavBar/NavBar';
import { Footer } from '../../../../components/Footer/Footer';

// Interfaces

interface IAppProps {
    children?: any;
    routes?: any[];
}

interface IAppState {
}

export const Sections: any = {
    Home: {
        title: 'Admin Home',
        path: '/admin',
        onlyActiveOnIndex: true
    },
    Accounts: {
        title: 'Accounts',
        path: '/admin/accounts'
    },
    Admins: {
        title: 'Admins',
        path: '/admin/admins'
    },
    AdminGroups: {
        title: 'Admin Groups',
        path: '/admin/admin-groups'
    },
    Statuses: {
        title: 'Statuses',
        path: '/admin/statuses'
    },
    Users: {
        title: 'Users',
        path: '/admin/users'
    }
};

// https://github.com/reactjs/react-router/tree/1.0.x/docs
// https://github.com/reactjs/react-router/blob/master/examples/breadcrumbs/app.js

export class App extends React.Component<IAppProps, IAppState> {

    public constructor(props: any) {
        super(props);
    }


    public render(): React.ReactElement<{}> {

        return (
            <div>
                <NavBar pages={Sections} navStyle='navbar-inverse' />
                {this.props.children}
                <Footer />
            </div>
        );
    }
}
