/// <reference path='../../../../../../../typings/tsd.d.ts' />

// Core Imports
import * as React from 'react';

// Styles
import './_App.scss';

// Page Components


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
            <div className='app'>
                Hello Account
            </div>
        );
    }
}
