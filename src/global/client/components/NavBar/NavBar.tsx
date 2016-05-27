/// <reference path='../../../../../typings/main.d.ts' />

// Core Imports
import * as React from 'react';
import * as ClassNames from 'classnames';
import { map } from 'lodash';

import { browserHistory } from 'react-router';

// https://github.com/insin/react-router-active-component
import * as activeComponent from 'react-router-active-component';
import { connect } from 'react-redux';

// Child components of the NavBar
import {NavElementPages} from './NavElementPages/NavElementPages';
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
interface BaseProps {
    navBarOpen?: boolean;
    pages?: any;
    navStyle?: string;
}

interface StateProps extends BaseProps {
    dispatch: (any) => any;
    onResetMenu: (any) => any;
    onToggleMenu: (any) => any;
}



let ac: any = activeComponent;
const NavLink: any = ac('li');


// Decorators
const mapStateToProps = (state: any): any => {
    const { onNavBarReducer }: { onNavBarReducer: INavBarAction; } = state;
    const {
        navBarOpen
    }: INavBarAction = onNavBarReducer;

    return {
        navBarOpen
    };

}

const mapDispatchToProps = (dispatch: (any) => any) => {
    return {
        onResetMenu: (event: any): void => {
            dispatch(collapseNavBar());
        },
        onToggleMenu: (event: any): void => {
            dispatch(this.props.navBarOpen ? collapseNavBar() : openNavBar())
        }
    }
    
}

class Container extends React.Component<BaseProps, any> {

    public constructor(props?: BaseProps) {
        super({
            navBarOpen: props.navBarOpen || false,
            pages: props.pages || {},
            navStyle: props.navStyle || 'navbar-default'
        });
        
        browserHistory.listen(this.resetMenu);
    }

    public resetMenu(event: any): any {
        const {
            onResetMenu
        } = this.props as StateProps;
        
        return onResetMenu(event);
    }

    public toggleMenu(event: any): any {
        const {
            onToggleMenu
        } = this.props as StateProps;
        
        return onToggleMenu(event);
    }

    public createNavItem(object: any, i: number): any {
        if( object.hasOwnProperty('onlyActiveOnIndex') && object.onlyActiveOnIndex ){
            return <NavLink onlyActiveOnIndex to={object.path} key={i}>{object.title}</NavLink>;
        }else{
            return <NavLink to={object.path} key={i}>{object.title}</NavLink>;
        }
    }

    public render(): React.ReactElement<{}> {

        const {
            navBarOpen,
            pages,
            navStyle
        } = this.props;
        
        const {
            onToggleMenu,
            onResetMenu
        } = this.props as StateProps;

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
                            onClick={onToggleMenu}>

                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                    </div>
                    <div className={navBarCollapse}>
                        {
                              this.props.pages ? <NavElementPages pages navBarOpen /> : null
                        }

                        { this.props.children }

                        <ul className="nav navbar-nav navbar-right">
                            <li>
                                <a href="/dashboard">Dashboard</a>
                            </li>
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

// TODO: Understand this...
// Seems I have to explicitly type connect here. I don't know why, yet...
// See: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/6237
export const NavBar = connect<any, any, BaseProps>(mapStateToProps, mapDispatchToProps)(Container);
