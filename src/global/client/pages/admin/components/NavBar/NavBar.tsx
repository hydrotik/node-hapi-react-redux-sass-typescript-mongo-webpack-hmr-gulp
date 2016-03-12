/// <reference path='../../../../../../../typings/tsd.d.ts' />

// Core Imports
import * as React from 'react';
import * as ClassNames from 'classnames';
// import { Link } from 'react-router';

// https://github.com/insin/react-router-active-component
import * as activeComponent from 'react-router-active-component';
// import { connect } from 'react-redux';

// Styles
import './_NavBar.scss';

// Page Components


// Behaviors and Actions
import {

} from '../../actions';

// Interfaces
interface INavBarProps {
    dispatch?: (func: any) => void;
    store?: any;
    navBarOpen?: boolean;
}

interface INavBarState {
    // navBarOpen: boolean;
}

export const Sections: any = {
    Home: {
        title: 'My account',
        path: '/account'
    },
    Settings: {
        title: 'Settings',
        path: '/account/settings'
    }
};

let ac: any = activeComponent;
const NavLink: any = ac('li');


// Decorators
/*
function select(state: { formSignup: IReducer; }): INavBarState {
    const { formSignup }: { formSignup: IReducer; } = state;
    const {
    }: IReducer = formSignup;

    return {
    };

}

@connect(select) */
export class NavBar extends React.Component<INavBarProps, INavBarState> {

    public constructor(props: INavBarProps = { navBarOpen: false}) {
        super(props);
    }

    public componentWillReceiveProps(): void {

        // this.setState({ navBarOpen: false });
    }

    public toggleMenu(): void {
        // this.props.navBarOpen = !this.props.navBarOpen;
        // 
        // dispatch(toogleMenu(!this.props.navBarOpen));
    }

    public render(): React.ReactElement<{}> {

        let navBarCollapse: any = ClassNames({
            'navbar-collapse': true,
            collapse: true /*!this.props.navBarOpen*/
        });

        return (
            <div className="navbar navbar-inverse navbar-fixed-top">
                <div className="container">
                    <div className="navbar-header">
                        <div className='navbar-header'>
                            <a className='navbar-brand' href='/'>
                                <img className='navbar-logo' src='/assets/logo-square.png' height='64' width='64' />
                            </a>
                        </div>
                        <button
                            className="navbar-toggle collapsed"
                            onClick={this.toggleMenu}>

                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                    </div>
                    <div className={navBarCollapse}>
                        <ul className="nav navbar-nav">
                            <NavLink onlyActiveOnIndex to="/admin/accounts">Accounts</NavLink>
                            <NavLink to="/admin/admins">Admins</NavLink>
                            <NavLink to="/admin/admin-groups">Admin Groups</NavLink>
                            <NavLink to="/admin/statuses">Statuses</NavLink>
                            <NavLink to="/admin/users">Users</NavLink>
                        </ul>
                        <ul className="nav navbar-nav navbar-right">
                            <li>
                                <a href="/login/logout">Sign out</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}
