/// <reference path='../../../../../../../typings/tsd.d.ts' />

// Core Imports
import * as React from 'react';
import * as ReactRouter from 'react-router';


// Styles
import './_App.scss';

// Page Components
import { NavBar } from '../NavBar/NavBar';
import { Footer } from '../Footer/Footer';

// Interfaces
/*
interface IAppProps {
}

interface IAppState {
}
*/

export class App extends React.Component<{}, {}> {

    public constructor(props: any) {
        super(props);
    }


    public render(): React.ReactElement<{}> {
        return (
            <div>
                <NavBar />
                    <ReactRouter.RouteHandler />
                <Footer />
            </div>
        );
    }
}
