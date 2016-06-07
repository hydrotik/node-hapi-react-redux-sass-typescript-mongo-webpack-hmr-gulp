/// <reference path="../../../../../typings/index.d.ts" />

import * as React from 'react';
import * as ClassNames from 'classnames';

interface INavBarProps {
    activeTab?: string;
}

class NavBar extends React.Component<INavBarProps, {}> {

    public render(): React.ReactElement<{}> {


        return (
            <nav className="navbar navbar-full navbar-light">
                <a className="navbar-brand" href="#"><img src="/assets/logo.svg" width="50" height="50"/></a>
                <ul className="nav navbar-nav">
                    <li className={this.tabClass('home') + " nav-item"}>
                        <a className="nav-link" href="/">Home</a>
                    </li>
                    <li className={this.tabClass('about') + " nav-item"}>
                        <a className="nav-link" href="/about">About</a>
                    </li>
                    <li className={this.tabClass('signup') + " nav-item"}>
                        <a className="nav-link" href="/signup">Sign up</a>
                    </li>
                    <li className={this.tabClass('contact') + " nav-item"}>
                        <a className="nav-link" href="/contact">Contact</a>
                    </li>
                </ul>
                <ul className="nav navbar-nav pull-xs-right">
                    <li className={this.tabClass('login') + " nav-item"}>
                        <a className="nav-link" href="/login">Sign in</a>
                    </li>
                </ul>
            </nav>
        );
    }

    private tabClass(tab) {
        return ClassNames({
            active: this.props.activeTab === tab
        });
    }
}

export default NavBar;