/// <reference path="../../../../../typings/tsd.d.ts" />

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { browserHistory, Router, IndexRoute, Route} from 'react-router';

// Local Components
import { App } from './components/App/App';
import { Home } from './components/Home/Home';
import { NotFound } from './components/NotFound/NotFound';
import { Settings } from './components/Settings/Settings';

import '../../scss/app.scss';

import { Store, createStore, applyMiddleware} from 'redux';
import { Provider } from 'react-redux';

import { rootReducer } from './reducers';

import { createLogger } from '../../utils/redux-logger';
import { thunkMiddleware } from '../../utils/redux-thunk';
// import { promiseMiddleware } from './utils/redux-promise';

const logger: any = createLogger();

interface IHotModule {
    hot?: { accept: ( path: string, callback: () => void ) => void };
};

declare const module: IHotModule;

const createStoreWithMiddleware: any = applyMiddleware(thunkMiddleware, logger)(createStore);

function configureStore(): Store {
    const store: Store = createStoreWithMiddleware(rootReducer);

    if (module.hot) {
        module.hot.accept('./reducers', () => {
            const nextRootReducer: any = require('./reducers').rootReducer;
            store.replaceReducer(nextRootReducer);
        });
    }

    return store;
}

const store: Store = configureStore();

interface IBootstrapProps {
    routes?: any;
}

interface IBootstrapState {
}


class Bootstrap extends React.Component<IBootstrapProps, IBootstrapState> {

    public render(): React.ReactElement<Provider> {
        return (
            <Provider store={store}>
                <Router history={browserHistory}>
                    <Route path='/admin' component={App}>
                        <IndexRoute component={Home} />
                        <Route path='settings' component={Settings} />
                        <Route path='*' component={ NotFound }/>
                    </Route>
                </Router>
            </Provider>
        );
    }
}

ReactDOM.render(<Bootstrap />, document.getElementById('app'));
