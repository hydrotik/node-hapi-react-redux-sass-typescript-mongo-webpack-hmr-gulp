/// <reference path='../../../../../../../typings/tsd.d.ts' />

// Core Imports
import * as React from 'react';
import { Link } from 'react-router';

// Styles
import './_App.scss';

// Page Components
import { NavBar } from '../NavBar/NavBar';
// import { Footer } from '../Footer/Footer';

// Interfaces

interface IAppProps {
    children?: any;
    routes?: any[];
}

interface IAppState {
}

const Sections: any = {
    Home: {
        title: 'Home',
        path: '/account'
    },
    Settings: {
        title: 'Settings',
        path: '/account/settings'
    }
};

// https://github.com/reactjs/react-router/tree/1.0.x/docs
// https://github.com/reactjs/react-router/blob/master/examples/breadcrumbs/app.js

export class App extends React.Component<IAppProps, IAppState> {

    public constructor(props: any) {
        super(props);
    }


    public render(): React.ReactElement<{}> {

        const depth: number = this.props.routes.length;

        return (
            <div>
                <h1>Hello App!</h1>
                <NavBar />
                <aside>
                    <ul>
                        <li><Link to={Sections.Home.path}>{Sections.Home.title}</Link></li>
                        <li><Link to={Sections.Settings.path}>{Sections.Settings.title}</Link></li>
                    </ul>
                </aside>
                <main>
                    <ul className='breadcrumbs-list'>
                        {this.props.routes.map((item: any, index: number) =>
                            <li key={index}>
                                <Link
                                    onlyActiveOnIndex={true}
                                    activeClassName='breadcrumb-active'
                                    to={item.path || ''}>
                                        {item.component.title}
                                </Link>
                                {(index + 1) < depth && '\u2192'}
                            </li>
                        )}
                    </ul>
                    {this.props.children}
                </main>
            </div>
        );
    }
}
