/// <reference path='../../../../../typings/main.d.ts' />

// Core Imports
import * as React from 'react';
import * as ClassNames from 'classnames';
import { map } from 'lodash';

import { browserHistory } from 'react-router';

// https://github.com/insin/react-router-active-component
import * as activeComponent from 'react-router-active-component';
import { connect } from 'react-redux';

// Styles
import './_NavBar.scss';

// Page Components


// Behaviors and Actions
import {
    INavBarAction,
    collapseNavBar,
    openNavBar
} from '../../actions';

// Interfaces
interface INavBarProps {
    dispatch?: (func: any) => void;
    store?: any;
    navBarOpen?: boolean;

    pages: any;
    navStyle: string;
}

interface INavBarState {
    navBarOpen: boolean;
}



let ac: any = activeComponent;
const NavLink: any = ac('li');


// Decorators
function select(state: { onNavBarReducer: INavBarAction; }): INavBarState {
    const { onNavBarReducer }: { onNavBarReducer: INavBarAction; } = state;
    const {
        navBarOpen
    }: INavBarAction = onNavBarReducer;

    return {
        navBarOpen
    };

}

@connect(select)
export class NavBar extends React.Component<INavBarProps, INavBarState> {

    public constructor(props: INavBarProps = { navBarOpen: false, pages: {}, navStyle: 'navbar-default'}) {
        super(props);

        browserHistory.listen(this.resetMenu);
    }

    public resetMenu: any = (event: any): void => {
        const { dispatch }: INavBarProps = this.props
        dispatch(collapseNavBar());
    }

    public toggleMenu: any = (event: any): void => {
        const { dispatch }: INavBarProps = this.props
        dispatch(this.props.navBarOpen ? collapseNavBar() : openNavBar())
    }

    public createNavItem(object: any, i: number): any {
        if( object.hasOwnProperty('onlyActiveOnIndex') && object.onlyActiveOnIndex ){
            return <NavLink onlyActiveOnIndex to={object.path} key={i}>{object.title}</NavLink>;
        }else{
            return <NavLink to={object.path} key={i}>{object.title}</NavLink>;
        }
    }

    public render(): React.ReactElement<{}> {

        const { navBarOpen }: INavBarProps = this.props;

        let navBarCollapse: any = ClassNames({
            'navbar-collapse': !navBarOpen,
            collapse: !navBarOpen
        });

        let navStyleMain: any = ClassNames(
            'navbar',
            'navbar-fixed-top',
            this.props.navStyle
        );

        

        return (
            <div className={navStyleMain}>
                <div className="container">
                    <div className="navbar-header">
                        <a className='navbar-brand' href='/'>
                            <img className='navbar-logo' src='/assets/logo-square.png' height='64' width='64' />
                        </a>
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
                            { map(this.props.pages, this.createNavItem) }
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
