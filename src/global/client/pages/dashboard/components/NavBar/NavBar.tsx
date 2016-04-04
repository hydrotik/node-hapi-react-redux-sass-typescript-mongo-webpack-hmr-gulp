/// <reference path='../../../../../../../typings/main.d.ts' />

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
} from '../../../../actions';

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
            <header class="main-header">
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
                                {/* Messages: style can be found in dropdown.less*/}
                                <li className="dropdown messages-menu">
                                  <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                    <i className="fa fa-envelope-o" />
                                    <span className="label label-success">4</span>
                                  </a>
                                  <ul className="dropdown-menu">
                                    <li className="header">You have 4 messages</li>
                                    <li>
                                      {/* inner menu: contains the actual data */}
                                      <ul className="menu">
                                        <li>{/* start message */}
                                          <a href="#">
                                            <div className="pull-left">
                                              <img src="assets/dashboard/img/user2-160x160.jpg" className="img-circle" alt="User Image" />
                                            </div>
                                            <h4>
                                              Support Team
                                              <small><i className="fa fa-clock-o" /> 5 mins</small>
                                            </h4>
                                            <p>Why not buy a new awesome theme?</p>
                                          </a>
                                        </li>
                                        {/* end message */}
                                        <li>
                                          <a href="#">
                                            <div className="pull-left">
                                              <img src="assets/dashboard/img/user3-128x128.jpg" className="img-circle" alt="User Image" />
                                            </div>
                                            <h4>
                                              AdminLTE Design Team
                                              <small><i className="fa fa-clock-o" /> 2 hours</small>
                                            </h4>
                                            <p>Why not buy a new awesome theme?</p>
                                          </a>
                                        </li>
                                        <li>
                                          <a href="#">
                                            <div className="pull-left">
                                              <img src="assets/dashboard/img/user4-128x128.jpg" className="img-circle" alt="User Image" />
                                            </div>
                                            <h4>
                                              Developers
                                              <small><i className="fa fa-clock-o" /> Today</small>
                                            </h4>
                                            <p>Why not buy a new awesome theme?</p>
                                          </a>
                                        </li>
                                        <li>
                                          <a href="#">
                                            <div className="pull-left">
                                              <img src="assets/dashboard/img/user3-128x128.jpg" className="img-circle" alt="User Image" />
                                            </div>
                                            <h4>
                                              Sales Department
                                              <small><i className="fa fa-clock-o" /> Yesterday</small>
                                            </h4>
                                            <p>Why not buy a new awesome theme?</p>
                                          </a>
                                        </li>
                                        <li>
                                          <a href="#">
                                            <div className="pull-left">
                                              <img src="assets/dashboard/img/user4-128x128.jpg" className="img-circle" alt="User Image" />
                                            </div>
                                            <h4>
                                              Reviewers
                                              <small><i className="fa fa-clock-o" /> 2 days</small>
                                            </h4>
                                            <p>Why not buy a new awesome theme?</p>
                                          </a>
                                        </li>
                                      </ul>
                                    </li>
                                    <li className="footer"><a href="#">See All Messages</a></li>
                                  </ul>
                                </li>
                                {/* Notifications: style can be found in dropdown.less */}
                                <li className="dropdown notifications-menu">
                                  <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                    <i className="fa fa-bell-o" />
                                    <span className="label label-warning">10</span>
                                  </a>
                                  <ul className="dropdown-menu">
                                    <li className="header">You have 10 notifications</li>
                                    <li>
                                      {/* inner menu: contains the actual data */}
                                      <ul className="menu">
                                        <li>
                                          <a href="#">
                                            <i className="fa fa-users text-aqua" /> 5 new members joined today
                                          </a>
                                        </li>
                                        <li>
                                          <a href="#">
                                            <i className="fa fa-warning text-yellow" /> Very long description here that may not fit into the
                                            page and may cause design problems
                                          </a>
                                        </li>
                                        <li>
                                          <a href="#">
                                            <i className="fa fa-users text-red" /> 5 new members joined
                                          </a>
                                        </li>
                                        <li>
                                          <a href="#">
                                            <i className="fa fa-shopping-cart text-green" /> 25 sales made
                                          </a>
                                        </li>
                                        <li>
                                          <a href="#">
                                            <i className="fa fa-user text-red" /> You changed your username
                                          </a>
                                        </li>
                                      </ul>
                                    </li>
                                    <li className="footer"><a href="#">View all</a></li>
                                  </ul>
                                </li>
                                {/* Tasks: style can be found in dropdown.less */}
                                <li className="dropdown tasks-menu">
                                  <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                    <i className="fa fa-flag-o" />
                                    <span className="label label-danger">9</span>
                                  </a>
                                  <ul className="dropdown-menu">
                                    <li className="header">You have 9 tasks</li>
                                    <li>
                                      {/* inner menu: contains the actual data */}
                                      <ul className="menu">
                                        <li>{/* Task item */}
                                          <a href="#">
                                            <h3>
                                              Design some buttons
                                              <small className="pull-right">20%</small>
                                            </h3>
                                            <div className="progress xs">
                                              <div className="progress-bar progress-bar-aqua" style={{width: '20%'}} role="progressbar" aria-valuenow={20} aria-valuemin={0} aria-valuemax={100}>
                                                <span className="sr-only">20% Complete</span>
                                              </div>
                                            </div>
                                          </a>
                                        </li>
                                        {/* end task item */}
                                        <li>{/* Task item */}
                                          <a href="#">
                                            <h3>
                                              Create a nice theme
                                              <small className="pull-right">40%</small>
                                            </h3>
                                            <div className="progress xs">
                                              <div className="progress-bar progress-bar-green" style={{width: '40%'}} role="progressbar" aria-valuenow={20} aria-valuemin={0} aria-valuemax={100}>
                                                <span className="sr-only">40% Complete</span>
                                              </div>
                                            </div>
                                          </a>
                                        </li>
                                        {/* end task item */}
                                        <li>{/* Task item */}
                                          <a href="#">
                                            <h3>
                                              Some task I need to do
                                              <small className="pull-right">60%</small>
                                            </h3>
                                            <div className="progress xs">
                                              <div className="progress-bar progress-bar-red" style={{width: '60%'}} role="progressbar" aria-valuenow={20} aria-valuemin={0} aria-valuemax={100}>
                                                <span className="sr-only">60% Complete</span>
                                              </div>
                                            </div>
                                          </a>
                                        </li>
                                        {/* end task item */}
                                        <li>{/* Task item */}
                                          <a href="#">
                                            <h3>
                                              Make beautiful transitions
                                              <small className="pull-right">80%</small>
                                            </h3>
                                            <div className="progress xs">
                                              <div className="progress-bar progress-bar-yellow" style={{width: '80%'}} role="progressbar" aria-valuenow={20} aria-valuemin={0} aria-valuemax={100}>
                                                <span className="sr-only">80% Complete</span>
                                              </div>
                                            </div>
                                          </a>
                                        </li>
                                        {/* end task item */}
                                      </ul>
                                    </li>
                                    <li className="footer">
                                      <a href="#">View all tasks</a>
                                    </li>
                                  </ul>
                                </li>
                                {/* User Account: style can be found in dropdown.less */}
                                <li className="dropdown user user-menu">
                                  <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                    <img src="assets/dashboard/img/user2-160x160.jpg" className="user-image" alt="User Image" />
                                    <span className="hidden-xs">Alexander Pierce</span>
                                  </a>
                                  <ul className="dropdown-menu">
                                    {/* User image */}
                                    <li className="user-header">
                                      <img src="assets/dashboard/img/user2-160x160.jpg" className="img-circle" alt="User Image" />
                                      <p>
                                        Alexander Pierce - Web Developer
                                        <small>Member since Nov. 2012</small>
                                      </p>
                                    </li>
                                    {/* Menu Body */}
                                    <li className="user-body">
                                      <div className="row">
                                        <div className="col-xs-4 text-center">
                                          <a href="#">Followers</a>
                                        </div>
                                        <div className="col-xs-4 text-center">
                                          <a href="#">Sales</a>
                                        </div>
                                        <div className="col-xs-4 text-center">
                                          <a href="#">Friends</a>
                                        </div>
                                      </div>
                                      {/* /.row */}
                                    </li>
                                    {/* Menu Footer*/}
                                    <li className="user-footer">
                                      <div className="pull-left">
                                        <a href="#" className="btn btn-default btn-flat">Profile</a>
                                      </div>
                                      <div className="pull-right">
                                        <a href="#" className="btn btn-default btn-flat">Sign out</a>
                                      </div>
                                    </li>
                                  </ul>
                                </li>
                                {/* Control Sidebar Toggle Button */}
                                <li>
                                  <a href="#" data-toggle="control-sidebar"><i className="fa fa-gears" /></a>
                                </li>

                                <li>
                                    <a href="/login/logout">Sign out</a>
                                </li>
                            </ul>
                            
                        </div>
                    </div>
                </div>
            </header>
        );
    }
}
