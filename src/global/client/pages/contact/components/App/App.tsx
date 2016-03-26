/// <reference path='../../../../../../../typings/main.d.ts' />

// Core Imports
import * as React from 'react';

// Styles
import './_App.scss';

// Page Components
// import { Form } from '../Form/Form';

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
                Contact Form Here!
            </div>
        );
    }
}
