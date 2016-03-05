/// <reference path='../../../../../../../typings/tsd.d.ts' />

// Core Imports
import * as React from 'react';
import * as ClassNames from 'classnames';
import { Link } from 'react-router';
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

    public isNavActive(routes: any): string {
        /*
        return ClassNames({
            active: routes.some(function(route: any): any {

                return this.context.router.isActive(route);
            }.bind(this))
        });
        */

        return 'active';
    }

    public toggleMenu(): void {
        // this.props.navBarOpen = !this.props.navBarOpen;
        // 
        // dispatch(toogleMenu(!this.props.navBarOpen));
    }

    public render(): React.ReactElement<{}> {

        let navBarCollapse: any = ClassNames({
            'navbar-collapse': true,
            collapse: !this.props.navBarOpen
        });

        return (
            <div className='navbar navbar-default navbar-fixed-top'>
                <div className='container'>
                    <div className='navbar-header'>
                        <Link className='navbar-brand' to='home'>
                            <img className='navbar-logo' src='/public/media/logo-square.png' />
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
                            <li className={this.isNavActive(['home']) }>
                                <Link to='home'>My account</Link>
                                </li>
                            <li className={this.isNavActive(['settings']) }>
                                <Link to='settings'>Settings</Link>
                                </li>
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
