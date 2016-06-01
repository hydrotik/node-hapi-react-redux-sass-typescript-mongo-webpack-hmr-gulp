/// <reference path='../../../../../typings/index.d.ts' />

// Core Imports
import * as React from 'react';
import * as ClassNames from 'classnames';
import * as _ from 'lodash';

import { browserHistory } from 'react-router';

// https://github.com/insin/react-router-active-component
import * as activeComponent from 'react-router-active-component';
import { connect, MergeProps } from 'react-redux';

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

interface TProps {
    pages: any;
    navStyle?: string;
}

interface TMapStateToProps {
    navBarOpen?: boolean;
}

interface TDispatchProps {
    onResetMenu?: (event: any) => any;
    onToggleMenu?: (event: any, navBarOpen: boolean) => any;
}

type TConnectedProps = TMapStateToProps & TDispatchProps;


let ac: any = activeComponent;
const NavLink: any = ac('li');


// Decorators
const mapStateToProps = (state: any): TMapStateToProps => {
    const { onNavBarReducer }: { onNavBarReducer: INavBarAction; } = state;
    const {
        navBarOpen
    }: INavBarAction = onNavBarReducer;
    
    return {
        navBarOpen
    };

}

const mapDispatchToProps = (dispatch: any, ownProps: any): TDispatchProps => {
    return {
        onResetMenu: (event: any): void => {
            dispatch(collapseNavBar());
        },
        onToggleMenu: (event: any, navBarOpen: boolean): void => {
            console.log(navBarOpen);
            dispatch(navBarOpen ? collapseNavBar() : openNavBar())
        }
    }
    
}

class Container extends React.Component<TConnectedProps & TProps, any> {

    public constructor(props: TProps) {
        super(props);
        
    }
    
    componentDidMount() {
        const {
            onResetMenu
        } = this.props;
        browserHistory.listen(onResetMenu);
    }

    public resetMenu(event: any): any {
        const {
            onResetMenu
        } = this.props;
        
        return onResetMenu(event);

    }

    public toggleMenu(event: any): any {
        const {
            onToggleMenu,
            navBarOpen
        } = this.props;
        
        return onToggleMenu(event, navBarOpen);
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
            navStyle,
            onToggleMenu,
            onResetMenu
        } = this.props;

        
        let navBarCollapse: any = ClassNames({
            'navbar-collapse': !navBarOpen,
            collapse: !navBarOpen
        });

        let navStyleMain: any = ClassNames(
            'navbar',
            'navbar-fixed-top',
            navStyle
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
                            onClick={this.toggleMenu.bind(this)}>

                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                    </div>
                    <div className={navBarCollapse}>
                        {
                              pages ? <NavElementPages pages={pages} navBarOpen={navBarOpen} /> : null
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

export const NavBar = connect(mapStateToProps, mapDispatchToProps)(Container);
