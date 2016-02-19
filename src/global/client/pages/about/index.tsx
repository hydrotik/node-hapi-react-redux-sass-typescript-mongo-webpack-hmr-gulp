/// <reference path="../../../../../typings/tsd.d.ts" />

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App } from './components/app/App.tsx';

import '../../scss/app.scss';

import { Store, createStore, applyMiddleware} from 'redux';
import { Provider } from 'react-redux';

import { rootReducer } from './reducers/reducers';

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
        module.hot.accept('./reducers/reducers', () => {
            const nextRootReducer: any = require('./reducers/reducers').rootReducer;
            store.replaceReducer(nextRootReducer);
        });
    }

    return store;
}

const store: Store = configureStore();

class About extends React.Component<{}, {}> {
    public render(): React.ReactElement<Provider> {
        return (
            <Provider store={store}>
                <App />
            </Provider>
        );
    }
}

ReactDOM.render(<About />, document.getElementById('app'));
