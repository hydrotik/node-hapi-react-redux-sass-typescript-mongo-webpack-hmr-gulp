/// <reference path="../../../../typings/tsd.d.ts" />

import * as lodash from 'lodash';
import {
    // Global Actions here...

    /* Example Event */
    IExampleAction,
    EXAMPLE_ACTION

} from '../actions/globals';

// Multiple Reducers Example
// https://github.com/suin/redux-multiple-reducers-example
// Nested Reducers Thread
// https://github.com/reactjs/redux/issues/316
// https://github.com/erikras/ducks-modular-redux/issues/6
// https://github.com/erikras/ducks-modular-redux
// http://github.com/hcschuetz/todomvc-redux-oo

// Global Reducers here...

/* **************** Example Reducer ******************* */

export function onExampleReducer(state: any = { payload: [] }, action: IExampleAction): any {
    let delta: Object;
    console.warn(action);
    switch (action.type) {
        case EXAMPLE_ACTION:
            delta = lodash.assign({}, state, {
                payload: action.payload
            });
            return delta;
        default:
            return state;
    }
}
