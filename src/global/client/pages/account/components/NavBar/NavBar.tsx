/// <reference path='../../../../../../../typings/tsd.d.ts' />

// Core Imports
import * as React from 'react';
import * as ClassNames from 'classnames';
import { Link } from 'react-router';

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

    public isNavActive(routes: any): any {
        return ClassNames({
            active: routes.some(function(route: any): any {

                return this.context.router.isActive(route);
            }.bind(this))
        });
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
            <div className='navbar navbar-default navbar-fixed-top'>
                <div className='container'>
                    <div className='navbar-header'>
                        <Link className='navbar-brand' to='home'>
                            <img className='navbar-logo' src='media/logo-square.png' />
                            <span className='navbar-brand-label'>Aqua</span>
                            </Link>
                        <button
                            className='navbar-toggle collapsed'
                            onClick={this.toggleMenu}>

                            <span className='icon-bar'></span>
                            <span className='icon-bar'></span>
                            <span className='icon-bar'></span>
                            </button>
                        </div>
                    <div className={navBarCollapse}>
                        <ul className='nav navbar-nav'>
                            { /*
                            <li className={this.isNavActive(['home']) }>
                                <Link to={Sections.Home.path}>{Sections.Home.title}</Link>
                            </li>
                            <li className={this.isNavActive(['settings']) }>
                                <Link to={Sections.Settings.path}>{Sections.Settings.title}</Link>
                            </li>
                            */ }

                            <NavLink onlyActiveOnIndex to={Sections.Home.path}>{Sections.Home.title}</NavLink>
                            <NavLink to={Sections.Settings.path}>{Sections.Settings.title}</NavLink>
                        </ul>
                        <ul className='nav navbar-nav navbar-right'>
                            <li>
                                <a href='/login/logout'>Sign out</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
        );
    }
}
