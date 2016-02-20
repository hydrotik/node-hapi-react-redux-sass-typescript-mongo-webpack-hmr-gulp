/// <reference path="../../../../typings/tsd.d.ts" />

import * as lodash from 'lodash';
import { Reducer, combineReducers } from 'redux';
import {
    // Global Actions here...

    /* Example Event */
    // ACTION_NAME

} from '../actions/actions';

// Multiple Reducers Example
// https://github.com/suin/redux-multiple-reducers-example
// Nested Reducers Thread
// https://github.com/reactjs/redux/issues/316

// Global Action Constants here...

/* **************** Example Action Constant *******************
export interface IExampleReducer {
    payload?: boolean;
}

export function onExampleReducer(state: any = { payload: [] }, action: IExampleReducer): any {
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
*/

// Combine Global Reducers
export const rootReducer: Reducer = combineReducers({
    //onExampleChange
});
