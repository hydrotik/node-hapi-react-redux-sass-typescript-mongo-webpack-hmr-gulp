/// <reference path="../../../../typings/index.d.ts" />

import * as lodash from 'lodash';
import {
    // Global Actions here...

    /* NavBar Event */
    NAVBAR_OPEN,
    NAVBAR_COLLAPSE,
    INavBarAction

} from '../actions';

// Global Reducers here...

/* **************** Example Reducer ******************* */

export function onNavBarReducer(state: any = { navBarOpen: false }, action: INavBarAction): any {
    let delta: Object;
    switch (action.type) {
        case NAVBAR_OPEN:
            delta = lodash.assign({}, state, {
                navBarOpen: true
            });
            return delta;
        case NAVBAR_COLLAPSE:
            delta = lodash.assign({}, state, {
                navBarOpen: false
            });
            return delta;
        default:
            return state;
    }
}
