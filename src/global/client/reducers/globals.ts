/// <reference path="../../../../typings/tsd.d.ts" />

import * as lodash from 'lodash';
import { Reducer, combineReducers } from 'redux';
import {
    // Global Actions here...

    /* Example Event */
    IExampleAction,
    ACTION_NAME

} from '../actions/globals';

// Multiple Reducers Example
// https://github.com/suin/redux-multiple-reducers-example
// Nested Reducers Thread
// https://github.com/reactjs/redux/issues/316

// Global Reducers here...

/* **************** Example Reducer ******************* */

export function onExampleReducer(state: any = { payload: [] }, action: IExampleAction): any {
    let delta: Object;
    switch (action.type) {
        case ACTION_NAME:
            delta = lodash.assign({}, state, {
                on: action.payload
            });
            return delta;
        default:
            return state;
    }
}


// Combine Global Reducers
export const rootReducer: Reducer = combineReducers({
    onExampleReducer
});
