/// <reference path='../../../../../typings/tsd.d.ts' />

// Core Imports
import * as React from 'react';
import { Router, IndexRoute, Route } from 'react-router';

// Page Components
import { App } from './components/App/App';
import { Home } from './components/Home/Home';
import { NotFound } from './components/NotFound/NotFound';
import { Settings } from './components/Settings/Settings';


// Interfaces
/*
interface IAppProps {
}

interface IAppState {
}
*/

// https://github.com/reactjs/react-router/tree/master/docs
// https://github.com/reactjs/react-router/blob/master/upgrade-guides/v2.0.0.md
// https://github.com/toddlucas/react-tsx-starter

export class Routes extends React.Component<{}, {}> {

    public constructor(props: any) {
        super(props);
    }


    public render(): React.ReactElement<{}> {
        return (
            <Router >
                <Route path='/account' component={App}>
                    <IndexRoute component={Home} />
                    <Route path='settings' component={Settings} />
                    <Route path='*' component={ NotFound }/>
                </Route>
            </Router>
        );
    }
}
