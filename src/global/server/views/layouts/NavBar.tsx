/// <reference path="../../../../../typings/tsd.d.ts" />

import * as React from 'react';
import * as ClassNames from 'classnames';

interface INavBarProps {
    activeTab?: string;
}

class NavBar extends React.Component<INavBarProps, {}> {

    public render(): React.ReactElement<{}> {

        return (
            <div className="navbar navbar-default navbar-fixed-top">
                <div className="container">
                    <div className="navbar-header">
                        <a className="navbar-brand" href="/">
                            <img className="navbar-logo" src="/assets/logo-square.png" height="64" width="64" />
                        </a>
                    </div>
                    <div className="navbar-collapse collapse">
                        <ul className="nav navbar-nav">
                            <li className={this.tabClass('home')}>
                                <a href="/">Home</a>
                            </li>
                            <li className={this.tabClass('about')}>
                                <a href="/about">About</a>
                            </li>
                            <li className={this.tabClass('signup')}>
                                <a href="/signup">Sign up</a>
                            </li>
                            <li className={this.tabClass('contact')}>
                                <a href="/contact">Contact</a>
                            </li>
                        </ul>
                        <ul className="nav navbar-nav navbar-right">
                            <li className={this.tabClass('login')}>
                                <a href="/login">Sign in</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }

    private tabClass(tab) {

        return ClassNames({
            active: this.props.activeTab === tab
        });
    }
}

export default NavBar;