/// <reference path='../../../../../../../typings/index.d.ts' />

// Core Imports
import * as React from 'react';

// Styles
import './_App.scss';

// Page Components

// Interfaces

interface IAppProps {
    children?: any;
    routes?: any[];
}

interface IAppState {

}

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
