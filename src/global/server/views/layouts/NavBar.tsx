/// <reference path="../../../../../typings/main.d.ts" />

import * as React from 'react';
import * as ClassNames from 'classnames';

interface INavBarProps {
    activeTab?: string;
}

class NavBar extends React.Component<INavBarProps, {}> {

    public render(): React.ReactElement<{}> {

        return (
            <div className="navbar navbar-default">


            <nav>
                <div>
                    <nav className="navbar" role="navigation">
        <a className="logo" href="/" >
        <img src='assets/images/logo.svg' />
        </a>
        <span id="toggle" className="icn--nav-toggle is-displayed-mobile">
        <b className="srt">Toggle</b>
        </span>
        <ul className="nav is-collapsed-mobile">
        <li className="nav__item--current"><a href="#">Home</a></li>
        <li className="nav__item"><a href="#">About</a></li>
        <li className="nav__item"><a href="#">Contact</a></li>
        </ul>
        <ul className="nav nav--right is-collapsed-mobile">
        <li className="nav__item"><a href="#">Sign Up</a></li>
        <li className="nav__item"><a href="#">Sign In</a></li>
        </ul>

        </nav>
        <nav className="navspacer"></nav>
        </div>
        </nav>

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