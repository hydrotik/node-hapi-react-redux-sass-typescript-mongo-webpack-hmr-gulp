/// <reference path='../../../../../../../typings/tsd.d.ts' />

// Core Imports
import * as React from 'react';

// Styles
import './_App.scss';

// Page Components
// import { NavBar } from '../NavBar/NavBar';
// import { Footer } from '../Footer/Footer';

// Interfaces

interface IAppProps {
    children?: any;
}

interface IAppState {
}

// https://github.com/reactjs/react-router/tree/1.0.x/docs

export class App extends React.Component<IAppProps, IAppState> {

    public constructor(props: any) {
        super(props);
    }


    public render(): React.ReactElement<{}> {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}
