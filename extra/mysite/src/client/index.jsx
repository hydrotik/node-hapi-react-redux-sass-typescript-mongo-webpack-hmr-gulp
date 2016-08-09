
/**
 * Step 1. Import react, redux and middleware
 */

// Get react
import React, {Component} from 'react';
import ReactDOM from 'react-dom';

// Get redux store
import {applyMiddleware, createStore, combineReducers} from 'redux';

// Pass store to react component
import {Provider} from 'react-redux';

// Get middleware for redux (thunk, logger, promise)
import thunkMiddleware from 'redux-thunk'; // Async actions
import createLogger from 'redux-logger';
import promiseMiddleware from 'redux-promise';

// Set up routing
import { browserHistory, Router, IndexRoute, Route} from 'react-router';

/**
 * Step 2. Create redux store
 */

import Counter, * as counter from './components/Counter';
import Dumb from './components/Dumb';

// Create root reducer
const rootReducer = combineReducers({
    [counter.REDUCER_NAME]: counter.reducer
})

const loggerMiddleware = createLogger();

// Create store
const store = createStore(
    rootReducer,
    applyMiddleware(thunkMiddleware, promiseMiddleware, loggerMiddleware)
)

/**
 * Step 3. Set up routing and link React with redux
 */

class Index extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Provider store={store}>
                <Router history={browserHistory}>
                    <Route path="/:root">
                        <IndexRoute component={Counter} />
                        <Route path="/counter" component={Counter} />
                        <Route path="/dumb" component={Dumb} />
                    </Route>
                </Router>
            </Provider>
        )
    }
}

Index.propTypes = {

}

Index.defaultProps = {

}

ReactDOM.render(<Index />, document.getElementById('app'));

